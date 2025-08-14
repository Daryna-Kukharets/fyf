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
  isOpen: boolean;
  onToggle: () => void;
  place?: string;
};

export const CustomSelect: React.FC<Props> = ({
  options,
  onChange,
  value,
  classFor = "",
  placeholder = "",
  customLabel,
  isOpen,
  onToggle,
  place,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (val: string) => {
    onChange?.(val);
    if (isOpen && onToggle) onToggle();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        if (isOpen && onToggle) onToggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      ref={selectRef}
      className={`custom-select ${classFor || ""} ${
        place === "form" && isOpen ? "custom-select__activity--focused" : ""
      }`}
      onClick={onToggle}
    >
      <div
        className={`custom-select__arrow ${
          isOpen ? "custom-select__arrow--rotated" : ""
        }`}
      />
      <div className="custom-select__value">
        {value ? (
          options.find((opt) => opt.value === value)?.label
        ) : place === "main" ? (
          <span className="custom-select__placeholder">{placeholder}</span>
        ) : (
          placeholder
        )}
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
