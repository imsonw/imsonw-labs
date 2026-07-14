import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="no-print" style={{
      padding: '3rem 0',
      borderTop: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <p style={{ fontWeight: 500 }}>
          {t('footerText')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
          <span>Powered by React + Vite</span>
          <span>•</span>
          <span>Bilingual Support (EN/VI)</span>
        </div>
      </div>
    </footer>
  );
}
