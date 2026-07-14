import React from 'react';
import { X, Award, ShieldAlert, Zap, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../ui/Modal';

export default function ProjectModal({ project, onClose }) {
  const { t, language } = useApp();

  return (
    <Modal onClose={onClose}>
      {/* Modal Image Header */}
      <div style={{ position: 'relative', height: '260px' }}>
        <img
          src={project.image}
          alt={project.title[language]}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(10,11,16,0.95) 100%)'
        }}></div>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem' }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent-primary)', color: '#ffffff', border: 'none', marginBottom: '0.5rem' }}>
            {project.category === 'tech' ? 'Technical Architecture' : 'Product Strategy'}
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginTop: '0.25rem' }}>
            {project.title[language]}
          </h2>
        </div>
      </div>

      {/* Modal Body: STAR structured case study */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        <div className="glass-panel" style={{
          padding: '1rem 1.5rem',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          backgroundColor: 'rgba(139, 92, 246, 0.03)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          borderRadius: '12px'
        }}>
          <Award size={24} style={{ color: 'var(--accent-primary)' }} />
          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Key Outcome / Result</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{project.metrics[language]}</span>
          </div>
        </div>

        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)' }}></span>
            {t('projectContext')}
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {project.details[language].context}
          </p>
        </div>

        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: 'var(--accent-tertiary)', marginBottom: '0.5rem' }}>
            <ShieldAlert size={16} />
            {t('projectProblem')}
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {project.details[language].problem}
          </p>
        </div>

        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
            <Zap size={16} />
            {t('projectSolution')}
          </h4>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
            {project.details[language].solution}
          </div>
        </div>

        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: '#10b981', marginBottom: '0.5rem' }}>
            <TrendingUp size={16} />
            {t('projectResult')}
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {project.details[language].result}
          </p>
        </div>

      </div>
    </Modal>
  );
}
