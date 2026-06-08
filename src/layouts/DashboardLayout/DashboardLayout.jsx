import { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { Avatar, HomeIcon, UserIcon, MailIcon, SettingsIcon, ArrowLeftIcon } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/ca_connect_logo.png';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const { profile } = useAuth();
  const [role, setRole] = useState('professional'); // 'professional' | 'client'

  useEffect(() => {
    if (profile?.role) {
      setRole(profile.role);
    }
  }, [profile]);

  const navItems = role === 'client' 
    ? [
        { icon: <HomeIcon size={18} />, label: 'Overview',        to: ROUTES.DASHBOARD },
        { icon: <UserIcon size={18} />, label: 'Saved Experts',   to: ROUTES.DASHBOARD_PROFILE },
        { icon: <MailIcon size={18} />, label: 'Sent Inquiries',  to: ROUTES.DASHBOARD_INQUIRIES },
        { icon: <SettingsIcon size={18} />, label: 'Settings',      to: ROUTES.DASHBOARD_SETTINGS },
      ]
    : [
        { icon: <HomeIcon size={18} />, label: 'Overview',   to: ROUTES.DASHBOARD },
        { icon: <UserIcon size={18} />, label: 'My Profile', to: ROUTES.DASHBOARD_PROFILE },
        { icon: <MailIcon size={18} />, label: 'Inquiries',  to: ROUTES.DASHBOARD_INQUIRIES },
        { icon: <SettingsIcon size={18} />, label: 'Settings',   to: ROUTES.DASHBOARD_SETTINGS },
      ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar" aria-label="Dashboard navigation">
        <Link to={ROUTES.HOME} className="dashboard-sidebar__brand" aria-label="CA Connect Global" style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-4) 0' }}>
          <img src={logoImg} alt="CA Connect Global" style={{ height: '32px', width: 'auto', display: 'block' }} />
        </Link>

        <nav className="dashboard-sidebar__nav">
          <span className="dashboard-sidebar__section-label">Main</span>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                `dashboard-sidebar__nav-link${isActive ? ' dashboard-sidebar__nav-link--active' : ''}`
              }
            >
              <span className="dashboard-sidebar__nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="dashboard-sidebar__footer">
          <NavLink
            to={ROUTES.HOME}
            className="dashboard-sidebar__nav-link"
          >
            <span className="dashboard-sidebar__nav-icon"><ArrowLeftIcon size={16} /></span>
            Back to Site
          </NavLink>
        </div>
      </aside>

      {/* Main area */}
      <div className="dashboard-main">
        {/* Top bar */}
        <header className="dashboard-topbar">
          <div className="dashboard-topbar__left">
            <h1 className="dashboard-topbar__page-title">Dashboard</h1>
          </div>
          <div className="dashboard-topbar__right">
            {/* Premium Role Switcher */}
            <div className="role-selector" style={{ marginRight: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 'var(--font-weight-medium)' }}>Role:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  padding: 'var(--space-1) var(--space-2)',
                  borderRadius: 'var(--radius-base)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="professional">Professional</option>
                <option value="client">Client</option>
              </select>
            </div>

            <div className="dashboard-topbar__avatar-btn">
              <Avatar name={profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Demo User' : 'Demo User'} size="sm" />
              <span className="dashboard-topbar__user-name">
                {profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Demo User' : 'Demo User'}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="dashboard-content" id="dashboard-main-content">
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
