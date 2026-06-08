import './Card.css';

const Card = ({
  children,
  className = '',
  hoverable = false,
  flat = false,
  bordered = false,
  ...rest
}) => {
  const classes = [
    'card',
    hoverable ? 'card--hoverable' : '',
    flat      ? 'card--flat'      : '',
    bordered  ? 'card--bordered'  : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...rest }) => (
  <div className={`card__header ${className}`} {...rest}>{children}</div>
);

const CardTitle = ({ children, subtitle, className = '', ...rest }) => (
  <div>
    <h3 className={`card__title ${className}`} {...rest}>{children}</h3>
    {subtitle && <p className="card__subtitle">{subtitle}</p>}
  </div>
);

const CardBody = ({ children, compact = false, className = '', ...rest }) => (
  <div className={`card__body${compact ? ' card__body--compact' : ''} ${className}`} {...rest}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...rest }) => (
  <div className={`card__footer ${className}`} {...rest}>{children}</div>
);

Card.Header = CardHeader;
Card.Title  = CardTitle;
Card.Body   = CardBody;
Card.Footer = CardFooter;

export default Card;
