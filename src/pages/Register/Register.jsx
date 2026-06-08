import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Select, UserIcon, BuildingIcon } from '../../components/ui';
import { ROUTES } from '../../constants/routes';
import './Register.css';
import '../Login/Login.css';

const ACCOUNT_TYPES = [
  {
    id: 'professional',
    icon: <UserIcon size={32} style={{ color: 'var(--color-primary)' }} />,
    label: 'Financial Professional',
    desc: 'CA, CPA, Tax Consultant, Auditor, or Advisor',
  },
  {
    id: 'client',
    icon: <BuildingIcon size={32} style={{ color: 'var(--color-primary)' }} />,
    label: 'Business / Client',
    desc: 'Startup, SME, Enterprise, or Investor',
  },
];

const COUNTRY_OPTIONS = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'sg', label: 'Singapore' },
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'de', label: 'Germany' },
  { value: 'other', label: 'Other' },
];

import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [step, setStep]         = useState(1);
  const [accountType, setType]  = useState('');
  const [form, setForm]         = useState({ firstName: '', lastName: '', email: '', password: '', country: '', terms: false });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateStep1 = () => {
    if (!accountType) return { accountType: 'Please select an account type' };
    return {};
  };

  const validateStep2 = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim())  errs.lastName  = 'Last name is required';
    if (!form.email.trim())     errs.email     = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password)         errs.password  = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (!form.country)          errs.country   = 'Please select your country';
    if (!form.terms)            errs.terms     = 'You must agree to the terms';
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep1();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await signUp(form.email, form.password, {
        firstName: form.firstName,
        lastName: form.lastName,
        role: accountType,
        country: form.country,
      });
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setErrors({ form: err.message || 'Registration failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page-header">
        <Link to={ROUTES.HOME} className="auth-page-header__back">← Back to home</Link>
        <h1 className="auth-page-header__title">Create Your Account</h1>
        <p className="auth-page-header__subtitle">Join thousands of professionals and businesses globally</p>
      </div>

      {/* Step indicator */}
      <div className="register-step-indicator" aria-label={`Step ${step} of 2`}>
        <div className={`register-step-dot${step >= 1 ? ' register-step-dot--active' : ''}`} />
        <div className={`register-step-dot${step >= 2 ? ' register-step-dot--active' : ''}`} />
      </div>

      {step === 1 ? (
        /* Step 1: Account type */
        <div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            I want to join as a…
          </p>
          <div className="register-type-grid" role="radiogroup" aria-label="Account type">
            {ACCOUNT_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                role="radio"
                aria-checked={accountType === type.id}
                className={`register-type-card${accountType === type.id ? ' register-type-card--selected' : ''}`}
                onClick={() => { setType(type.id); setErrors({}); }}
              >
                <div className="register-type-card__icon">{type.icon}</div>
                <div className="register-type-card__label">{type.label}</div>
                <div className="register-type-card__desc">{type.desc}</div>
              </button>
            ))}
          </div>
          {errors.accountType && (
            <p style={{ color: 'var(--color-danger)', fontSize: 'var(--font-size-xs)', marginBottom: 'var(--space-3)' }} role="alert">
              {errors.accountType}
            </p>
          )}
          <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
            Continue
          </Button>
        </div>
      ) : (
        /* Step 2: Details form */
        <>
          <button className="register-back-btn" onClick={() => setStep(1)} type="button">
            ← Back
          </button>
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {errors.form && (
              <p style={{ color: 'var(--color-danger)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-4)' }} role="alert">
                {errors.form}
              </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <Input id="reg-firstName" label="First Name" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} error={errors.firstName} required />
              <Input id="reg-lastName"  label="Last Name"  name="lastName"  placeholder="Smith" value={form.lastName}  onChange={handleChange} error={errors.lastName}  required />
            </div>
            <Input id="reg-email"    label="Email Address" name="email"    type="email"    placeholder="you@company.com" value={form.email}    onChange={handleChange} error={errors.email}    required />
            <Input id="reg-password" label="Password"      name="password" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={handleChange} error={errors.password} required />
            <Select id="reg-country" label="Country" name="country" options={COUNTRY_OPTIONS} value={form.country} onChange={handleChange} error={errors.country} placeholder="Select your country" required />

            <div className="register-terms">
              <input
                type="checkbox"
                id="reg-terms"
                name="terms"
                className="register-terms__checkbox"
                checked={form.terms}
                onChange={handleChange}
                aria-describedby={errors.terms ? 'reg-terms-error' : undefined}
              />
              <label htmlFor="reg-terms" className="register-terms__text">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            {errors.terms && <p id="reg-terms-error" style={{ color: 'var(--color-danger)', fontSize: 'var(--font-size-xs)' }} role="alert">{errors.terms}</p>}

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>
        </>
      )}

      <p className="auth-footer-link">
        Already have an account? <Link to={ROUTES.LOGIN}>Log in</Link>
      </p>
    </>
  );
};

export default Register;
