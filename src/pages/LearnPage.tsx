import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Clock, ShieldCheck, Search, Filter } from 'lucide-react';
import { useTraining } from '../context/TrainingContext';
import { LEARNING_MODULES } from '../data/learningModules';

interface LearnPageProps {
  onNavigate: (path: string) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
  const { completedModules, stats } = useTraining();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = LEARNING_MODULES.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.subtitle.toLowerCase().includes(q) ||
      m.overview.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              <span>Cybersecurity Curriculum</span>
              <span aria-hidden="true">·</span>
              <span>5 Comprehensive Modules</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Phishing Awareness & Defense Modules
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Step through our structured curriculum to build instinctive recognition of email spoofing, fake domains, reverse proxies, and social engineering manipulation.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] shrink-0 min-w-[220px] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--text-primary)]">Training Completed</span>
              <span className="font-mono tabular-nums text-[var(--accent-color)] font-bold">
                {stats.modulesCompletedCount} / {stats.modulesTotal}
              </span>
            </div>
            <div className="w-full bg-[var(--border-color)] h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${stats.modulePercent}%`,
                  backgroundColor: 'var(--accent-color)',
                }}
              />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] text-right">
              {stats.modulePercent}% Finished
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search concepts, domains, or protocols..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] self-end sm:self-auto">
            <span>Showing {filteredModules.length} of {LEARNING_MODULES.length} modules</span>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {filteredModules.map((mod) => {
            const isCompleted = completedModules.includes(mod.id);
            return (
              <div
                key={mod.id}
                onClick={() => onNavigate(`/learn/${mod.id}`)}
                className="group p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-color)] cursor-pointer transition-all shadow-xs hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3 text-xs">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    >
                      Module 0{mod.moduleNumber}
                    </span>
                    <span className="text-[var(--text-muted)] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {mod.estimatedMinutes} min read
                    </span>
                    <span className="text-[var(--text-muted)]">
                      {mod.sections.length} core sections
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors">
                    {mod.title}
                  </h2>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {mod.subtitle}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {mod.takeaways.slice(0, 2).map((takeaway, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-[var(--text-muted)]"
                      >
                        · {takeaway}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--border-subtle)]">
                  {isCompleted ? (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Completed
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--text-muted)]">
                      Not Completed
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/learn/${mod.id}`);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-xs transition-transform group-hover:translate-x-0.5"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                  >
                    Open Module
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
