import './Input.css';

const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  iconLeft,
  iconRight,
  className = '',
  ...rest
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  const inputClasses = [
    'input-field',
    iconLeft  ? 'input-field--has-icon-left'  : '',
    iconRight ? 'input-field--has-icon-right' : '',
    error     ? 'input-field--error'           : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-group">
      {label && (
        <label
          htmlFor={inputId}
          className={`input-group__label${required ? ' input-group__label--required' : ''}`}
        >
          {label}
        </label>
      )}
      <div className="input-wrapper">
        {iconLeft && (
          <span className="input-wrapper__icon">{iconLeft}</span>
        )}
        <input
          id={inputId}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...rest}
        />
        {iconRight && (
          <span className="input-wrapper__icon input-wrapper__icon--right">{iconRight}</span>
        )}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="input-group__error" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className="input-group__helper">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
