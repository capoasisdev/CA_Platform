import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, Button, Input, Select, TextArea, Avatar, StarIcon, Badge } from '../../components/ui';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const COUNTRIES = [
  { value: 'India', label: 'India 🇮🇳' },
  { value: 'Ireland', label: 'Ireland 🇮🇪' },
  { value: 'United Kingdom', label: 'United Kingdom 🇬🇧' },
  { value: 'United Arab Emirates', label: 'UAE 🇦🇪' },
  { value: 'United States', label: 'United States 🇺🇸' },
  { value: 'Singapore', label: 'Singapore 🇸🇬' },
  { value: 'Australia', label: 'Australia 🇦🇺' },
];

const AVAILABLE_SPECIALIZATIONS = [
  'Corporate Tax',
  'Audit & Assurance',
  'International Tax',
  'GST / VAT',
  'M&A Advisory',
  'Business Valuation',
  'Company Incorporation',
  'Financial Planning',
  'Compliance & Legal',
];

const SAVED_EXPERTS = [
  {
    id: 1,
    name: 'Priya Sharma',
    designation: 'Chartered Accountant',
    country: 'India 🇮🇳',
    specializations: ['Corporate Tax', 'Transfer Pricing', 'GST'],
    rating: 4.9,
    reviews: 48,
    yearsExperience: 12,
    initials: 'PS',
  },
  {
    id: 2,
    name: 'James O\'Brien',
    designation: 'Certified Public Accountant',
    country: 'Ireland 🇮🇪',
    specializations: ['International Tax', 'M&A Advisory', 'Audit'],
    rating: 4.8,
    reviews: 31,
    yearsExperience: 9,
    initials: 'JO',
  },
  {
    id: 3,
    name: 'Fatima Al-Hassan',
    designation: 'Tax Consultant',
    country: 'UAE 🇦🇪',
    specializations: ['VAT', 'Corporate Compliance', 'Company Formation'],
    rating: 5.0,
    reviews: 22,
    yearsExperience: 7,
    initials: 'FA',
  },
];

const Profile = () => {
  const { role } = useOutletContext();
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    fullName: '',
    designation: '',
    country: 'India',
    experience: '',
    hourlyRate: '',
    bio: '',
    selectedSpecs: [],
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (error) throw error;
        
        setProfile({
          fullName: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Demo User',
          designation: data.designation || '',
          country: data.country || 'India',
          experience: data.experience?.toString() || '',
          hourlyRate: data.hourly_rate?.toString() || '',
          bio: data.bio || '',
          selectedSpecs: data.specializations || [],
        });
      } catch (err) {
        console.warn('Failed to load profile from database:', err.message);
        // Fallback for demo when user has no db record yet
        setProfile({
          fullName: 'Demo User',
          designation: 'Chartered Accountant & Tax Consultant',
          country: 'India',
          experience: '8',
          hourlyRate: '150',
          bio: 'Dedicated Chartered Accountant specializing in domestic corporate taxation, international business structuring, and comprehensive financial audits.',
          selectedSpecs: ['Corporate Tax', 'GST / VAT', 'Compliance & Legal'],
        });
      }
    };
    loadProfile();
  }, [user]);

  const handleSpecToggle = (spec) => {
    setProfile((prev) => {
      const alreadySelected = prev.selectedSpecs.includes(spec);
      const nextSpecs = alreadySelected
        ? prev.selectedSpecs.filter((s) => s !== spec)
        : [...prev.selectedSpecs, spec];
      return {
        ...prev,
        selectedSpecs: nextSpecs,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const nextErrors = {};
    if (!profile.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (!profile.designation.trim()) nextErrors.designation = 'Designation is required';
    if (!profile.country) nextErrors.country = 'Country is required';
    if (!profile.experience || isNaN(profile.experience)) nextErrors.experience = 'Please enter a valid number';
    if (!profile.hourlyRate || isNaN(profile.hourlyRate)) nextErrors.hourlyRate = 'Please enter a valid hourly rate';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSaving(true);
    try {
      const nameParts = profile.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          designation: profile.designation,
          experience: parseInt(profile.experience, 10),
          hourly_rate: parseInt(profile.hourlyRate, 10),
          bio: profile.bio,
          specializations: profile.selectedSpecs,
          country: profile.country,
        })
        .eq('id', user.id);

      if (error) throw error;
      setSuccessMessage('Profile details updated successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrors({ form: err.message || 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-editor-container">
      <Card>
        <Card.Header>
          <Card.Title>My Professional Profile</Card.Title>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-1)' }}>
            Manage the information displayed to prospective business clients searching for experts.
          </p>
        </Card.Header>
        <Card.Body>
          {successMessage && (
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
              {successMessage}
            </div>
          )}

          {errors.form && (
            <div style={{
              backgroundColor: 'var(--color-danger-bg)',
              color: 'var(--color-danger)',
              border: '1px solid var(--color-danger)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-6)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-editor">
            {/* Avatar Section */}
            <div className="profile-avatar-section">
              <Avatar name={profile.fullName || 'User'} size="lg" />
              <div className="profile-avatar-actions">
                <Button type="button" variant="outline" size="sm">
                  Upload Photo
                </Button>
                <p>JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            {/* Profile Fields Grid */}
            <div className="profile-form-grid">
              <Input
                label="Full Name"
                id="input-fullName"
                required
                value={profile.fullName}
                onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                error={errors.fullName}
              />

              <Input
                label="Professional Designation"
                id="input-designation"
                required
                value={profile.designation}
                onChange={(e) => setProfile(prev => ({ ...prev, designation: e.target.value }))}
                error={errors.designation}
                placeholder="e.g. Chartered Accountant / Tax Advisor"
              />

              <Select
                label="Country of Registration"
                id="select-country"
                required
                options={COUNTRIES}
                value={profile.country}
                onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                error={errors.country}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <Input
                  label="Experience (Years)"
                  id="input-experience"
                  type="number"
                  required
                  value={profile.experience}
                  onChange={(e) => setProfile(prev => ({ ...prev, experience: e.target.value }))}
                  error={errors.experience}
                />
                <Input
                  label="Consulting Rate ($/hr)"
                  id="input-hourlyRate"
                  type="number"
                  required
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile(prev => ({ ...prev, hourlyRate: e.target.value }))}
                  error={errors.hourlyRate}
                />
              </div>

              <div className="profile-form-full">
                <label className="input-group__label">Specializations / Areas of Expertise</label>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-xs)', marginBottom: 'var(--space-2)' }}>
                  Select the services you offer. Clients will find you based on these tags.
                </p>
                <div className="profile-specializations-list">
                  {AVAILABLE_SPECIALIZATIONS.map((spec) => {
                    const isSelected = profile.selectedSpecs.includes(spec);
                    return (
                      <button
                        key={spec}
                        type="button"
                        className={`profile-spec-tag${isSelected ? ' profile-spec-tag--selected' : ''}`}
                        onClick={() => handleSpecToggle(spec)}
                      >
                        {isSelected ? '✓ ' : '+ '} {spec}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="profile-form-full">
                <TextArea
                  label="Professional Overview"
                  id="textarea-bio"
                  required
                  rows={5}
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  error={errors.bio}
                  placeholder="Describe your qualifications, client work, key skills, and advisory background..."
                />
              </div>
            </div>

            <div className="profile-actions">
              <Button type="button" variant="ghost">
                Reset Changes
              </Button>
              <Button type="submit" isLoading={isSaving}>
                Save Profile
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
