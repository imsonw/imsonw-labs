import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { posts } from '../data/posts';
import { Calendar, Clock, ArrowLeft, Search, Copy, Check, Hash, CornerDownRight } from 'lucide-react';

export default function Blog() {
  const { t, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  );

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const titleMatch = post.title[language].toLowerCase().includes(searchTerm.toLowerCase());
    const summaryMatch = post.summary[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || summaryMatch;
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(index);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', options);
  };

  // Rendering Full Post Detail
  if (activePost) {
    return (
      <div className="section container" style={{ maxWidth: '800px', paddingTop: '8rem' }}>
        
        {/* Back Button */}
        <button
          onClick={() => setActivePost(null)}
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
              {activePost.category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={14} />
              {formatDate(activePost.date)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={14} />
              {activePost.readTime} {t('blogReadTime')}
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', lineHeight: '1.25', marginBottom: '1.25rem' }}>
            {activePost.title[language]}
          </h1>
          
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', fontStyle: 'italic', borderLeft: '4px solid var(--accent-secondary)', paddingLeft: '1rem', lineHeight: '1.6' }}>
            {activePost.summary[language]}
          </p>
        </div>

        {/* Post Body (Dynamic Blocks) */}
        <article style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          {activePost.content[language].map((block, idx) => {
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
                    {/* Code Header Bar */}
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
                        <span>{copiedCodeId === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    {/* Code Area */}
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

  // Rendering Blog Posts List View
  return (
    <section className="section container" style={{ paddingTop: '8rem' }}>
      
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{t('blogTitle')}</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
          {t('blogSubtitle')}
        </p>

        {/* Search & Tags */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          marginTop: '2.5rem',
          maxWidth: '500px',
          margin: '2.5rem auto 0 auto'
        }} className="no-print">
          
          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder={t('blogSearchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-panel"
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)'
              }}
            />
          </div>

          {/* Tag Badges list */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-color)',
                  background: selectedTag === tag ? 'var(--badge-text)' : 'transparent',
                  color: selectedTag === tag ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Hash size={12} />
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts List Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="glass-panel"
              onClick={() => setActivePost(post)}
              style={{
                padding: '2rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Post Card Header */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <span className="badge" style={{ backgroundColor: 'var(--badge-bg)', color: 'var(--badge-text)' }}>
                  {post.category}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={12} />
                  {formatDate(post.date)}
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
            </article>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No articles found matching your criteria.
          </div>
        )}
      </div>

      <style>{`
        .post-title:hover {
          color: var(--accent-primary) !important;
        }
      `}</style>
    </section>
  );
}
