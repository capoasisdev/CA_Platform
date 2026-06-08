import { useState, useEffect } from 'react';
import { Card, Button, Avatar, StarIcon, Badge, Loader } from '../../components/ui';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const SavedExperts = () => {
  const { user } = useAuth();
  const [savedExperts, setSavedExperts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSavedExperts = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_experts')
        .select(`
          id,
          professional:profiles!saved_experts_professional_id_fkey(
            id,
            first_name,
            last_name,
            designation,
            country,
            specializations,
            hourly_rate
          )
        `)
        .eq('client_id', user.id);

      if (error) throw error;
      setSavedExperts(data || []);
    } catch (err) {
      console.error('Error fetching saved experts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (savedId) => {
    try {
      const { error } = await supabase
        .from('saved_experts')
        .delete()
        .eq('id', savedId);

      if (error) throw error;
      setSavedExperts((prev) => prev.filter((item) => item.id !== savedId));
    } catch (err) {
      console.error('Error removing expert:', err);
    }
  };

  useEffect(() => {
    fetchSavedExperts();
  }, [user]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-12)' }}>
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="saved-experts-container">
      <Card>
        <Card.Header>
          <Card.Title>Saved Experts</Card.Title>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-1)' }}>
            Manage and quickly consult the verified professionals you have saved to your corporate network.
          </p>
        </Card.Header>
        <Card.Body>
          {savedExperts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>You haven't saved any professionals yet.</p>
              <Link to={ROUTES.FIND_PROFESSIONALS}>
                <Button>Browse Directory</Button>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {savedExperts.map((item) => {
                const prof = item.professional;
                if (!prof) return null;
                const fullName = `${prof.first_name || ''} ${prof.last_name || ''}`.trim() || 'Professional';
                return (
                  <div 
                    key={item.id} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-4)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                      <Avatar name={fullName} size="md" />
                      <div>
                        <h4 style={{ margin: 0, color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>{fullName}</h4>
                        <p style={{ margin: 'var(--space-1) 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                          {prof.designation || 'CA Professional'} &middot; {prof.country || 'Global'}
                        </p>
                        {prof.specializations && prof.specializations.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                            {prof.specializations.map((spec) => (
                              <Badge key={spec} variant="primary">{spec}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)' }}>
                      <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>
                        ${prof.hourly_rate || 'N/A'}/hr
                      </span>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <Button variant="outline" size="sm" onClick={() => handleRemove(item.id)}>
                          Remove
                        </Button>
                        <Link to={ROUTES.FIND_PROFESSIONALS}>
                          <Button size="sm">Contact</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SavedExperts;
