import { useEffect, useRef, useState } from "react"

type Option = {
  value: string;
  label: string;
}

type Props = {
  options: Option[];
  onChange: (value: string) => void;
  value: string;
  classForHeader?: string;
}

export const CustomSelect: React.FC<Props> = ({
  options,
  onChange,
  value,
  classForHeader = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const selectRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const updateDropdownPosition = () => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width
      });
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      updateDropdownPosition();
    }
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    
    // Оновлюємо позицію при скролі чи зміні розміру вікна
    const handleScroll = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div className="custom-select" ref={selectRef}>
      <div
        ref={headerRef}
        className={`custom-select__header ${isOpen ? 'custom-select__header--rotated' : ''} ${classForHeader}`}
        onClick={handleToggle}
        tabIndex={0}
      >
        {(options.find(option => option.value === value) || options[0])?.label}
      </div>
      {isOpen && (
        <ul 
          className="custom-select__options"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            minWidth: `${dropdownPosition.width}px`
          }}
        >
          {options.map(option => (
            <li
              key={option.value}
              className="custom-select__option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}