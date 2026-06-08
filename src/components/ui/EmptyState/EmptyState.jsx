import './EmptyState.css';

const EmptyState = ({
  icon,
  title,
  description,
  actions,
  className = '',
}) => (
  <div className={`empty-state ${className}`} role="status">
    {icon && <div className="empty-state__icon">{icon}</div>}
    {title && <h3 className="empty-state__title">{title}</h3>}
    {description && <p className="empty-state__description">{description}</p>}
    {actions && <div className="empty-state__actions">{actions}</div>}
  </div>
);

export default EmptyState;
