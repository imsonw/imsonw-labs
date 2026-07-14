import React from 'react';
import { ExternalLink, Zap, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProjectCard({ project, onView }) {
  const { t, language } = useApp();

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '100%',
    }}>
      {/* Project Image */}
      <div style={{ position: 'relative', height: '180px', width: '100%', overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title[language]}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <span className="badge" style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          backgroundColor: 'rgba(10, 11, 16, 0.75)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff'
        }}>
          {project.category === 'tech' ? 'Technical PM' : 'Product Lead'}
        </span>
      </div>

      {/* Project Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {project.tags.map((tag, i) => (
            <span key={i} className="badge" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
              {tag}
            </span>
          ))}
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>
          {project.title[language]}
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', flexGrow: 1 }}>
          {project.subtitle[language]}
        </p>

        {/* Impact Metric Bar */}
        <div style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '8px',
          padding: '0.6rem 0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          marginBottom: '1.25rem'
        }}>
          {project.category === 'tech'
            ? <Zap size={18} style={{ color: 'var(--accent-secondary)' }} />
            : <TrendingUp size={18} style={{ color: 'var(--accent-tertiary)' }} />}
          <span style={{ fontSize: '0.8rem' }}>{project.metrics[language]}</span>
        </div>

        {/* View Case Study Button */}
        <button
          onClick={onView}
          className="btn btn-secondary no-print"
          style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem 1rem' }}
        >
          <span>{t('projectDetailBtn')}</span>
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
