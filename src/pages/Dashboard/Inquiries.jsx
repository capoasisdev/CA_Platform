import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, Table, Badge, Button, Modal, TextArea } from '../../components/ui';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import './Inquiries.css';

const INCOMING_INQUIRIES = [
  {
    id: 'INQ-1001',
    clientName: 'Mehta Exports Pvt. Ltd.',
    projectType: 'Corporate Tax',
    status: 'Pending',
    date: '08/06/2026',
    message: 'Hello, we are expanding our operations to Singapore and Ireland and need advisory assistance with corporate tax registration and transfer pricing rules. Please share your availability for a 30-minute discovery call.',
  },
  {
    id: 'INQ-0998',
    clientName: 'Williams Capital Group',
    projectType: 'M&A Advisory',
    status: 'Responded',
    date: '07/06/2026',
    message: 'We are seeking financial due diligence for a prospective acquisition of a mid-sized fintech firm. Need an independent auditor who can review accounts for the past 3 fiscal years.',
  },
];

const SENT_INQUIRIES = [
  {
    id: 'INQ-1001',
    clientName: 'Priya Sharma (CA)',
    projectType: 'Corporate Tax',
    status: 'Pending',
    date: '08/06/2026',
    message: 'Hi Priya, we are seeking corporate tax advisory regarding our new subsidiary registration.',
  },
];

const Inquiries = () => {
  const { role } = useOutletContext();
  const { user } = useAuth();
  const [inquiriesList, setInquiriesList] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const fetchInquiries = async () => {
    if (!user) {
      setInquiriesList(role === 'client' ? SENT_INQUIRIES : INCOMING_INQUIRIES);
      return;
    }
    try {
      let query = supabase.from('inquiries').select('*');
      if (role === 'client') {
        query = query.eq('client_id', user.id);
      }
      const { data: dbData, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      
      const formatted = dbData.map((item) => ({
        id: item.id.substring(0, 8).toUpperCase(),
        dbId: item.id,
        clientName: item.client_name || 'Anonymous Client',
        projectType: item.project_type,
        status: item.status,
        date: new Date(item.created_at).toLocaleDateString('en-GB'),
        message: item.message,
        replyMessage: item.reply_message,
      }));
      setInquiriesList(formatted);
    } catch (err) {
      console.warn('Failed to fetch from database, using mock data:', err.message);
      setInquiriesList(role === 'client' ? SENT_INQUIRIES : INCOMING_INQUIRIES);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [role, user]);

  const handleOpenInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyText(inquiry.replyMessage || '');
    setIsModalOpen(true);
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedInquiry) return;
    setIsReplying(true);
    try {
      if (selectedInquiry.dbId) {
        const { error } = await supabase
          .from('inquiries')
          .update({
            reply_message: replyText,
            status: 'Responded',
          })
          .eq('id', selectedInquiry.dbId);
        if (error) throw error;
      }
      
      setInquiriesList((prev) =>
        prev.map((inq) =>
          inq.id === selectedInquiry.id ? { ...inq, status: 'Responded', replyMessage: replyText } : inq
        )
      );
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save reply:', err.message);
    } finally {
      setIsReplying(false);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'clientName', label: role === 'client' ? 'Recipient Consultant' : 'Client Name' },
    { key: 'projectType', label: 'Service Needed' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => {
        const variant =
          status === 'Pending'
            ? 'warning'
            : status === 'Responded'
            ? 'info'
            : 'success';
        return <Badge variant={variant} dot>{status}</Badge>;
      },
    },
    { key: 'date', label: 'Date' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="inquiries-actions">
          <Button size="sm" variant="outline" onClick={() => handleOpenInquiry(row)}>
            View Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="inquiries-page-container">
      <Card>
        <Card.Header>
          <Card.Title>{role === 'client' ? 'Sent Inquiries' : 'Client Inquiries'}</Card.Title>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-1)' }}>
            {role === 'client' 
              ? 'Track the status of consultation requests and professional inquiries you have sent to CAs and CPAs.'
              : 'Review and respond to service requests and consultation bookings received from prospective business clients.'
            }
          </p>
        </Card.Header>
        <Card.Body>
          <Table columns={columns} data={inquiriesList} emptyMessage="No inquiries found." />
        </Card.Body>
      </Card>

      {selectedInquiry && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Inquiry ${selectedInquiry.id}`}
          size="lg"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              {role !== 'client' && selectedInquiry.status !== 'Completed' && (
                <Button onClick={handleSendReply} isLoading={isReplying} disabled={!replyText.trim()}>
                  Send Reply
                </Button>
              )}
            </div>
          }
        >
          <div className="inquiry-detail-modal">
            <div className="inquiry-detail-row">
              <label>{role === 'client' ? 'Consultant' : 'From Client'}</label>
              <p>{selectedInquiry.clientName}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="inquiry-detail-row">
                <label>Requested Category</label>
                <p>{selectedInquiry.projectType}</p>
              </div>
              <div className="inquiry-detail-row">
                <label>Status</label>
                <div>
                  <Badge
                    variant={
                      selectedInquiry.status === 'Pending'
                        ? 'warning'
                        : selectedInquiry.status === 'Responded'
                        ? 'info'
                        : 'success'
                    }
                  >
                    {selectedInquiry.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="inquiry-detail-row">
              <label>Message Content</label>
              <div className="inquiry-message">{selectedInquiry.message}</div>
            </div>

            {selectedInquiry.replyMessage && (
              <div className="inquiry-detail-row">
                <label>Response Send</label>
                <div style={{ backgroundColor: 'var(--color-primary-50)', borderColor: 'var(--color-primary-100)' }}>
                  {selectedInquiry.replyMessage}
                </div>
              </div>
            )}

            {role !== 'client' && selectedInquiry.status !== 'Completed' && !selectedInquiry.replyMessage && (
              <div className="inquiry-detail-row" style={{ marginTop: 'var(--space-4)' }}>
                <TextArea
                  label="Reply message"
                  placeholder="Draft your proposal or setup response..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Inquiries;
