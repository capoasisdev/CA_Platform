import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Avatar,
  CheckIcon,
  GlobeIcon,
  BoltIcon,
  StarIcon,
  LockIcon,
  HandshakeIcon,
  BuildingIcon,
  SearchIcon,
  DocIcon,
  BriefcaseIcon,
  ScaleIcon,
  ChartIcon
} from '../../components/ui';
import { ROUTES } from '../../constants/routes';
import {
  STATS,
  SPECIALIZATIONS,
  TESTIMONIALS,
  HOW_IT_WORKS_CLIENT,
  HOW_IT_WORKS_PROFESSIONAL,
} from '../../data/mockData';
import './Home.css';

const WHY_US_ITEMS = [
  { icon: <CheckIcon size={24} style={{ color: 'var(--color-success)' }} />, title: 'Verified Professionals Only',    desc: 'Every CA, CPA, and consultant on our platform is credentialed, verified, and reviewed by our team.' },
  { icon: <GlobeIcon size={24} />, title: 'Truly Global Reach',             desc: 'Access professionals across 85+ countries who understand local regulations and international standards.' },
  { icon: <BoltIcon size={24} />, title: 'Fast, Direct Connections',       desc: 'Skip the middlemen. Connect directly with experts who match your specific business needs.' },
  { icon: <StarIcon size={24} style={{ color: 'var(--color-warning)' }} />, title: 'Ratings & Reviews',              desc: 'Make informed decisions with transparent ratings, detailed reviews, and verified client feedback.' },
  { icon: <LockIcon size={24} />, title: 'Secure & Confidential',          desc: 'Your business information and professional inquiries are handled with the highest level of security.' },
  { icon: <HandshakeIcon size={24} />, title: 'Long-Term Relationships',        desc: 'Build lasting advisory relationships with trusted professionals who grow alongside your business.' },
];

const getSpecIcon = (key) => {
  switch (key) {
    case 'building':   return <BuildingIcon size={24} />;
    case 'search':     return <SearchIcon size={24} />;
    case 'globe':      return <GlobeIcon size={24} />;
    case 'doc':        return <DocIcon size={24} />;
    case 'handshake':  return <HandshakeIcon size={24} />;
    case 'chart':      return <ChartIcon size={24} />;
    case 'briefcase':  return <BriefcaseIcon size={24} />;
    case 'scale':      return <ScaleIcon size={24} />;
    default:           return <DocIcon size={24} />;
  }
};

const StarRating = ({ rating }) => (
  <div className="testimonial-card__stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? 'var(--color-warning)' : 'var(--color-border-strong)' }}>★</span>
    ))}
  </div>
);

