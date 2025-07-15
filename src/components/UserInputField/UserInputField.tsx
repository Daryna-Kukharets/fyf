import classNames from "classnames";
import { useRef } from "react";

type Props = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  error?: string;
};

const PHONE_TEMPLATE = "+38 (---) --- -- --";

export const UserInputField: React.FC<Props> = ({
  id,
  label,
  type,
  value,
  onChange,
  disabled,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isPhone = id.includes("phone");

  const formatWithTemplate = (digits: string) => {
    const template = PHONE_TEMPLATE;
    let result = "";
    let digitIndex = 0;

    for (let i = 0; i < template.length; i++) {
      if (template[i] === "-") {
        if (digitIndex < digits.length) {
          result += digits[digitIndex++];
        } else {
          result += "-";
        }
      } else {
        result += template[i];
      }
    }

    return result;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (!isPhone) return onChange(event);

  const raw = event.target.value;
  const digits = raw.replace(/\D/g, "").replace(/^38/, "").slice(0, 10);
  const masked = formatWithTemplate(digits);

  const fakeEvent = {
    ...event,
    target: {
      ...event.target,
      value: masked,
    },
  };

  onChange(fakeEvent);

  setTimeout(() => {
    if (inputRef.current) {
      const pos = masked.indexOf("-");
      const cursorPos = pos === -1 ? masked.length : pos;
      inputRef.current.setSelectionRange(cursorPos, cursorPos);
    }
  }, 0);
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isPhone || e.key !== "Backspace") return;

    const digits = value.replace(/\D/g, "").replace(/^38/, "");
    const newDigits = digits.slice(0, -1);
    const masked = formatWithTemplate(newDigits);

    e.preventDefault();

    const fakeEvent = {
      target: {
        value: masked,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange(fakeEvent);
  };

  const displayValue = isPhone && (!value || value === "")
    ? PHONE_TEMPLATE
    : value;

  return (
    <div className="userInputField">
      <label htmlFor={id} className="userInputField__label">
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        className={classNames("userInputField__input custom-input", {
          userInputField__error: error,
        })}
        id={id}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      {error && <p className="userInputField__error-text">{error}</p>}
    </div>
  );
};