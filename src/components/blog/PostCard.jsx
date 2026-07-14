import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Hash } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/formatDate';

export default function PostCard({ post }) {
  const { t, language } = useApp();

  return (
    <Link
      to={`/blog/${post.id}`}
      className="glass-panel"
      style={{
        padding: '2rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Post Card Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <span className="badge" style={{ backgroundColor: 'var(--badge-bg)', color: 'var(--badge-text)' }}>
          {post.category}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Calendar size={12} />
          {formatDate(post.date, language)}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={12} />
          {post.readTime} {t('blogReadTime')}
        </span>
      </div>

      {/* Title & Summary */}
      <div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)', transition: 'color var(--transition-fast)' }} className="post-title">
          {post.title[language]}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
          {post.summary[language]}
        </p>
      </div>

      {/* Tags inside card */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        {post.tags.map((tag, i) => (
          <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.1rem' }}>
            <Hash size={10} />
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
