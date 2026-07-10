import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { projects } from '../data/projects';
import { X, Award, ExternalLink, ShieldAlert, Zap, TrendingUp } from 'lucide-react';

export default function Projects() {
  const { t, language } = useApp();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  const getMetricIcon = (category) => {
    if (category === 'tech') return <Zap size={18} style={{ color: 'var(--accent-secondary)' }} />;
    return <TrendingUp size={18} style={{ color: 'var(--accent-tertiary)' }} />;
  };

  return (
    <section className="section container">
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{t('projectsTitle')}</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
          {t('projectsSubtitle')}
        </p>

        {/* Filter Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }} className="no-print">
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              background: filter === 'all' ? 'var(--gradient-primary)' : 'var(--bg-secondary)',
              color: filter === 'all' ? '#ffffff' : 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
              boxShadow: filter === 'all' ? '0 4px 10px rgba(139, 92, 246, 0.2)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            {t('projectFilterAll')}
          </button>
          <button
            onClick={() => setFilter('product')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              background: filter === 'product' ? 'var(--gradient-primary)' : 'var(--bg-secondary)',
              color: filter === 'product' ? '#ffffff' : 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
              boxShadow: filter === 'product' ? '0 4px 10px rgba(139, 92, 246, 0.2)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            {t('projectFilterProduct')}
          </button>
          <button
            onClick={() => setFilter('tech')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              background: filter === 'tech' ? 'var(--gradient-primary)' : 'var(--bg-secondary)',
              color: filter === 'tech' ? '#ffffff' : 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
              boxShadow: filter === 'tech' ? '0 4px 10px rgba(139, 92, 246, 0.2)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            {t('projectFilterTech')}
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid-3">
        {filteredProjects.map((project) => (
          <div key={project.id} className="glass-panel" style={{
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
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
                {getMetricIcon(project.category)}
                <span style={{ fontSize: '0.8rem' }}>{project.metrics[language]}</span>
              </div>

              {/* View Case Study Button */}
              <button
                onClick={() => setSelectedProject(project)}
                className="btn btn-secondary no-print"
                style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem 1rem' }}
              >
                <span>{t('projectDetailBtn')}</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal Popup */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem',
        }} onClick={() => setSelectedProject(null)}>
          
          <div className="glass-panel" style={{
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid var(--border-color)',
            animation: 'modal-fade-in 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Image Header */}
            <div style={{ position: 'relative', height: '260px' }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title[language]}
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
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <X size={20} />
              </button>

              {/* Title inside image header */}
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem' }}>
                <span className="badge" style={{ backgroundColor: 'var(--accent-primary)', color: '#ffffff', border: 'none', marginBottom: '0.5rem' }}>
                  {selectedProject.category === 'tech' ? 'Technical Architecture' : 'Product Strategy'}
                </span>
                <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginTop: '0.25rem' }}>
                  {selectedProject.title[language]}
                </h2>
              </div>
            </div>

            {/* Modal Body: STAR structured case study */}
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Key Highlight Metric */}
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
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedProject.metrics[language]}</span>
                </div>
              </div>

              {/* Context (Situation) */}
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)' }}></span>
                  {t('projectContext')}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {selectedProject.details[language].context}
                </p>
              </div>

              {/* Problem (Task) */}
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: 'var(--accent-tertiary)', marginBottom: '0.5rem' }}>
                  <ShieldAlert size={16} />
                  {t('projectProblem')}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {selectedProject.details[language].problem}
                </p>
              </div>

              {/* Solution (Action) */}
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                  <Zap size={16} />
                  {t('projectSolution')}
                </h4>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {selectedProject.details[language].solution}
                </div>
              </div>

              {/* Results (Result) */}
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: '#10b981', marginBottom: '0.5rem' }}>
                  <TrendingUp size={16} />
                  {t('projectResult')}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {selectedProject.details[language].result}
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Embedding animation keyframes */}
      <style>{`
        @keyframes modal-fade-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
