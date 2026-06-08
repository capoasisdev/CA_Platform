import './Loader.css';

export const Spinner = ({ size = 'md', className = '' }) => (
  <span
    className={`loader-spinner loader-spinner--${size} ${className}`}
    role="status"
    aria-label="Loading"
  />
);

export const Skeleton = ({
  width = '100%',
  height = '1em',
  circle = false,
  className = '',
  style = {},
}) => (
  <div
    className={`skeleton${circle ? ' skeleton--circle' : ' skeleton--text'} ${className}`}
    style={{ width, height, ...style }}
    aria-hidden="true"
  />
);

export const FullPageLoader = ({ label = 'Loading...' }) => (
  <div className="loader-overlay" role="status" aria-live="polite">
    <Spinner size="lg" />
    <span className="loader-overlay__label">{label}</span>
  </div>
);

const Loader = ({ size = 'md' }) => (
  <div className="loader-container">
    <Spinner size={size} />
  </div>
);

export default Loader;
