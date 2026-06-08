import './Avatar.css';

const getInitials = (name = '') =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  status,
  className = '',
  ...rest
}) => {
  const classes = [
    'avatar',
    `avatar--${size}`,
    status ? 'avatar--with-status' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {src ? (
        <img src={src} alt={alt || name} className="avatar__img" />
      ) : (
        <span className="avatar__initials" aria-label={name}>
          {getInitials(name) || '?'}
        </span>
      )}
      {status && (
        <span
          className={`avatar__status avatar__status--${status}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;
