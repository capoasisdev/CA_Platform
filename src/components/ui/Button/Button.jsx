import './Button.css';

/**
 * Button component
 * @param {string}   variant    - 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
 * @param {string}   size       - 'sm' | 'md' | 'lg'
 * @param {boolean}  loading    - shows spinner and disables interaction
 * @param {boolean}  fullWidth  - stretches to container width
 * @param {string}   as         - render as 'button' | 'a' (pass href for links)
 * @param {string}   href       - URL (only used when as="a")
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  as: Tag = 'button',
  href,
  type = 'button',
  className = '',
  onClick,
  ...rest
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading ? 'btn--loading' : '',
    fullWidth ? 'btn--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const props = Tag === 'a' ? { href, ...rest } : { type, disabled: disabled || loading, onClick, ...rest };

  return (
    <Tag className={classes} {...props}>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {children}
    </Tag>
  );
};

export default Button;
