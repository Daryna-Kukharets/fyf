import classNames from "classnames";

type Props = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  error?: string;
};

export const UserInputField: React.FC<Props> = ({
  id,
  label,
  type,
  value,
  onChange,
  disabled,
  error,
}) => {
  return (
    <div className="userInputField">
      <label htmlFor={id} className="userInputField__label">
        {label}
      </label>
      <input
        type={type}
        className={classNames("userInputField__input custom-input", {"userInputField__error" : error})}
        id={id}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
      />
      {error && (
        <p className="userInputField__error-text">{error}</p>
      )}
    </div>
  );
};
