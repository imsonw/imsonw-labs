import React from 'react';

export default function FilterPill({ active, onClick, children, variant = 'solid' }) {
  const isTag = variant === 'tag';
  return (
    <button
      onClick={onClick}
      style={{
        display: isTag ? 'flex' : 'inline-block',
        alignItems: isTag ? 'center' : undefined,
        gap: isTag ? '0.25rem' : undefined,
        padding: isTag ? '0.3rem 0.8rem' : '0.5rem 1.25rem',
        borderRadius: '9999px',
        border: '1px solid var(--border-color)',
        background: active
          ? (isTag ? 'var(--badge-text)' : 'var(--gradient-primary)')
          : (isTag ? 'transparent' : 'var(--bg-secondary)'),
        color: active ? '#ffffff' : (isTag ? 'var(--text-secondary)' : 'var(--text-primary)'),
        fontWeight: 600,
        cursor: 'pointer',
        fontSize: isTag ? '0.8rem' : '0.875rem',
        boxShadow: !isTag && active ? '0 4px 10px rgba(139, 92, 246, 0.2)' : 'none',
        transition: 'all var(--transition-fast)',
      }}
    >
      {children}
    </button>
  );
}
