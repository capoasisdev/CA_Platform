import './Badge.css';

/**
 * Badge component
 * @param {string} variant - 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
 * @param {boolean} dot    - show dot indicator before text
 */
const Badge = ({ children, variant = 'default', dot = false, className = '', ...rest }) => (
  <span className={`badge badge--${variant} ${className}`} {...rest}>
    {dot && <span className="badge__dot" aria-hidden="true" />}
    {children}
  </span>
);

export default Badge;
