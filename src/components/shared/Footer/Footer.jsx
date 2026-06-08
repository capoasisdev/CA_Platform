import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import logoImg from '../../../assets/ca_connect_logo.png';
import './Footer.css';

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Find Professionals', to: ROUTES.FIND_PROFESSIONALS },
      { label: 'Post a Requirement', to: ROUTES.REGISTER },
      { label: 'How It Works',       to: ROUTES.ABOUT },
      { label: 'Pricing',            to: '#' },
    ],
  },
  {
    title: 'For Professionals',
    links: [
      { label: 'Join as Professional', to: ROUTES.REGISTER },
      { label: 'Build Your Profile',   to: ROUTES.REGISTER },
      { label: 'Professional Blog',    to: '#' },
      { label: 'Community',            to: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',      to: ROUTES.ABOUT },
      { label: 'Contact',       to: ROUTES.CONTACT },
      { label: 'Careers',       to: '#' },
      { label: 'Press',         to: '#' },
    ],
  },
];

const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="footer__main">
      {/* Brand */}
      <div className="footer__brand">
        <Link to={ROUTES.HOME} className="footer__logo-wrap" aria-label="CA Connect Global Home">
          <img src={logoImg} alt="CA Connect Global" style={{ height: '36px', width: 'auto', display: 'block', marginBottom: 'var(--space-4)' }} />
        </Link>
        <p className="footer__tagline">
          The world's largest professional network for Chartered Accountants, CPAs, Tax Consultants, and Financial Advisors.
        </p>
        <div className="footer__social">
          <a href="#" className="footer__social-link" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="#" className="footer__social-link" aria-label="Twitter / X">
            <TwitterIcon />
          </a>
        </div>
      </div>

      {/* Link Columns */}
      {columns.map((col) => (
        <div key={col.title}>
          <h3 className="footer__col-title">{col.title}</h3>
          <ul className="footer__links">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="footer__link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Bottom bar */}
    <div className="footer__bottom">
      <div className="footer__bottom-inner">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} CA Connect Global. All rights reserved.
        </p>
        <nav className="footer__legal" aria-label="Legal links">
          <a href="#" className="footer__legal-link">Privacy Policy</a>
          <a href="#" className="footer__legal-link">Terms of Service</a>
          <a href="#" className="footer__legal-link">Cookie Policy</a>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
