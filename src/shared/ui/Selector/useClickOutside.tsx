import { useEffect, useRef, useState } from 'react';

export const useClickOutside = (fieldName: string, onBlur?: (field: string) => void) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (open) {
          setOpen(false);
          if (onBlur) {
            onBlur(fieldName);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onBlur, fieldName]);

  return {
    open,
    setOpen,
    containerRef,
  };
};