const Home = () => {
  const [activeTab, setActiveTab] = useState('client');

  const steps = activeTab === 'client' ? HOW_IT_WORKS_CLIENT : HOW_IT_WORKS_PROFESSIONAL;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero__label">
            <span className="hero__label-dot" aria-hidden="true" />
            Now serving 85+ countries worldwide
          </div>
          <h1 className="hero__title" id="hero-title">
            The World's Largest Network of{' '}
            <span className="hero__title-accent">Financial Professionals</span>
          </h1>
          <p className="hero__subtitle">
            Connect with verified Chartered Accountants, CPAs, Tax Consultants, Auditors, and Financial Advisors — globally, instantly, professionally.
          </p>
          <div className="hero__ctas">
            <Button as="a" href={ROUTES.FIND_PROFESSIONALS} variant="primary" size="lg">
              Find a Professional
            </Button>
            <Button as="a" href={ROUTES.REGISTER} variant="secondary" size="lg">
              Join as Professional
            </Button>
          </div>

          {/* Trust stats */}
          <div className="hero__trust" role="list">
            {STATS.map((stat, i) => (
              <>
                {i > 0 && <div key={`div-${i}`} className="hero__trust-divider" aria-hidden="true" />}
                <div key={stat.label} className="hero__trust-item" role="listitem">
                  <div className="hero__trust-value">{stat.value}</div>
                  <div className="hero__trust-label">{stat.label}</div>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="how-it-works section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Simple Process</span>
            <h2 className="section-header__title" id="how-title">How CA Connect Works</h2>
            <p className="section-header__description">
              Whether you're a business seeking expert advice or a professional growing your practice, getting started takes minutes.
            </p>
          </div>

          {/* Tabs */}
          <div className="how-it-works__tabs" role="tablist" aria-label="User type">
            <button
              role="tab"
              aria-selected={activeTab === 'client'}
              id="tab-client"
              aria-controls="tabpanel-client"
              className={`how-it-works__tab${activeTab === 'client' ? ' how-it-works__tab--active' : ''}`}
              onClick={() => setActiveTab('client')}
            >
              For Businesses
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'professional'}
              id="tab-professional"
              aria-controls="tabpanel-professional"
              className={`how-it-works__tab${activeTab === 'professional' ? ' how-it-works__tab--active' : ''}`}
              onClick={() => setActiveTab('professional')}
            >
              For Professionals
            </button>
          </div>

          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="how-it-works__steps"
          >
            {steps.map((step) => (
              <div key={step.step} className="how-it-works__step">
                <div className="how-it-works__step-number" aria-hidden="true">{step.step}</div>
                <h3 className="how-it-works__step-title">{step.title}</h3>
                <p className="how-it-works__step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specializations ──────────────────────────────────── */}
      <section className="specializations section" aria-labelledby="spec-title">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Areas of Expertise</span>
            <h2 className="section-header__title" id="spec-title">Find Experts in Every Specialization</h2>
            <p className="section-header__description">
              From corporate tax to M&A advisory, our network covers every domain of finance and compliance.
            </p>
          </div>
          <ul className="specializations__grid" role="list">
            {SPECIALIZATIONS.map((spec) => (
              <li key={spec.id}>
                <Link to={ROUTES.FIND_PROFESSIONALS} className="spec-card">
                  <span className="spec-card__icon" aria-hidden="true">{getSpecIcon(spec.iconKey)}</span>
                  <h3 className="spec-card__title">{spec.title}</h3>
                  <p className="spec-card__desc">{spec.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Why CA Connect ───────────────────────────────────── */}
      <section className="why-us section" aria-labelledby="why-title">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Why Choose Us</span>
            <h2 className="section-header__title" id="why-title">Built for Trust. Designed for Scale.</h2>
            <p className="section-header__description">
              CA Connect Global isn't just a directory — it's a professional ecosystem built for the modern financial industry.
            </p>
          </div>
          <ul className="why-us__grid" role="list">
            {WHY_US_ITEMS.map((item) => (
              <li key={item.title} className="why-us__item">
                <div className="why-us__icon-wrap" aria-hidden="true">{item.icon}</div>
                <div className="why-us__content">
                  <h3 className="why-us__title">{item.title}</h3>
                  <p className="why-us__desc">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="testimonials section" aria-labelledby="testimonials-title">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Client Stories</span>
            <h2 className="section-header__title" id="testimonials-title">Trusted by Businesses Worldwide</h2>
            <p className="section-header__description">
              See how CA Connect Global has helped businesses expand, comply, and thrive internationally.
            </p>
          </div>
          <div className="testimonials__grid" role="list">
            {TESTIMONIALS.map((t) => (
              <article key={t.id} className="testimonial-card" role="listitem">
                <StarRating rating={t.rating} />
                <blockquote className="testimonial-card__quote">"{t.quote}"</blockquote>
                <div className="testimonial-card__author">
                  <Avatar name={t.name} size="md" />
                  <div className="testimonial-card__author-info">
                    <div className="testimonial-card__author-name">{t.name}</div>
                    <div className="testimonial-card__author-role">{t.role} · {t.country}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="cta-banner" aria-labelledby="cta-title">
        <div className="container">
          <h2 className="cta-banner__title" id="cta-title">
            Ready to Connect Globally?
          </h2>
          <p className="cta-banner__subtitle">
            Join thousands of businesses and professionals already building the future of financial advisory.
          </p>
          <div className="cta-banner__actions">
            <Button as="a" href={ROUTES.FIND_PROFESSIONALS} variant="primary" size="lg" className="btn--white">
              Find a Professional
            </Button>
            <Button as="a" href={ROUTES.REGISTER} variant="outline" size="lg" className="btn--white-outline">
              Join as Professional
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
