import { Link, useOutletContext } from 'react-router-dom';
import { Card, EyeIcon, MailIcon, HandshakeIcon, BoltIcon, StarIcon, DocIcon, UserIcon, GlobeIcon, SettingsIcon, BriefcaseIcon, ChartIcon } from '../../components/ui';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

// Professional View Data
const PROF_STATS = [
  { label: 'Profile Views',    value: '248',  change: '+12% this week', icon: <EyeIcon size={20} /> },
  { label: 'Inquiries',        value: '14',   change: '+3 new today',   icon: <MailIcon size={20} /> },
  { label: 'Connections',      value: '92',   change: '+5 this month',  icon: <HandshakeIcon size={20} /> },
  { label: 'Avg. Response',    value: '2.4h', change: 'Great!',         icon: <BoltIcon size={20} /> },
];

const PROF_ACTIVITY = [
  { icon: <MailIcon size={16} />, title: 'New inquiry from Mehta Exports regarding corporate tax compliance', time: '2 hours ago' },
  { icon: <StarIcon size={16} style={{ color: 'var(--color-warning)' }} />, title: 'You received a 5-star review from Williams Capital Group',         time: '5 hours ago' },
  { icon: <EyeIcon size={16} />, title: 'Your profile was viewed 18 times from 6 different countries',       time: 'Yesterday' },
  { icon: <HandshakeIcon size={16} />, title: 'Ahmed Al-Farsi accepted your connection request',                   time: '2 days ago' },
  { icon: <DocIcon size={16} />, title: 'Complete your profile to unlock priority search ranking',            time: 'Tip' },
];

const PROF_QUICK_ACTIONS = [
  { icon: <UserIcon size={18} />, label: 'Edit Profile',          to: ROUTES.DASHBOARD_PROFILE },
  { icon: <MailIcon size={18} />, label: 'View Inquiries',         to: ROUTES.DASHBOARD_INQUIRIES },
  { icon: <GlobeIcon size={18} />, label: 'Browse Professionals',   to: ROUTES.FIND_PROFESSIONALS },
  { icon: <SettingsIcon size={18} />, label: 'Account Settings',       to: ROUTES.DASHBOARD_SETTINGS },
];

// Client/Business View Data
const CLIENT_STATS = [
  { label: 'Active Projects',   value: '3',     change: 'All in progress', icon: <BriefcaseIcon size={20} /> },
  { label: 'Sent Inquiries',    value: '6',     change: '2 pending reply', icon: <MailIcon size={20} /> },
  { label: 'Saved Experts',     value: '12',    change: '+3 this week',    icon: <UserIcon size={20} /> },
  { label: 'Total Spent',       value: '$4,200', change: 'Current billing',  icon: <ChartIcon size={20} /> },
];

const CLIENT_ACTIVITY = [
  { icon: <MailIcon size={16} />, title: 'Priya Sharma responded to your query regarding transfer pricing', time: '1 hour ago' },
  { icon: <StarIcon size={16} style={{ color: 'var(--color-success)' }} />, title: 'Consultation scheduled with Fatima Al-Hassan on Wednesday', time: '3 hours ago' },
  { icon: <UserIcon size={16} />, title: 'You saved Rajesh Mehta (GST Specialist) to your network', time: 'Yesterday' },
  { icon: <DocIcon size={16} />, title: 'Post a detailed project requirement to get matched with CAs globally', time: 'Tip' },
];

const CLIENT_QUICK_ACTIONS = [
  { icon: <GlobeIcon size={18} />, label: 'Find a CA / CPA',      to: ROUTES.FIND_PROFESSIONALS },
  { icon: <DocIcon size={18} />, label: 'Post Project Need',     to: ROUTES.DASHBOARD_REQUIREMENTS },
  { icon: <UserIcon size={18} />, label: 'View Saved Experts',    to: ROUTES.DASHBOARD_SAVED_EXPERTS },
  { icon: <SettingsIcon size={18} />, label: 'Update Settings',      to: ROUTES.DASHBOARD_SETTINGS },
];

const Dashboard = () => {
  const { role } = useOutletContext();
  const { profile } = useAuth();
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const stats = role === 'client' ? CLIENT_STATS : PROF_STATS;
  const activity = role === 'client' ? CLIENT_ACTIVITY : PROF_ACTIVITY;
  const quickActions = role === 'client' ? CLIENT_QUICK_ACTIONS : PROF_QUICK_ACTIONS;

  const displayName = profile 
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || (role === 'client' ? 'Client Org' : 'Demo User')
    : (role === 'client' ? 'Client Org' : 'Demo User');

  return (
    <div className="dashboard-page">
      {/* Welcome */}
      <div className="dashboard-welcome">
        <h2 className="dashboard-welcome__greeting">
          Welcome back, {displayName}
        </h2>
        <p className="dashboard-welcome__date">{today}</p>
      </div>

      {/* Stats */}
      <div className="dashboard-stats" role="list">
        {stats.map((s) => (
          <div key={s.label} className="stat-card" role="listitem">
            <div className="stat-card__header">
              <span className="stat-card__label">{s.label}</span>
              <span className="stat-card__icon" aria-hidden="true">{s.icon}</span>
            </div>
            <div className="stat-card__value">{s.value}</div>
            <div className="stat-card__change">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="dashboard-grid">
        {/* Recent Activity */}
        <Card>
          <Card.Header>
            <Card.Title>Recent Activity</Card.Title>
          </Card.Header>
          <Card.Body>
            <ul className="activity-list" role="list">
              {activity.map((item, i) => (
                <li key={i} className="activity-item">
                  <div className="activity-item__icon" aria-hidden="true">{item.icon}</div>
                  <div className="activity-item__body">
                    <p className="activity-item__title">{item.title}</p>
                    <time className="activity-item__time">{item.time}</time>
                  </div>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
          </Card.Header>
          <Card.Body>
            <nav className="quick-actions" aria-label="Quick actions">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.to} className="quick-action-btn">
                  <span className="quick-action-btn__icon" aria-hidden="true">{action.icon}</span>
                  <span className="quick-action-btn__label">{action.label}</span>
                </Link>
              ))}
            </nav>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
