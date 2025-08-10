import { useEffect, useRef, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  onChange?: (value: string) => void;
  value?: string;
  classFor?: string;
  placeholder?: string;
  customLabel?: string;
};

export const CustomSelect: React.FC<Props> = ({
  options,
  onChange,
  value,
  classFor = "",
  placeholder = "",
  customLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleSelect = (val: string) => {
    onChange?.(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      ref={selectRef}
      className={`custom-select ${classFor || ""}`}
      onClick={handleToggle}
    >
      <div
        className={`custom-select__arrow ${
          isOpen ? "custom-select__arrow--rotated" : ""
        }`}
      />
      <div className="custom-select__value">
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}
      </div>
      {isOpen && (
        <ul className="custom-select__options">
          {options.map((option) => (
            <li
              key={option.value}
              className="custom-select__option"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
