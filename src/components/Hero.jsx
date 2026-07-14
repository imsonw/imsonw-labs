import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ExternalLink, BookOpen, FolderKanban, Mail } from 'lucide-react';

const PORTFOLIO_URL = 'https://portfolio-ngocsondn.vercel.app/';

export default function Hero({ setActiveTab }) {
  const { language } = useApp();

  const quickLinks = [
    {
      id: 'projects',
      icon: <FolderKanban size={20} />,
      label: language === 'vi' ? 'Dự Án' : 'Projects',
      desc: language === 'vi' ? 'Case study thực tế' : 'Real-world case studies',
    },
    {
      id: 'blog',
      icon: <BookOpen size={20} />,
      label: language === 'vi' ? 'Bài Viết' : 'Blog',
      desc: language === 'vi' ? 'Ghi chép kỹ thuật' : 'Technical writings',
    },
    {
      id: 'contact',
      icon: <Mail size={20} />,
      label: language === 'vi' ? 'Liên Hệ' : 'Contact',
      desc: language === 'vi' ? 'Kết nối với tôi' : 'Get in touch',
    },
  ];

  return (
    <section
      className="section container"
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8rem',
        textAlign: 'center',
        gap: '2.5rem',
      }}
    >
      {/* Brand heading */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <span
          className="badge"
          style={{ fontSize: '0.85rem', gap: '0.5rem', padding: '0.4rem 1.1rem' }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-secondary)',
              animation: 'pulse 2s infinite',
            }}
          />
          {language === 'vi' ? 'Sẵn sàng hợp tác' : 'Open to opportunities'}
        </span>

        <h1
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            lineHeight: '1.08',
            margin: 0,
            letterSpacing: '-0.03em',
          }}
        >
          <span className="gradient-text">imsonw</span>
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              letterSpacing: '0.01em',
              marginTop: '0.5rem',
            }}
          >
            -labs
          </span>
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            lineHeight: '1.7',
            margin: 0,
          }}
        >
          {language === 'vi'
            ? 'Nơi lưu trữ dự án, bài viết kỹ thuật và nghiên cứu của tôi.'
            : 'A space for my projects, technical writings, and experiments.'}
        </p>
      </div>

      {/* Primary CTA — Portfolio link */}
      <a
        href={PORTFOLIO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        style={{ fontSize: '1rem', padding: '0.85rem 2rem', textDecoration: 'none' }}
      >
        <span>{language === 'vi' ? 'Xem Portfolio cá nhân' : 'Visit my Portfolio'}</span>
        <ExternalLink size={18} />
      </a>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          width: '100%',
          maxWidth: '480px',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
        {language === 'vi' ? 'hoặc khám phá tại đây' : 'or explore here'}
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
      </div>

      {/* Quick nav cards */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '640px',
        }}
      >
        {quickLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className="glass-panel"
            style={{
              flex: '1 1 160px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '1.25rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              cursor: 'pointer',
              background: 'none',
              color: 'var(--text-primary)',
              transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ color: 'var(--accent-primary)' }}>{link.icon}</span>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{link.label}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{link.desc}</span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
