'use client';

import React, { useState, useMemo } from 'react';
import type { CaseStudy } from '@/lib/types/portfolio';
import { ProjectCard } from './ProjectCard';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { Icons } from '@/components/ui/Icons';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface WorkFilterGridProps {
  projects: CaseStudy[];
}

const CATEGORIES = [
  'All',
  'Business Intelligence',
  'Data Analytics',
  'AI / Automation',
] as const;

type FilterCategory = (typeof CATEGORIES)[number];

export function WorkFilterGrid({ projects }: WorkFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const featuredProject = useMemo(() => {
    // If viewing All and no search, pull the primary featured project
    if (activeCategory === 'All' && !searchQuery.trim()) {
      return projects.find((p) => p.isFeatured) || null;
    }
    return null;
  }, [projects, activeCategory, searchQuery]);

  const standardProjects = useMemo(() => {
    if (featuredProject) {
      return filteredProjects.filter((p) => p.slug !== featuredProject.slug);
    }
    return filteredProjects;
  }, [filteredProjects, featuredProject]);

  return (
    <div className="space-y-8">
      {/* Control Bar: Categories & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-surface-card rounded-xl border border-border-subtle">
        {/* Category Pills */}
        <div
          role="tablist"
          aria-label="Filter case studies by domain"
          className="flex flex-wrap items-center gap-1.5"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Minimal Search Input */}
        <div className="relative w-full sm:w-64">
          <Icons.search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack or domain..."
            aria-label="Search case studies by keyword or technology"
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-surface-sidebar border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary text-xs"
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Featured Project Showcase */}
      {featuredProject && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Featured Solution Architecture
            </span>
          </div>
          <FeaturedProjectCard project={featuredProject} />
        </div>
      )}

      {/* Standard Case Studies Grid */}
      {standardProjects.length > 0 ? (
        <div className="space-y-4">
          {featuredProject && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Enterprise Case Studies ({standardProjects.length})
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      ) : (
        /* Honest Empty State */
        <Card padding="xl" className="text-center py-12">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-10 h-10 rounded-full bg-surface-sidebar border border-border-subtle flex items-center justify-center mx-auto text-text-muted">
              <Icons.search size={20} />
            </div>
            <h3 className="text-base font-semibold text-text-primary">
              No matching case studies found
            </h3>
            <p className="text-xs text-text-secondary">
              No verified project currently matches &ldquo;{searchQuery || activeCategory}&rdquo;. Try resetting the filters to view all documented implementations.
            </p>
            <div className="pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
