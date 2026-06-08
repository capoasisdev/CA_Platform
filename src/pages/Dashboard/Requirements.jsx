import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, Button, Input, Select, TextArea, Modal, Loader } from '../../components/ui';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import './Requirements.css';

const COUNTRIES = [
  { value: 'India', label: 'India 🇮🇳' },
  { value: 'Ireland', label: 'Ireland 🇮🇪' },
  { value: 'United Kingdom', label: 'United Kingdom 🇬🇧' },
  { value: 'United Arab Emirates', label: 'UAE 🇦🇪' },
  { value: 'United States', label: 'United States 🇺🇸' },
  { value: 'Singapore', label: 'Singapore 🇸🇬' },
  { value: 'Australia', label: 'Australia 🇦🇺' },
];

const SPECIALIZATIONS = [
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

const Requirements = () => {
  const { role } = useOutletContext();
  const { user } = useAuth();

  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Filters for Professional
  const [filterCountry, setFilterCountry] = useState('');
  const [filterSpec, setFilterSpec] = useState('');

  // Form State
  const [form, setForm] = useState({
    title: '',
    description: '',
    country: 'India',
    specialization: 'Corporate Tax',
    budget: '',
  });

  const loadRequirements = async () => {
    setLoading(true);
    try {
      let query = supabase.from('requirements').select(`
        *,
        client:profiles!requirements_client_id_fkey(
          first_name,
          last_name,
          email
        )
      `);

      if (role === 'client' && user) {
        query = query.eq('client_id', user.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      setRequirements(data || []);
    } catch (err) {
      console.error('Error fetching requirements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequirements();
  }, [role, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from('requirements').insert([
        {
          client_id: user.id,
          title: form.title,
          description: form.description,
          country: form.country,
          specialization: form.specialization,
          budget: parseFloat(form.budget) || null,
        },
      ]);

      if (error) throw error;

      setIsModalOpen(false);
      setForm({
        title: '',
        description: '',
        country: 'India',
        specialization: 'Corporate Tax',
        budget: '',
      });
      loadRequirements();
    } catch (err) {
      console.error('Failed to post requirement:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredRequirements = requirements.filter((req) => {
    const matchesCountry = filterCountry ? req.country === filterCountry : true;
    const matchesSpec = filterSpec ? req.specialization === filterSpec : true;
    return matchesCountry && matchesSpec;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-12)' }}>
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="requirements-page">
      <Card>
        <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Card.Title>
              {role === 'client' ? 'My Posted Projects' : 'Explore Global Projects & Needs'}
            </Card.Title>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-1)' }}>
              {role === 'client'
                ? 'Create RFPs and manage your requirements seeking top CAs and CPAs.'
                : 'Browse requests submitted by clients looking for consultation and financial setup support.'}
            </p>
          </div>
          {role === 'client' && (
            <Button onClick={() => setIsModalOpen(true)}>Post Project Need</Button>
          )}
        </Card.Header>
        <Card.Body>
          {role === 'professional' && (
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div style={{ flex: 1 }}>
                <Select
                  id="filter-country"
                  label="Filter Country"
                  options={COUNTRIES}
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  placeholder="All Countries"
                />
              </div>
              <div style={{ flex: 1 }}>
                <Select
                  id="filter-spec"
                  label="Filter Area of Expertise"
                  options={SPECIALIZATIONS.map(s => ({ value: s, label: s }))}
                  value={filterSpec}
                  onChange={(e) => setFilterSpec(e.target.value)}
                  placeholder="All Specializations"
                />
              </div>
            </div>
          )}

          {filteredRequirements.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>No project postings found.</p>
            </div>
          ) : (
            <div className="requirements-list">
              {filteredRequirements.map((req) => (
                <div key={req.id} className="requirement-card">
                  <div className="requirement-card__top">
                    <div>
                      <h3 className="requirement-card__title">{req.title}</h3>
                      <div className="requirement-card__meta">
                        <span>📍 {req.country}</span> &middot;{' '}
                        <span>💼 {req.specialization}</span>
                      </div>
                    </div>
                    {req.budget && (
                      <span className="requirement-card__budget">${req.budget}</span>
                    )}
                  </div>
                  <p className="requirement-card__desc">{req.description}</p>
                  <div className="requirement-card__footer">
                    <span className="requirement-card__posted">
                      Posted by {req.client?.first_name || 'Business Client'} &middot;{' '}
                      {new Date(req.created_at).toLocaleDateString()}
                    </span>
                    {role === 'professional' && (
                      <Button size="sm" onClick={() => alert(`Contacting regarding: "${req.title}"`)}>
                        Send Proposal / Pitch
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Post Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Post Your Project Requirement"
        size="md"
      >
        <form onSubmit={handleSubmit} className="requirements-form">
          <Input
            id="req-title"
            label="Project Title"
            required
            placeholder="e.g. Setting up cross-border tax structure in Ireland"
            value={form.title}
            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
          />
          <TextArea
            id="req-desc"
            label="Describe your needs"
            required
            rows={5}
            placeholder="Provide context regarding business model, specific problems, and scope of work..."
            value={form.description}
            onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Select
              id="req-country"
              label="Country Scope"
              required
              options={COUNTRIES}
              value={form.country}
              onChange={(e) => setForm(prev => ({ ...prev, country: e.target.value }))}
            />
            <Select
              id="req-spec"
              label="Primary Specialization Needed"
              required
              options={SPECIALIZATIONS.map(s => ({ value: s, label: s }))}
              value={form.specialization}
              onChange={(e) => setForm(prev => ({ ...prev, specialization: e.target.value }))}
            />
          </div>
          <Input
            id="req-budget"
            label="Budget (USD, Optional)"
            type="number"
            placeholder="e.g. 500"
            value={form.budget}
            onChange={(e) => setForm(prev => ({ ...prev, budget: e.target.value }))}
          />
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isSaving}>Post Requirement</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Requirements;
