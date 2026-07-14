import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { posts } from '../data/posts';
import { Calendar, Clock, ArrowLeft, Copy, Check, CornerDownRight } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, language } = useApp();
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  const post = posts.find((p) => p.id === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(index);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="section container" style={{ maxWidth: '800px', paddingTop: '8rem' }}>

      {/* Back Button */}
      <button
        onClick={() => navigate('/blog')}
        className="btn btn-secondary no-print"
        style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', padding: '0.5rem 1rem' }}
      >
        <ArrowLeft size={16} />
        <span>{t('blogBackBtn')}</span>
      </button>

      {/* Post Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent-primary)', color: '#ffffff', border: 'none' }}>
            {post.category}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Calendar size={14} />
            {formatDate(post.date, language)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={14} />
            {post.readTime} {t('blogReadTime')}
          </span>
        </div>

        <h1 style={{ fontSize: '2.5rem', lineHeight: '1.25', marginBottom: '1.25rem' }}>
          {post.title[language]}
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', fontStyle: 'italic', borderLeft: '4px solid var(--accent-secondary)', paddingLeft: '1rem', lineHeight: '1.6' }}>
          {post.summary[language]}
        </p>
      </div>

      {/* Post Body (Dynamic Blocks) */}
      <article style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        {post.content[language].map((block, idx) => {
          switch (block.type) {
            case 'paragraph':
              return <p key={idx} style={{ marginBottom: '0.5rem' }}>{block.text}</p>;

            case 'heading':
              return <h2 key={idx} style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.5rem' }}>{block.text}</h2>;

            case 'list':
              return (
                <ul key={idx} style={{ paddingLeft: '1.5rem', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.5rem 0' }}>
                  {block.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CornerDownRight size={16} style={{ color: 'var(--accent-primary)', marginTop: '0.3rem', flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );

            case 'code':
              return (
                <div key={idx} className="glass-panel" style={{
                  position: 'relative',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(10, 11, 16, 0.95)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  margin: '1rem 0'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span>{block.language.toUpperCase()}</span>
                    <button
                      onClick={() => handleCopyCode(block.code, idx)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      {copiedCodeId === idx ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                      <span>{copiedCodeId === idx ? t('blogCopied') : t('blogCopy')}</span>
                    </button>
                  </div>
                  <pre style={{
                    padding: '1.25rem',
                    margin: 0,
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    color: '#e2e8f0',
                    lineHeight: '1.5'
                  }}>
                    <code>{block.code}</code>
                  </pre>
                </div>
              );

            case 'quote':
              return (
                <blockquote key={idx} style={{
                  padding: '1.5rem 2rem',
                  borderLeft: '4px solid var(--accent-primary)',
                  background: 'var(--gradient-glow)',
                  borderRadius: '0 12px 12px 0',
                  margin: '1.5rem 0',
                  fontStyle: 'italic'
                }}>
                  <p style={{ color: 'var(--text-primary)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>"{block.text}"</p>
                  {block.author && <cite style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', fontWeight: 600 }}>— {block.author}</cite>}
                </blockquote>
              );

            default:
              return null;
          }
        })}
      </article>
    </div>
  );
}
