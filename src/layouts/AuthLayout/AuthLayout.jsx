import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import logoImg from '../../assets/ca_connect_logo.png';
import { LockIcon, CheckIcon, GlobeIcon } from '../../components/ui';
import './AuthLayout.css';

const trustItems = [
  { icon: <LockIcon size={20} />, text: 'Your data is encrypted and fully secure' },
  { icon: <CheckIcon size={20} />, text: 'All professionals are verified and credentialed' },
  { icon: <GlobeIcon size={20} />, text: 'Trusted by businesses across 85+ countries' },
];

const AuthLayout = () => (
  <div className="auth-layout">
    {/* Left branding panel */}
    <div className="auth-layout__brand" aria-hidden="true">
      <div className="auth-layout__brand-top">
        <Link to={ROUTES.HOME} className="auth-layout__brand-logo">
          <img src={logoImg} alt="CA Connect Global" style={{ height: '36px', width: 'auto', display: 'block', marginBottom: 'var(--space-6)' }} />
        </Link>
        <h2 className="auth-layout__brand-headline">
          Connect with the World's Best Financial Experts
        </h2>
        <p className="auth-layout__brand-subline">
          Thousands of verified Chartered Accountants, CPAs, Tax Consultants, and Auditors ready to serve your business globally.
        </p>
      </div>
      <div className="auth-layout__brand-bottom">
        <ul className="auth-layout__trust-items">
          {trustItems.map((item) => (
            <li key={item.text} className="auth-layout__trust-item">
              <span className="auth-layout__trust-icon">{item.icon}</span>
              <span className="auth-layout__trust-text">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Right form panel */}
    <div className="auth-layout__form-panel">
      <div className="auth-layout__form-wrap">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthLayout;
