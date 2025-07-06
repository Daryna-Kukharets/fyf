import { useRef, useState } from "react";

type UserFormProps = {
  mode: "register" | "profile";
  values: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password?: string;
  };
  checked?: boolean;
  setChecked?: (value: boolean) => void;
  onChange: (field: keyof UserFormProps["values"], value: string) => void;
  onPhotoUpload?: () => void;
  onPhotoCapture: () => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
};

export const UsersForm: React.FC<UserFormProps> = ({
  mode,
  values,
  checked,
  setChecked,
  onChange,
  onPhotoUpload,
  onPhotoCapture,
  onLogout,
  onDeleteAccount,
}) => {
  const isProfile = mode === "profile";
  const [photo, setPhoto] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
      }
    } catch (error) {
      console.log("Camera access error:", error);
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setPhoto(imageData);
    }
    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
    setStreaming(false);
  };

  return (
    <>
      <div className="usersForm__head">
        <div className="usersForm__img-box">
          {photo ? (
            <img src={photo} alt="avatar" className="usersForm__photo" />
          ) : (
            <img
              src="img/icons/take-photo.svg"
              alt="take-photo"
              className="usersForm__photo"
            />
          )}
        </div>
        <div className="usersForm__buttons">
          <label className="usersForm__button usersForm__button--add">
            {isProfile ? "Змінити фото" : "Додати фото"}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              hidden
            />
          </label>
          <button
            type="button"
            className="usersForm__button usersForm__button--take"
            onClick={handleStartCamera}
          >
            {isProfile ? "Зробити нове фото" : "Зробити фото"}
          </button>
        </div>
        {streaming && (
          <div className="usersForm__video-container">
            <video ref={videoRef} className="usersForm__video" />
            <button
              type="button"
              onClick={handleCapturePhoto}
              className="usersForm__button usersForm__button--capture"
            >
              📸 Зробити фото
            </button>
          </div>
        )}
      </div>
      <div className="usersForm__body">
        <form action="#" method="get" className="usersForm__form">
          <div className="usersForm__inputs">
            <div className="usersForm__input-block">
              <label htmlFor="regist-email" className="usersForm__label">
                Пошта
              </label>
              <input
                type="email"
                className="usersForm__input custom-input"
                id="regist-email"
                value={values.email}
                onChange={(e) => onChange("email", e.target.value)}
                required
                disabled={isProfile}
              />
            </div>
            <div className="usersForm__input-block">
              <label htmlFor="regist-firstName" className="usersForm__label">
                Ім'я
              </label>
              <input
                type="text"
                value={values.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                className="usersForm__input custom-input"
                id="regist-firstName"
                required
                disabled={isProfile}
              />
            </div>
            <div className="usersForm__input-block">
              <label htmlFor="regist-lastName" className="usersForm__label">
                Прізвище
              </label>
              <input
                type="text"
                value={values.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                className="usersForm__input custom-input"
                id="regist-lastName"
                required
                disabled={isProfile}
              />
            </div>
            <div className="usersForm__input-block">
              <label htmlFor="regist-phone" className="usersForm__label">
                Номер телефону
              </label>
              <input
                type="tel"
                value={values.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                className="usersForm__input custom-input"
                id="regist-phone"
                required
                disabled={isProfile}
              />
            </div>
            {!isProfile && (
              <div className="usersForm__input-block">
                <label htmlFor="regist-password" className="usersForm__label">
                  Пароль
                </label>
                <div className="usersForm__input-password">
                  <input
                    type="password"
                    value={values.password}
                    onChange={(e) => onChange("password", e.target.value)}
                    className="usersForm__input custom-input"
                    id="regist-password"
                    required
                  />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="usersForm__eye"
                  >
                    <path
                      d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                      fill="#999DA3"
                    />
                  </svg>
                </div>
              </div>
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
                type="button"
                className="usersForm__button usersForm__button--reg"
                disabled={!checked}
              >
                Реєстрація
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};
