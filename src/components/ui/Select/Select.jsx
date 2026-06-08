import './Select.css';

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Select = ({
  label,
  id,
  options = [],
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  className = '',
  ...rest
}) => {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="select-group">
      {label && (
        <label
          htmlFor={selectId}
          className={`select-group__label${required ? ' select-group__label--required' : ''}`}
        >
          {label}
        </label>
      )}
      <div className="select-wrapper">
        <select
          id={selectId}
          className={`select-field${error ? ' select-field--error' : ''} ${className}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="select-wrapper__chevron">
          <ChevronIcon />
        </span>
      </div>
      {error && (
        <span className="select-group__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;
