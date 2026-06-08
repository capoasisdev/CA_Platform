import { useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import './Settings.css';

const Settings = () => {
  const [status, setStatus] = useState('active');
  const [notifications, setNotifications] = useState({
    inquiries: true,
    connections: true,
    weeklyDigest: false,
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg('Settings updated successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="settings-page-container">
      <Card>
        <Card.Header>
          <Card.Title>Account Settings</Card.Title>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-1)' }}>
            Configure your professional presence, system notification preferences, and passwords.
          </p>
        </Card.Header>
        <Card.Body>
          {successMsg && (
            <div style={{
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              border: '1px solid var(--color-success)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-6)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="settings-section">
            {/* Availability */}
            <div className="settings-group">
              <h3 className="settings-group__title">Availability Status</h3>
              <p className="settings-group__description">
                Control if you are open to receiving new consultation requests from clients.
              </p>
              <div className="settings-radio-group">
                <label className="settings-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={status === 'active'}
                    onChange={() => setStatus('active')}
                  />
                  <span>Active (Open to Inquiries)</span>
                </label>
                <label className="settings-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="away"
                    checked={status === 'away'}
                    onChange={() => setStatus('away')}
                  />
                  <span>Away (Invisible in Search)</span>
                </label>
              </div>
            </div>

            {/* Notifications */}
            <div className="settings-group">
              <h3 className="settings-group__title">Notifications</h3>
              <p className="settings-group__description">
                Manage how you want to be notified when events happen on CA Connect Global.
              </p>
              <div className="settings-options-list">
                <label className="settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notifications.inquiries}
                    onChange={() => handleToggleNotification('inquiries')}
                  />
                  <span>Email me immediately when a client sends a new inquiry</span>
                </label>
                <label className="settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notifications.connections}
                    onChange={() => handleToggleNotification('connections')}
                  />
                  <span>Send system alerts for new professional network connections</span>
                </label>
                <label className="settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notifications.weeklyDigest}
                    onChange={() => handleToggleNotification('weeklyDigest')}
                  />
                  <span>Send a weekly performance digest of profile views and analytics</span>
                </label>
              </div>
            </div>

            {/* Change Password */}
            <div className="settings-group">
              <h3 className="settings-group__title">Change Password</h3>
              <p className="settings-group__description">
                Ensure your account details remain secure by updating your password regularly.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)', maxWidth: '400px' }}>
                <Input
                  type="password"
                  label="Current Password"
                  value={password.current}
                  onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                />
                <Input
                  type="password"
                  label="New Password"
                  value={password.new}
                  onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                />
              </div>
            </div>

            <div className="settings-actions">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="submit" isLoading={isSaving}>
                Save Changes
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Settings;
