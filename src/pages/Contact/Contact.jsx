import { useState } from 'react';
import { Button, Input, TextArea, Select, MailIcon, MapPinIcon, GlobeIcon, SuccessIcon } from '../../components/ui';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import './Contact.css';

const CONTACT_INFO = [
  { icon: <MailIcon size={24} />, title: 'Email Us',         detail: 'hello@caconnectglobal.com\nSupport available Mon–Fri, 9am–6pm IST' },
  { icon: <MapPinIcon size={24} />, title: 'Headquarters',      detail: 'CA Connect Global HQ\nMumbai, Maharashtra, India' },
  { icon: <GlobeIcon size={24} />, title: 'Global Operations', detail: 'We operate in 85+ countries.\nLocal partnerships across every continent.' },
];

const SUBJECT_OPTIONS = [
  { value: 'general',      label: 'General Inquiry' },
  { value: 'professional', label: 'Join as a Professional' },
  { value: 'business',     label: 'Business / Client Inquiry' },
  { value: 'partnership',  label: 'Partnership Opportunity' },
  { value: 'support',      label: 'Technical Support' },
  { value: 'media',        label: 'Press / Media' },
];

const FAQS = [
  {
    q: 'How are professionals verified on the platform?',
    a: 'Every professional undergoes a multi-step verification process that includes credential checks, certificate validation, and identity verification. We partner with professional bodies and regulatory authorities in each country.',
  },
  {
    q: 'Is CA Connect Global free to use for businesses?',
    a: 'Businesses can browse profiles, filter professionals, and view basic information for free. Premium features such as direct contact, priority matching, and detailed analytics are available through our subscription plans.',
  },
  {
    q: 'How do I list my services as a professional?',
    a: 'Simply register as a professional, complete your profile with your certifications, specializations, countries served, and experience. Our team will verify your credentials before your profile goes live.',
  },
  {
    q: 'What types of professionals can I find on the platform?',
    a: 'Our platform covers Chartered Accountants, CPAs, Tax Consultants, Auditors, Financial Advisors, Compliance Experts, Corporate Secretaries, M&A Advisors, and Business Valuation Experts.',
  },
];

const ChevronIcon = ({ open }) => (
  <svg
    className={`faq-item__chevron${open ? ' faq-item__chevron--open' : ''}`}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path d="M4.5 7l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="faq-item__question"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {q}
        <ChevronIcon open={open} />
      </button>
      {open && <div className="faq-item__answer">{a}</div>}
    </div>
  );
};

const Contact = () => {
  const { user } = useAuth();
  const [form, setForm]       = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim())  errs.firstName = 'First name is required';
    if (!form.lastName.trim())   errs.lastName  = 'Last name is required';
    if (!form.email.trim())      errs.email     = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.subject)           errs.subject   = 'Please select a subject';
    if (!form.message.trim())    errs.message   = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          client_id: user?.id || null,
          client_name: `${form.firstName} ${form.lastName}`,
          project_type: SUBJECT_OPTIONS.find((opt) => opt.value === form.subject)?.label || form.subject,
          message: form.message,
        },
      ]);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      setErrors({ form: err.message || 'Submission failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="container">
          <p className="contact-hero__label">Get In Touch</p>
          <h1 className="contact-hero__title" id="contact-title">We'd Love to Hear From You</h1>
          <p className="contact-hero__subtitle">
            Whether you have questions about the platform, need support, or want to explore a partnership — our team is ready to help.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="contact-main section" aria-label="Contact information and form">
        <div className="container">
          <div className="contact-main__grid">
            {/* Info cards */}
            <div className="contact-info">
              {CONTACT_INFO.map((info) => (
                <div key={info.title} className="contact-info-card">
                  <div className="contact-info-card__icon" aria-hidden="true">{info.icon}</div>
                  <div>
                    <h3 className="contact-info-card__title">{info.title}</h3>
                    <p className="contact-info-card__detail" style={{ whiteSpace: 'pre-line' }}>{info.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-form__success" role="status" aria-live="polite">
                  <div className="contact-form__success-icon">
                    <SuccessIcon size={48} />
                  </div>
                  <h2 className="contact-form__success-title">Message Sent!</h2>
                  <p className="contact-form__success-text">
                    Thank you for reaching out. Our team will get back to you within 1–2 business days.
                  </p>
                  <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' }); }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="contact-form-card__title">Send Us a Message</h2>
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    {errors.form && (
                      <p style={{ color: 'var(--color-danger)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-4)' }} role="alert">
                        {errors.form}
                      </p>
                    )}
                    <div className="contact-form__row">
                      <Input id="contact-firstName" label="First Name" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} error={errors.firstName} required />
                      <Input id="contact-lastName"  label="Last Name"  name="lastName"  placeholder="Smith" value={form.lastName}  onChange={handleChange} error={errors.lastName}  required />
                    </div>
                    <Input id="contact-email" label="Email Address" name="email" type="email" placeholder="john@company.com" value={form.email} onChange={handleChange} error={errors.email} required />
                    <Select id="contact-subject" label="Subject" name="subject" options={SUBJECT_OPTIONS} value={form.subject} onChange={handleChange} error={errors.subject} required />
                    <TextArea id="contact-message" label="Message" name="message" placeholder="Tell us more about how we can help…" value={form.message} onChange={handleChange} error={errors.message} rows={5} required />
                    <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq section" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">FAQ</span>
            <h2 className="section-header__title" id="faq-title">Frequently Asked Questions</h2>
          </div>
          <ul className="contact-faq__list" role="list">
            {FAQS.map((faq) => (
              <li key={faq.q}>
                <FAQItem q={faq.q} a={faq.a} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Contact;
