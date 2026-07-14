import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SectionHeader from '../components/ui/SectionHeader';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import { Mail, MapPin, Phone, ExternalLink, Send, CheckCircle } from 'lucide-react';

const PORTFOLIO_URL = 'https://portfolio-ngocsondn.vercel.app/';

// Custom SVG Icons because some lucide versions do not export brand icons
const Github = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const { t } = useApp();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending message API
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section className="section container" style={{ paddingTop: '8rem' }}>

      <SectionHeader marginBottom="3.5rem" title={t('contactTitle')} subtitle={t('contactSubtitle')} />

      <div className="grid-2">

        {/* Contact Form */}
        <div className="glass-panel no-print" style={{ padding: '2rem' }}>
          {isSuccess ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: '1rem',
              color: '#10b981'
            }}>
              <CheckCircle size={48} />
              <h3 style={{ color: '#10b981' }}>{t('contactSuccess')}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('contactName')}
                </label>
                <Input type="text" name="name" required value={formData.name} onChange={handleInputChange} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('contactEmail')}
                </label>
                <Input type="email" name="email" required value={formData.email} onChange={handleInputChange} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('contactMessage')}
                </label>
                <TextArea name="message" required rows={4} value={formData.message} onChange={handleInputChange} />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}
              >
                {isSending ? (
                  <span>{t('contactSending')}</span>
                ) : (
                  <>
                    <span>{t('contactSend')}</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact info and Portfolio Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Quick Info */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>{t('contactInfo')}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--badge-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</span>
                  <a href="mailto:ngocsoncmu@gmail.com" style={{ fontWeight: 500, fontSize: '0.95rem' }}>ngocsoncmu@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--badge-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone</span>
                  <a href="tel:+84397442858" style={{ fontWeight: 500, fontSize: '0.95rem' }}>0397.442.858</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--badge-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('contactLocation')}</span>
                  <span style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Da Nang, Vietnam</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '8px' }}>
                <Linkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '8px' }}>
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Portfolio link-out card */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem' }}>{t('contactResumeCardTitle')}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {t('contactResumeCardDesc')}
            </p>
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', gap: '0.5rem', textDecoration: 'none' }}
            >
              <span>{t('contactResume')}</span>
              <ExternalLink size={18} />
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
