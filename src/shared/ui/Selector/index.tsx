import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

type OptionValue = string | number;

interface SelectorProps {
  name: string;
  options: OptionValue[];
  value: OptionValue | '';
  onChange: (field: string, value: OptionValue) => void;
  onBlur?: (field: string) => void;
  placeholder?: string;
  touched?: boolean;
  hasError?: boolean;
}

export const SelectorWithValidation: FC<SelectorProps> = ({
  name,
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Select an option',
  touched,
  hasError,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (open) {
          setOpen(false);
          if (onBlur) {
            onBlur(name);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onBlur, name]);

  const handleSelect = (val: OptionValue) => {
    onChange(name, val);
    setOpen(false);
    if (onBlur) {
      setTimeout(() => onBlur(name), 0);
    }
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      if (onBlur) {
        onBlur(name);
      }
    }
  };

  const showError = touched && hasError;

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`w-full border  rounded-md py-2 px-4 text-center text-base cursor-pointer
                   bg-[var(--color-button-simple)] hover:bg-[var(--color-button-simple-hover)] focus:outline-none
                   ${showError ? 'border-red-500' : 'border-[var(--color-border)]'} ${value ? '' : 'text-[var(--color-text-placeholder)]'}`}
        role="button"
      >
        {value !== '' && value !== undefined ? value : placeholder}
      </div>

      {open && (
        <ul
          className="absolute top-full left-0 right-0 w-full max-h-60 mt-1 overflow-y-auto bg-[var(--color-background)]
                     border border-gray-300 rounded-md z-20 shadow-md
                     scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {options.map((opt) => (
            <li
              key={String(opt)}
              onClick={() => handleSelect(opt)}
              data-testid="select-option"
              role="option"
              aria-selected={value === opt}
              className="py-2 px-4 text-center text-base cursor-pointer bg-[var(--color-button-simple)] hover:bg-[var(--color-button-simple-hover)] sm:py-1 sm:text-sm"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
