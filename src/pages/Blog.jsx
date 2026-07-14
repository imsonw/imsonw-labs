import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { posts } from '../data/posts';
import { Search, Hash } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Input from '../components/ui/Input';
import FilterPill from '../components/ui/FilterPill';
import PostCard from '../components/blog/PostCard';

export default function Blog() {
  const { t, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.title[language].toLowerCase().includes(searchTerm.toLowerCase());
    const summaryMatch = post.summary[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || summaryMatch;
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <section className="section container" style={{ paddingTop: '8rem' }}>
      <SectionHeader title={t('blogTitle')} subtitle={t('blogSubtitle')}>
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

          <Input
            icon={<Search size={18} />}
            type="text"
            placeholder={t('blogSearchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-panel"
            style={{ borderRadius: '12px' }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
            {allTags.map((tag) => (
              <FilterPill
                key={tag}
                variant="tag"
                active={selectedTag === tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                <Hash size={12} />
                <span>{tag}</span>
              </FilterPill>
            ))}
          </div>
        </div>
      </SectionHeader>

      {/* Posts List Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            {t('blogNoResults')}
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
