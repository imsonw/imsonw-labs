import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  const { t } = useApp();

  const stats = [
    { value: '3+', label: t('heroStatsProjects') },
    { value: '6+', label: t('heroStatsExp') },
    { value: '+40%', label: t('heroStatsImpact') },
  ];

  return (
    <section className="section container" style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '8rem',
    }}>
      <div className="grid-2" style={{ alignItems: 'center', width: '100%' }}>
        
        {/* Left Side: Copy and Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Welcome Tag */}
          <div style={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
            <span className="badge" style={{ fontSize: '0.85rem', gap: '0.5rem', padding: '0.4rem 1rem' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)', animation: 'pulse 2s infinite' }}></span>
              Open to new opportunities
            </span>
          </div>

          {/* Heading */}
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
              {t('heroTitle')}
            </span>
            <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', margin: '0.5rem 0 1rem 0' }}>
              <span className="gradient-text" style={{ fontSize: '4.2rem', display: 'block' }}>imsonw</span>
              {t('heroRole')}
            </h1>
          </div>

          {/* Subtitle */}
          <p style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '540px',
            lineHeight: '1.7',
          }}>
            {t('heroSubtitle')}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }} className="no-print">
            <button 
              onClick={() => setActiveTab('projects')} 
              className="btn btn-primary"
            >
              <span>{t('heroCTA_primary')}</span>
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => setActiveTab('blog')} 
              className="btn btn-secondary"
            >
              <span>{t('heroCTA_secondary')}</span>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Stats Section */}
          <div style={{ 
            display: 'flex', 
            gap: '2.5rem', 
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="gradient-text" style={{ 
                  fontFamily: "'Outfit', sans-serif", 
                  fontSize: '2.25rem', 
                  fontWeight: 800,
                  lineHeight: '1.2' 
                }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.25rem' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: 3D Art Asset */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          position: 'relative' 
        }}>
          {/* Decorative glowing circles behind the image */}
          <div style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'var(--gradient-glow)',
            filter: 'blur(30px)',
            zIndex: 0,
            opacity: 0.8
          }}></div>

          {/* Main Avatar / Asset Card */}
          <div className="glass-panel" style={{
            padding: '1.5rem',
            borderRadius: '24px',
            position: 'relative',
            zIndex: 1,
            maxWidth: '360px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--glass-border)',
            animation: 'float-card 6s ease-in-out infinite'
          }}>
            <img 
              src="/avatar.png" 
              alt="imsonw-labs Portfolio Asset" 
              style={{
                width: '100%',
                borderRadius: '16px',
                aspectRatio: '1',
                objectFit: 'cover',
                backgroundColor: 'var(--bg-tertiary)',
              }}
            />
            
            {/* Overlay tag displaying active status */}
            <div className="glass-panel" style={{
              position: 'absolute',
              bottom: '2.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              backgroundColor: 'rgba(10, 11, 16, 0.85)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
              <CheckCircle2 size={16} color="var(--accent-secondary)" />
              <span style={{ color: '#ffffff' }}>Technical PM & Architect</span>
            </div>
          </div>
        </div>

      </div>

      {/* Embedding animation keyframes */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes float-card {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}
