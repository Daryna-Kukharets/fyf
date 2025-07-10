import { useRef, useState } from "react";
import { CameraCapture } from "../CameraCapture/CameraCapture";
import { UserPhotoUploader } from "../UserPhotoUploader/UserPhotoUploader";
import { sendAuthRequest } from "../../api/auth";
import { base64ToFile } from "../../utils/base64ToFile";
import { UserInputField } from "../UserInputField/UserInputField";
import { PasswordField } from "../PasswordField/PasswordField";

type UserFormProps = {
  mode: "register" | "profile";
  values: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password?: string;
    repeatPassword?: string;
  };
  checked?: boolean;
  setChecked?: (value: boolean) => void;
  onChange: (field: keyof UserFormProps["values"], value: string) => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
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
  onLogout,
  onDeleteAccount,
}) => {
  const isProfile = mode === "profile";
  const [photo, setPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    repeatPassword?: string;
  }>({});

  const handleFieldChange = (
    field: keyof UserFormProps["values"],
    value: string
  ) => {
    onChange(field, value);

    if (field === "email") {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Невірний формат пошти" }));
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
          firstName: "Ім'я не повинно перевищувати 25 символів",
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
          lastName: "Прізвище не повинно перевищувати 25 символів",
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.lastName;
          return copy;
        });
      }
    }

    if (field === "password") {
      if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "Пароль має містити мінімум 8 символів",
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
          password: "Пароль має містити мінімум 8 символів",
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.password;
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
        values.phone &&
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
      formData.append("phoneNumber", values.phone);

      if (photo) {
        const file = base64ToFile(photo, "user-photo.jpg");
        formData.append("file", file);
      }

      const response = await sendAuthRequest({
        endpoint: "registration",
        data: formData,
      });

      alert("Реєстрація успішна!");
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <UserPhotoUploader
        photo={photo}
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
            type="email"
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
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            disabled={isProfile}
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
                onChange={(e) => handleFieldChange("repeatPassword", e.target.value)}
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
            >
              Вихід
            </button>
            <button
              type="button"
              className="usersForm__button usersForm__button--delete"
            >
              Видалити акаунт
            </button>
          </div>
        ) : (
          <>
            <div className="usersForm__input-block usersForm__check-block">
              <input
                type="checkbox"
                checked={checked}
                className="usersForm__check"
                onChange={(e) => setChecked?.(e.target.checked)}
                id="regist-check"
                required
              />
              <label htmlFor="regist-check" className="usersForm__label">
                Я погоджуюся з правилами використання
              </label>
            </div>
            <button
              type="submit"
              className={`
                  usersForm__button 
                  usersForm__button--reg 
                  ${!isFormValid ? "usersForm__button--disabled" : ""}`}
              disabled={!isFormValid}
            >
              Реєстрація
            </button>
          </>
        )}
      </form>
    </>
  );
};
