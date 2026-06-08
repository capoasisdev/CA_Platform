import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components/ui';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm]     = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim())    errs.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password)        errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await signIn(form.email, form.password);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setErrors({ form: err.message || 'Login failed. Please check credentials.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page-header">
        <Link to={ROUTES.HOME} className="auth-page-header__back">
          ← Back to home
        </Link>
        <h1 className="auth-page-header__title">Welcome back</h1>
        <p className="auth-page-header__subtitle">
          Log in to your CA Connect Global account
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {errors.form && (
          <p style={{ color: 'var(--color-danger)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-4)' }} role="alert">
            {errors.form}
          </p>
        )}
        <Input
          id="login-email"
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <div>
          <Input
            id="login-password"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            required
            iconRight={
              <button
                type="button"
                className="input-toggle-pwd"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', fontWeight: 'var(--font-weight-medium)', padding: '0 var(--space-2)' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            }
          />
        </div>

        <div className="auth-form__options">
          <label className="auth-form__checkbox-label">
            <input
              type="checkbox"
              name="remember"
              className="auth-form__checkbox"
              checked={form.remember}
              onChange={handleChange}
              id="login-remember"
            />
            Remember me
          </label>
          <a href="#" className="auth-form__forgot">Forgot password?</a>
        </div>

        <div className="auth-form__submit">
          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            {loading ? 'Logging in…' : 'Log In'}
          </Button>
        </div>
      </form>

      <p className="auth-footer-link">
        Don't have an account? <Link to={ROUTES.REGISTER}>Create one free</Link>
      </p>
    </>
  );
};

export default Login;
