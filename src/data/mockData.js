// Mock data for development and placeholder content
// Replace with Supabase queries when backend is integrated

export const STATS = [
  { label: 'Verified Professionals', value: '12,000+' },
  { label: 'Countries Covered',      value: '85+' },
  { label: 'Businesses Served',      value: '4,200+' },
  { label: 'Successful Engagements', value: '18,500+' },
];

export const SPECIALIZATIONS = [
  { id: 1, title: 'Corporate Tax',         iconKey: 'building', description: 'Corporate tax planning, compliance, and advisory for businesses of all sizes.' },
  { id: 2, title: 'Audit & Assurance',     iconKey: 'search', description: 'Independent audits, internal reviews, and financial statement assurance.' },
  { id: 3, title: 'International Tax',     iconKey: 'globe', description: 'Cross-border taxation, transfer pricing, and treaty planning.' },
  { id: 4, title: 'GST / VAT',             iconKey: 'doc', description: 'Indirect tax advisory, registration, filing, and dispute resolution.' },
  { id: 5, title: 'M&A Advisory',          iconKey: 'handshake', description: 'Mergers, acquisitions, restructuring, and transaction advisory.' },
  { id: 6, title: 'Business Valuation',    iconKey: 'chart', description: 'Fair value assessment, business appraisals, and valuation reports.' },
  { id: 7, title: 'Company Incorporation', iconKey: 'doc', description: 'Business setup, company registration, and compliance in new jurisdictions.' },
  { id: 8, title: 'Financial Planning',    iconKey: 'briefcase', description: 'Cash flow management, budgeting, and long-term financial strategy.' },
  { id: 9, title: 'Compliance & Legal',    iconKey: 'scale', description: 'Regulatory compliance, corporate governance, and legal coordination.' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Mehta',
    role: 'CEO, Mehta Exports Pvt. Ltd.',
    country: 'India',
    quote:
      'We expanded to three new markets within eight months. CA Connect Global helped us find local tax and compliance experts in each country almost instantly. The quality of professionals is outstanding.',
    rating: 5,
    initials: 'RM',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'CFO, Williams Capital Group',
    country: 'United Kingdom',
    quote:
      'Finding a verified CA who understands cross-border M&A and international tax in multiple jurisdictions used to take months. CA Connect cut that down to days. Invaluable for our deal team.',
    rating: 5,
    initials: 'SW',
  },
  {
    id: 3,
    name: 'Ahmed Al-Farsi',
    role: 'Founder, Gulf Ventures LLC',
    country: 'UAE',
    quote:
      'The platform connected me with a transfer pricing specialist who helped us save significantly on tax. The process was seamless and the professional was highly responsive.',
    rating: 5,
    initials: 'AA',
  },
];

export const HOW_IT_WORKS_CLIENT = [
  {
    step: '01',
    title: 'Describe Your Need',
    description: 'Tell us what you need — whether it is tax advice, an audit, company registration, or M&A support.',
  },
  {
    step: '02',
    title: 'Get Matched',
    description: 'Browse verified professionals filtered by country, specialization, language, and experience.',
  },
  {
    step: '03',
    title: 'Engage Directly',
    description: 'Connect with the right expert, request a consultation, and build a long-term advisory relationship.',
  },
];

export const HOW_IT_WORKS_PROFESSIONAL = [
  {
    step: '01',
    title: 'Build Your Profile',
    description: 'Create a detailed profile showcasing your certifications, specializations, industries, and countries served.',
  },
  {
    step: '02',
    title: 'Get Discovered',
    description: 'Businesses searching for professionals in your area of expertise find and reach out to you.',
  },
  {
    step: '03',
    title: 'Grow Your Practice',
    description: 'Accept inquiries, deliver excellent service, collect reviews, and expand your global client base.',
  },
];

export const FEATURED_PROFESSIONALS = [
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
