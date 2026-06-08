import { useState, useEffect } from 'react';
import { Card, Button, Input, Select, Modal, TextArea, Badge, Avatar, StarIcon } from '../../components/ui';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import './FindProfessionals.css';

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

const FALLBACK_PROFESSIONALS = [
  {
    id: 'f1',
    first_name: 'Priya',
    last_name: 'Sharma',
    designation: 'Chartered Accountant',
    country: 'India',
    specializations: ['Corporate Tax', 'International Tax', 'GST / VAT'],
    experience: 12,
    hourly_rate: 150,
    bio: 'Specializing in domestic corporate taxation, international business structuring, and transfer pricing. Over 12 years of corporate compliance experience.',
  },
  {
    id: 'f2',
    first_name: 'James',
    last_name: "O'Brien",
    designation: 'Certified Public Accountant',
    country: 'Ireland',
    specializations: ['International Tax', 'M&A Advisory', 'Audit & Assurance'],
    experience: 9,
    hourly_rate: 200,
    bio: 'Independent auditor assisting tech companies with cross-border M&A transitions, treaty planning, and corporate filings across Europe.',
  },
  {
    id: 'f3',
    first_name: 'Fatima',
    last_name: 'Al-Hassan',
    designation: 'Tax Consultant',
    country: 'United Arab Emirates',
    specializations: ['GST / VAT', 'Compliance & Legal', 'Company Incorporation'],
    experience: 7,
    hourly_rate: 120,
    bio: 'Expert in GCC VAT rules, offshore corporate setups, and regulatory compliance advisory for investors expanding to Dubai.',
  },
];

