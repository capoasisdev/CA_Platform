import './About.css';

const STORY_STATS = [
  { value: '12K+',  label: 'Professionals' },
  { value: '85+',   label: 'Countries' },
  { value: '4.2K+', label: 'Businesses' },
  { value: '18K+',  label: 'Engagements' },
];

const MISSION_CARDS = [
  {
    icon: '🎯',
    title: 'Our Mission',
    text: 'To democratize access to top-tier financial expertise globally — making it possible for any business, anywhere in the world, to connect with the right professional at the right time.',
  },
  {
    icon: '🌟',
    title: 'Our Vision',
    text: 'To become the definitive global ecosystem where financial professionals thrive and businesses of all sizes access world-class accounting, tax, compliance, and advisory services seamlessly.',
  },
];

const VALUES = [
  { icon: '🔍', title: 'Integrity',       text: 'We uphold the highest standards of professional conduct, transparency, and ethical business practice.' },
  { icon: '🌍', title: 'Global Reach',    text: 'We believe geography should never be a barrier to accessing great financial expertise.' },
  { icon: '✅', title: 'Quality First',   text: 'Every professional is verified. Every listing is reviewed. Quality is non-negotiable.' },
  { icon: '🤝', title: 'Trust',           text: 'Businesses make critical decisions through our platform. We earn trust through actions, not claims.' },
  { icon: '⚡', title: 'Efficiency',      text: 'We remove friction from the process of finding and engaging financial professionals.' },
  { icon: '📈', title: 'Growth Together', text: 'We grow when professionals grow and when businesses succeed. Our incentives are perfectly aligned.' },
];

const About = () => (
  <>
    {/* Hero */}
    <section className="about-hero" aria-labelledby="about-title">
      <div className="container">
        <p className="about-hero__label">About CA Connect Global</p>
        <h1 className="about-hero__title" id="about-title">
          Connecting Financial Expertise. Globally.
        </h1>
        <p className="about-hero__subtitle">
          We built the platform the accounting and finance world was missing — a trusted, verified, and global network that connects businesses with the right financial professionals, anywhere on earth.
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="about-story section" aria-labelledby="story-title">
      <div className="container">
        <div className="about-story__grid">
          <div>
            <p className="about-story__label">Our Story</p>
            <h2 className="about-story__title" id="story-title">
              Built by Professionals, for Professionals
            </h2>
            <p className="about-story__text">
              CA Connect Global was founded by a team of finance professionals who experienced firsthand the frustration of cross-border advisory — the endless referrals, the difficulty verifying credentials, and the lack of a single trusted destination.
            </p>
            <p className="about-story__text">
              We set out to build a platform that combines the professional depth of a dedicated network with the discoverability of a marketplace — purpose-built for the accounting and financial advisory industry.
            </p>
            <p className="about-story__text">
              Today, CA Connect Global serves thousands of professionals and businesses across 85+ countries, facilitating meaningful connections that drive real business outcomes.
            </p>
          </div>
          <div className="about-story__visual" aria-label="Key statistics">
            {STORY_STATS.map((s) => (
              <div key={s.label} className="about-story__visual-card">
                <div className="about-story__visual-value">{s.value}</div>
                <div className="about-story__visual-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="about-mission section" aria-labelledby="mission-title">
      <div className="container">
        <div className="section-header">
          <span className="section-header__label">Purpose</span>
          <h2 className="section-header__title" id="mission-title">Mission & Vision</h2>
        </div>
        <div className="about-mission__grid">
          {MISSION_CARDS.map((card) => (
            <div key={card.title} className="about-mission__card">
              <div className="about-mission__icon" aria-hidden="true">{card.icon}</div>
              <h3 className="about-mission__title">{card.title}</h3>
              <p className="about-mission__text">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="about-values section" aria-labelledby="values-title">
      <div className="container">
        <div className="section-header">
          <span className="section-header__label">Our Foundation</span>
          <h2 className="section-header__title" id="values-title">Core Values</h2>
          <p className="section-header__description">
            These principles guide every decision we make — from product features to how we verify professionals.
          </p>
        </div>
        <ul className="about-values__grid" role="list">
          {VALUES.map((v) => (
            <li key={v.title} className="about-value-item">
              <div className="about-value-item__icon" aria-hidden="true">{v.icon}</div>
              <h3 className="about-value-item__title">{v.title}</h3>
              <p className="about-value-item__text">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default About;
