import { useRef, useState } from "react";
import { CameraCapture } from "../CameraCapture/CameraCapture";
import { UserPhotoUploader } from "../UserPhotoUploader/UserPhotoUploader";
import { deleteUser, logoutUser, registerUser } from "../../api/auth";
import { base64ToFile } from "../../utils/base64ToFile";
import { UserInputField } from "../UserInputField/UserInputField";
import { PasswordField } from "../PasswordField/PasswordField";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

type UserFormProps = {
  mode: "register" | "profile";
  values: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password?: string;
    repeatPassword?: string;
  };
  checked?: boolean;
  setChecked?: (value: boolean) => void;
  onChange: (field: keyof UserFormProps["values"], value: string) => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
  photoPath?: string;
};

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email);
}

export const UsersForm: React.FC<UserFormProps> = ({
  mode,
  values,
  checked,
  setChecked,
  onChange,
  photoPath,
}) => {
  const isProfile = mode === "profile";
  const [photo, setPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const { setToken, setUser } = useAuthStore();

  const [errors, setErrors] = useState<{
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    password?: string;
    repeatPassword?: string;
    checked?: string;
  }>({});

  const navigate = useNavigate();

  const handleFieldChange = (
    field: keyof UserFormProps["values"],
    value: string
  ) => {
    onChange(field, value);

    if (field === "email") {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Невірний формат пошти!" }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.email;
          return copy;
        });
      }
    }

    if (field === "firstName") {
      if (value.length > 25) {
        setErrors((prev) => ({
          ...prev,
          firstName: "Ім'я не повинно перевищувати 25 символів!",
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.firstName;
          return copy;
        });
      }
    }

    if (field === "lastName") {
      if (value.length > 25) {
        setErrors((prev) => ({
          ...prev,
          lastName: "Прізвище не повинно перевищувати 25 символів!",
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.lastName;
          return copy;
        });
      }
    }

    if (field === "phoneNumber") {
      const digits = value.replace(/\D/g, "").replace(/^38/, "");
      if (digits.length < 10) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: `Введено ${digits.length}/10 цифр. Введіть повний номер.`,
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.phoneNumber;
          return copy;
        });
      }
    }

    if (field === "password") {
      if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "Пароль має містити мінімум 8 символів!",
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.password;
          return copy;
        });
      }
    }

    if (field === "repeatPassword") {
      if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          repeatPassword: "Пароль має містити мінімум 8 символів!",
        }));
      } else if (value !== values.password) {
        setErrors((prev) => ({
          ...prev,
          repeatPassword: "Паролі не співпадають!",
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.repeatPassword;
          return copy;
        });
      }
    }
  };

  const isFormValid =
    Boolean(
      values.email &&
        values.firstName &&
        values.lastName &&
        values.phoneNumber &&
        values.password &&
        values.repeatPassword &&
        checked
    ) && Object.keys(errors).length === 0;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = (dataUrl: string) => {
    setPhoto(dataUrl);
    setShowCamera(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!values.email) {
      newErrors.email = "Пошта обовʼязкова!";
    }
    if (!values.firstName) {
      newErrors.firstName = "Ім'я обовʼязкове!";
    }

    if (!values.lastName) {
      newErrors.lastName = "Прізвище обовʼязкове!";
    }

    if (
      !values.phoneNumber ||
      values.phoneNumber.replace(/\D/g, "").length < 10
    ) {
      newErrors.phoneNumber = "Номер телефону обовʼязковий!";
    }

    if (!values.password) {
      newErrors.password = "Пароль обовʼязковий!";
    }

    if (!values.repeatPassword) {
      newErrors.repeatPassword = "Підтвердження паролю обовʼязкове!";
    }

    if (!checked) {
      newErrors.checked = "Потрібно погодитися з правилами!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!values.password || !values.repeatPassword) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("repeatPassword", values.repeatPassword);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);

      const cleanPhone =
        "+38" + values.phoneNumber.replace(/\D/g, "").replace(/^38/, "");
      formData.append("phoneNumber", cleanPhone);

      if (photo) {
        const file = base64ToFile(photo, "user-photo.jpg");
        formData.append("file", file);
      }

      const response = await registerUser(formData);
      setToken(response.token);
      setUser(response.user);

      navigate("/", { state: { openLoginModal: true } });
    } catch (err) {
      console.error("Помилка при реєстрації:", err);

      if (err.status === 409 || err.message?.includes("Email already exists")) {
        setErrors((prev) => ({
          ...prev,
          email: "Користувач з такою поштою вже існує!",
        }));
      } else if (err.status === 400) {
        setErrors((prev) => ({
          ...prev,
          email: err.message || "Некоректні дані для реєстрації.",
        }));
      } else {
        alert("Щось пішло не так. Спробуйте ще раз.");
      }
    }
  };

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      logout();
      navigate("/");
    } catch (error) {
      console.error("Помилка при виході:", error);
      alert("Не вдалося вийти з акаунта.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Ви впевнені, що хочете видалити акаунт?");
    if (!confirmed) return;

    try {
      await deleteUser(); 
      logout();
      navigate("/");
    } catch (error) {
      console.error("Помилка при видаленні акаунта:", error);
      alert("Не вдалося видалити акаунт.");
    }
  };

  return (
    <>
      <UserPhotoUploader
        photo={photo}
        photoPath={photoPath}
        isProfile={isProfile}
        onUpload={handleUpload}
        onOpenCamera={() => setShowCamera(true)}
        showCamera={showCamera}
        onCapture={handleCapture}
        onCloseCamera={() => setShowCamera(false)}
      />
      <form onSubmit={handleSubmit} className="usersForm__form">
        <div className="usersForm__inputs">
          <UserInputField
            id="regist-email"
            label="Пошта"
            type="text"
            value={values.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            disabled={isProfile}
            error={errors.email}
          />

          <UserInputField
            id="regist-firstName"
            label="Ім'я"
            type="text"
            value={values.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            disabled={isProfile}
            error={errors.firstName}
          />

          <UserInputField
            id="regist-lastName"
            label="Прізвище"
            type="text"
            value={values.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            disabled={isProfile}
            error={errors.lastName}
          />

          <UserInputField
            id="regist-phone"
            label="Номер телефону"
            type="text"
            value={values.phoneNumber}
            onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
            disabled={isProfile}
            error={errors.phoneNumber}
          />

          {!isProfile && (
            <>
              <PasswordField
                id="regist-password"
                label="Пароль"
                value={values.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                error={errors.password}
              />
              <PasswordField
                id="regist-repeatPassword"
                label="Підтвердження пароля"
                value={values.repeatPassword}
                onChange={(e) =>
                  handleFieldChange("repeatPassword", e.target.value)
                }
                error={errors.repeatPassword}
              />
            </>
          )}
        </div>

        {isProfile ? (
          <div className="usersForm__buttons">
            <button
              type="button"
              className="usersForm__button usersForm__button--logout"
              onClick={handleLogout}
            >
              Вихід
            </button>
            <button
              type="button"
              className="usersForm__button usersForm__button--delete"
              onClick={handleDeleteAccount}
            >
              Видалити акаунт
            </button>
          </div>
        ) : (
          <>
            <div className="usersForm__check-block">
              <input
                type="checkbox"
                checked={checked}
                className="usersForm__check"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setChecked?.(isChecked);

                  if (isChecked) {
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.checked;
                      return copy;
                    });
                  }
                }}
                id="regist-check"
              />
              <label htmlFor="regist-check" className="usersForm__label">
                Я погоджуюся з правилами використання
              </label>

              {errors.checked && (
                <p className="usersForm__error-text">{errors.checked}</p>
              )}
            </div>
            <button
              type="submit"
              className="usersForm__button usersForm__button--reg"
            >
              Реєстрація
            </button>
          </>
        )}
      </form>
    </>
  );
};
