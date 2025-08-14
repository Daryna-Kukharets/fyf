import classNames from "classnames";
import React, { useRef, useState } from "react";

type Props = {
  id: string;
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};
export const PasswordField: React.FC<Props> = ({ id, label, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

    const togglePasswordVisibility = () => {
    if (!inputRef.current) return;

    const input = inputRef.current;
    const cursorPosStart = input.selectionStart;
    const cursorPosEnd = input.selectionEnd;

    setShowPassword((prev) => !prev);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(cursorPosStart, cursorPosEnd);
    }, 0);
  };

  return (
    <div className="passwordField">
      <label htmlFor={id} className="passwordField__label">
        {label}
      </label>
      <div className="passwordField__input-password">
        <input
         ref={inputRef}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={classNames("passwordField__input custom-input", {"passwordField__error" : error})}
          id={id}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="passwordField__eye"
          fill="#999DA3"
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
          />
        </svg>
      </div>
      {error && <p className="passwordField__error-text">{error}</p>}
    </div>
  );
};