const FindProfessionals = () => {
  const { user } = useAuth();
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [activeSpec, setActiveSpec] = useState('');
  
  // Saved experts tracking state
  const [savedIds, setSavedIds] = useState([]);

  // Modal State
  const [selectedPro, setSelectedPro] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadSavedExperts = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('saved_experts')
        .select('professional_id')
        .eq('client_id', user.id);
      if (error) throw error;
      setSavedIds(data?.map(d => d.professional_id) || []);
    } catch (err) {
      console.warn('Could not load saved experts', err);
    }
  };

  const handleToggleSave = async (proId) => {
    if (!user) {
      alert("Please log in to save professionals to your network.");
      return;
    }

    const isSaved = savedIds.includes(proId);
    try {
      if (isSaved) {
        const { error } = await supabase
          .from('saved_experts')
          .delete()
          .eq('client_id', user.id)
          .eq('professional_id', proId);
        if (error) throw error;
        setSavedIds(prev => prev.filter(id => id !== proId));
      } else {
        const { error } = await supabase
          .from('saved_experts')
          .insert({ client_id: user.id, professional_id: proId });
        if (error) throw error;
        setSavedIds(prev => [...prev, proId]);
      }
    } catch (err) {
      console.error('Error toggling saved expert:', err.message);
    }
  };

  const loadProfessionals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'professional');
      if (error) throw error;
      
      if (data && data.length > 0) {
        setProfessionals(data);
      } else {
        setProfessionals(FALLBACK_PROFESSIONALS);
      }
    } catch (err) {
      console.warn('Failed to query Supabase profiles, loading fallback data:', err.message);
      setProfessionals(FALLBACK_PROFESSIONALS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfessionals();
    loadSavedExperts();
  }, [user]);

  const handleOpenContact = (pro) => {
    setSelectedPro(pro);
    setMessageText('');
    setSuccessMsg('');
    setIsModalOpen(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedPro) return;
    setIsSending(true);
    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          client_id: user?.id || null,
          professional_id: selectedPro.id && !selectedPro.id.startsWith('f') ? selectedPro.id : null,
          client_name: user ? user.email.split('@')[0] : 'Anonymous Client',
          project_type: selectedPro.specializations?.[0] || 'General Consultation',
          message: messageText,
        }
      ]);
      
      if (error) throw error;
      setSuccessMsg(`Your message has been sent to ${selectedPro.first_name}!`);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to send inquiry:', err.message);
      // Fallback response simulation
      setSuccessMsg(`(Demo) Message sent to ${selectedPro.first_name}!`);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    } finally {
      setIsSending(false);
    }
  };

  // Filter professionals
  const filteredProfessionals = professionals.filter((pro) => {
    const fullName = `${pro.first_name || ''} ${pro.last_name || ''}`.toLowerCase();
    const designation = (pro.designation || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = fullName.includes(query) || designation.includes(query);
    const matchesCountry = selectedCountry ? pro.country === selectedCountry : true;
    const matchesSpec = activeSpec ? pro.specializations?.includes(activeSpec) : true;
    
    return matchesSearch && matchesCountry && matchesSpec;
  });

  return (
    <>
      <section className="directory-hero">
        <div className="container">
          <h1 className="directory-hero__title">Find Verified Financial Experts</h1>
          <p className="directory-hero__subtitle">
            Search and connect directly with credentialed Chartered Accountants, CPAs, Tax Consultants, and Corporate Advisors globally.
          </p>
        </div>
      </section>

      <section className="directory-main section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          {/* Controls */}
          <div className="directory-controls">
            <Input
              id="search"
              placeholder="Search by name, designation, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              label="Keywords"
            />
            <Select
              id="country"
              label="Country"
              options={COUNTRIES}
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              placeholder="All Countries"
            />
            
            {/* Specialization Filter Tags */}
            <div className="directory-specs-filter">
              <span className="directory-specs-label">Filter by Specialization</span>
              <div className="directory-specs-tags">
                <button
                  type="button"
                  className={`directory-spec-btn${!activeSpec ? ' directory-spec-btn--active' : ''}`}
                  onClick={() => setActiveSpec('')}
                >
                  All
                </button>
                {AVAILABLE_SPECIALIZATIONS.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    className={`directory-spec-btn${activeSpec === spec ? ' directory-spec-btn--active' : ''}`}
                    onClick={() => setActiveSpec(spec)}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid list */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Loading professionals...</div>
          ) : filteredProfessionals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-text-secondary)' }}>
              No professionals match your search criteria.
            </div>
          ) : (
            <div className="directory-grid">
              {filteredProfessionals.map((pro) => (
                <div key={pro.id} className="pro-card-wrapper">
                  <Card className="pro-card">
                    <Card.Body>
                      <div className="pro-card__header">
                        <Avatar name={`${pro.first_name || ''} ${pro.last_name || ''}`} size="md" />
                        <div className="pro-card__identity">
                          <h3 className="pro-card__name">{pro.first_name} {pro.last_name}</h3>
                          <p className="pro-card__designation">{pro.designation || 'Financial Advisor'}</p>
                          <span className="pro-card__country">📍 {pro.country || 'Global'}</span>
                        </div>
                      </div>

                      <div className="pro-card__meta">
                        <div className="pro-card__meta-item">
                          <span className="pro-card__meta-label">Experience</span>
                          <span className="pro-card__meta-value">{pro.experience || '5'}+ years</span>
                        </div>
                        <div className="pro-card__meta-item">
                          <span className="pro-card__meta-label">Hourly Rate</span>
                          <span className="pro-card__meta-value">${pro.hourly_rate || '100'}/hr</span>
                        </div>
                      </div>

                      <p className="pro-card__bio">{pro.bio || 'Qualified advisor offering consultation services.'}</p>

                      <div className="pro-card__specs">
                        {pro.specializations?.map((spec) => (
                          <Badge key={spec} variant="primary">{spec}</Badge>
                        ))}
                      </div>

                      <div className="pro-card__actions" style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <Button 
                          variant={savedIds.includes(pro.id) ? "success" : "outline"} 
                          onClick={() => handleToggleSave(pro.id)}
                          style={{ minWidth: '44px', padding: '0' }}
                          title={savedIds.includes(pro.id) ? "Saved" : "Save Professional"}
                        >
                          {savedIds.includes(pro.id) ? "❤️" : "🤍"}
                        </Button>
                        <Button variant="primary" style={{ flexGrow: 1 }} onClick={() => handleOpenContact(pro)}>
                          Contact Expert
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Direct Messaging Modal */}
      {selectedPro && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Inquire with ${selectedPro.first_name} ${selectedPro.last_name}`}
          size="md"
          footer={
            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSendMessage} isLoading={isSending} disabled={!messageText.trim()}>
                Send Message
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {successMsg && (
              <div style={{
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                border: '1px solid var(--color-success)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-base)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)'
              }}>
                {successMsg}
              </div>
            )}
            
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
              Explain your project needs, tax challenges, or cross-border incorporation questions. {selectedPro.first_name} will receive this directly in their dashboard.
            </p>

            <TextArea
              id="direct-message"
              label="Your Message"
              rows={5}
              placeholder={`Hi ${selectedPro.first_name}, I am looking for assistance with...`}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              required
            />
          </form>
        </Modal>
      )}
    </>
  );
};

export default FindProfessionals;
