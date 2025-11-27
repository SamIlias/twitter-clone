import { FC, ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

export const EditModal: FC<ModalProps> = ({ onClose, className = '', children }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`
          relative w-full max-w-xl bg-[var(--color-background)] rounded-xl shadow-lg
          p-6 md:p-8 ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute text-xl top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
};
