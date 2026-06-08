import './TextArea.css';

const TextArea = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  ...rest
}) => {
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="textarea-group">
      {label && (
        <label
          htmlFor={textareaId}
          className={`textarea-group__label${required ? ' textarea-group__label--required' : ''}`}
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`textarea-field${error ? ' textarea-field--error' : ''} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error}
        {...rest}
      />
      {error && (
        <span className="textarea-group__error" role="alert">{error}</span>
      )}
      {helperText && !error && (
        <span className="textarea-group__helper">{helperText}</span>
      )}
    </div>
  );
};

export default TextArea;
