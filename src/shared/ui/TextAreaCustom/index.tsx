import { ChangeEvent, FC, useRef } from 'react';

interface TweetTextareaProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  onError: (error: string) => void;
  placeholder: string;
}

export const TextAreaCustom: FC<TweetTextareaProps> = ({
  value,
  onChange,
  maxLength,
  onError,
  placeholder,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    if (newValue.length > maxLength) {
      onError(`Max text length is ${maxLength} chars`);
      return;
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }

    onChange(newValue);
    onError('');
  };

  return (
    <>
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="text-[var(--color-text-placeholder)] w-full text-xl mb-2 p-3 border border-transparent focus:border-gray-400 focus:outline-none rounded-lg resize-none overflow-hidden"
      />
      {value.length > 0 && (
        <span className="text-sm text-gray-600 mb-5">
          {value.length}/{maxLength}
        </span>
      )}
    </>
  );
};
