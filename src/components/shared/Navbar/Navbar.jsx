import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Button } from '../../ui';
import logoImg from '../../../assets/ca_connect_logo.png';
import './Navbar.css';

const navLinks = [
  { label: 'Home',               to: ROUTES.HOME },
  { label: 'Find Professionals', to: ROUTES.FIND_PROFESSIONALS },
  { label: 'About',              to: ROUTES.ABOUT },
  { label: 'Contact',            to: ROUTES.CONTACT },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isMenuOpen, setIsMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change / resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setIsMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu  = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__inner">
          {/* Brand */}
          <Link to={ROUTES.HOME} className="navbar__brand" onClick={closeMenu} aria-label="CA Connect Global — Home">
            <img src={logoImg} alt="CA Connect Global" style={{ height: '36px', width: 'auto', display: 'block' }} />
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `navbar__nav-link${isActive ? ' navbar__nav-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="navbar__actions">
            <Button as="a" href={ROUTES.LOGIN}    variant="ghost"   size="sm">Log In</Button>
            <Button as="a" href={ROUTES.REGISTER} variant="primary" size="sm">Get Started</Button>
          </div>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger${isMenuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-drawer"
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav
        id="mobile-drawer"
        className={`navbar__drawer${isMenuOpen ? ' navbar__drawer--open' : ''}`}
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
            }
            onClick={closeMenu}
          >
            {link.label}
          </NavLink>
        ))}
        <div className="navbar__drawer-divider" />
        <div className="navbar__drawer-actions">
          <Button as="a" href={ROUTES.LOGIN}    variant="secondary" size="md" fullWidth onClick={closeMenu}>
            Log In
          </Button>
          <Button as="a" href={ROUTES.REGISTER} variant="primary"   size="md" fullWidth onClick={closeMenu}>
            Get Started
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
