import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { projects } from '../data/projects';
import SectionHeader from '../components/ui/SectionHeader';
import FilterPill from '../components/ui/FilterPill';
import ProjectCard from '../components/project/ProjectCard';
import ProjectModal from '../components/project/ProjectModal';

export default function Projects() {
  const { t } = useApp();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((project) => filter === 'all' || project.category === filter);

  return (
    <section className="section container">
      <SectionHeader title={t('projectsTitle')} subtitle={t('projectsSubtitle')}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }} className="no-print">
          <FilterPill active={filter === 'all'} onClick={() => setFilter('all')}>
            {t('projectFilterAll')}
          </FilterPill>
          <FilterPill active={filter === 'product'} onClick={() => setFilter('product')}>
            {t('projectFilterProduct')}
          </FilterPill>
          <FilterPill active={filter === 'tech'} onClick={() => setFilter('tech')}>
            {t('projectFilterTech')}
          </FilterPill>
        </div>
      </SectionHeader>

      {/* Projects Grid */}
      <div className="grid-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onView={() => setSelectedProject(project)} />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
