import React from 'react';

export default function SectionHeader({ title, subtitle, className, marginBottom = '3rem', children }) {
  return (
    <div className={className} style={{ textAlign: 'center', marginBottom }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
        {subtitle}
      </p>
      {children}
    </div>
  );
}
