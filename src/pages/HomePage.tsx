
import React, { useState } from 'react';
import {
  Shield,
  ArrowRight,
  BookOpen,
  MailCheck,
  Award,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Lock,
  Eye,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTraining } from '../context/TrainingContext';
import { LEARNING_MODULES } from '../data/learningModules';
import Contact from '../assets/components/Contact';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuth();
  const { completedModules, stats } = useTraining();
  const [activeTipIndex, setActiveTipIndex] = useState(0);

  const securityTips = [
    {
      title: 'Inspect the Real Sender Domain',
      summary:
        'Never rely on the friendly display name alone. Always inspect the exact domain name immediately after the "@" symbol.',
      icon: Eye,
      detail:
        'Attackers can label their sender name "Apple Inc.", but the actual address might be "security-team@xvn-support-mail.net". If the domain is not official, treat it as hostile.',
    },
    {
      title: 'The Padlock Fallacy',
      summary:
        'A green padlock or HTTPS only proves the connection is encrypted—not that the site is safe or authentic.',
      icon: Lock,
      detail:
        'Cybercriminals can obtain SSL certificates for phishing domains. Always verify the spelling of the root domain, not just the padlock symbol.',
    },
    {
      title: 'Out-of-Band Verification',
      summary:
        'Whenever an email requests money transfers, password resets, or gift cards, verify through a separate phone call.',
      icon: AlertTriangle,
      detail:
        'Call your manager or financial contact using a known, verified directory number—never use the phone number provided inside the suspicious email.',
    },
    {
      title: 'Never Share One-Time Passcodes (OTPs)',
      summary:
        'Banks and IT teams will never ask for your 6-digit MFA authentication code over the phone or via email.',
      icon: Shield,
      detail:
        'If an unexpected email or caller asks for your MFA code, someone may be trying to access your account.',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)] py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                />
                <span>Cybersecurity Defense Education</span>
                <span aria-hidden="true">·</span>
                <span>Interactive Simulator</span>
              </div>

              <h1
                className="text-3xl font-extrabold leading-[1.15] tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
                style={{ textWrap: 'balance' }}
              >
                Recognize Phishing. Protect Your Digital World.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                Master the techniques required to spot fake emails, fraudulent
                domains, and deceptive social engineering attacks before they
                compromise your credentials or organization.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/learn')}
                  className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  <BookOpen className="h-4 w-4" />
                  Start Training
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>

                <button
                  onClick={() => onNavigate('/quiz')}
                  className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-transform hover:scale-[1.02] hover:bg-[var(--bg-surface-subtle)] active:scale-95"
                >
                  <Award className="h-4 w-4 text-[var(--accent-color)]" />
                  Test Your Knowledge
                </button>

                <button
                  onClick={() => onNavigate('/simulator')}
                  className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <MailCheck className="h-4 w-4" />
                  Email Simulator
                </button>
              </div>

              {isAuthenticated && user && (
                <div className="flex max-w-xl items-center justify-between gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-primary)]">
                        Welcome back, {user.name}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        Current Rank:{' '}
                        <span className="font-medium text-[var(--text-secondary)]">
                          {stats.rankTitle}
                        </span>{' '}
                        · Readiness: {stats.overallReadinessScore}%
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('/dashboard')}
                    className="text-xs font-semibold underline hover:opacity-80"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    View Hub
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl">
                <img
                  src="/src/assets/images/hero_cyber_security_1792000917068.jpg"
                  alt="PhishGuard cybersecurity shield"
                  referrerPolicy="no-referrer"
                  className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[380px]"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                    const parent = event.currentTarget.parentElement;

                    if (parent && !parent.querySelector('.hero-fallback')) {
                      const fallback = document.createElement('div');
                      fallback.className =
                        'hero-fallback flex h-[320px] w-full flex-col items-center justify-center bg-slate-900 p-8 text-center text-white sm:h-[380px]';
                      fallback.innerHTML =
                        '<div class="mb-3 text-5xl">🛡️</div><p class="text-base font-bold">PhishGuard Security Core</p><p class="mt-1 text-xs text-slate-400">Interactive Threat Analysis Active</p>';
                      parent.appendChild(fallback);
                    }
                  }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-blue-300">
                        Threat Defense Matrix
                      </p>
                      <p className="text-sm font-semibold">
                        Real-Time Phishing Recognition Simulation
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('/simulator')}
                      className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-white/30"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Statistics */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-surface)] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Global Threat Intelligence · Industry Benchmarks (Demo Analytics)
            </h2>
            <span className="text-[11px] text-[var(--text-muted)]">
              Source: 2026 Cybersecurity Threat Landscape
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { value: '3.4B+', label: 'Phishing emails sent worldwide each day' },
              { value: '82%', label: 'Data breaches involving human manipulation' },
              { value: '89%', label: 'Reduction in click rates after PhishGuard training' },
              { value: '16', label: 'Interactive simulator & quiz mastery modules' },
            ].map((item) => (
              <div
                key={item.value}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] p-4"
              >
                <p className="font-mono text-2xl font-extrabold tabular-nums text-[var(--text-primary)] sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Structured Learning Modules
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Curated cybersecurity curriculum covering modern threat techniques
              and prevention habits.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/learn')}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-[var(--accent-color)] hover:underline"
          >
            Explore all 5 modules
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LEARNING_MODULES.slice(0, 3).map((mod) => {
            const isDone = completedModules.includes(mod.id);

            return (
              <div
                key={mod.id}
                onClick={() => onNavigate(`/learn/${mod.id}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onNavigate(`/learn/${mod.id}`);
                  }
                }}
                role="button"
                tabIndex={0}
                className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm transition-all hover:border-[var(--accent-color)] hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--text-primary)]">
                      Module {mod.moduleNumber}
                    </span>
                    <span>{mod.estimatedMinutes} min read</span>
                  </div>

                  <h3 className="mb-2 text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-color)]">
                    {mod.title}
                  </h3>

                  <p className="line-clamp-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {mod.overview}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-6">
                  <div className="flex items-center gap-1.5 text-xs">
                    {isDone ? (
                      <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-[var(--text-muted)]">Not started</span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-color)] transition-transform group-hover:translate-x-1">
                    Study Module
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Security Tips and Threat Visualizer */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-surface)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Quick Security Habits
                </h2>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  Click through critical defense instincts every digital user
                  should remember.
                </p>
              </div>

              <div className="space-y-3">
                {securityTips.map((tip, index) => {
                  const Icon = tip.icon;
                  const isActive = activeTipIndex === index;

                  return (
                    <div
                      key={tip.title}
                      onClick={() => setActiveTipIndex(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setActiveTipIndex(index);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        isActive
                          ? 'border-[var(--accent-color)] bg-[var(--bg-surface-subtle)] shadow-sm'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                              isActive
                                ? 'text-white'
                                : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)]'
                            }`}
                            style={{
                              backgroundColor: isActive
                                ? 'var(--accent-color)'
                                : undefined,
                            }}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>

                          <span className="text-xs font-semibold text-[var(--text-primary)]">
                            {tip.title}
                          </span>
                        </div>

                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          0{index + 1}
                        </span>
                      </div>

                      {isActive && (
                        <div className="mt-3 animate-in border-t border-[var(--border-subtle)] pt-3 text-xs leading-relaxed text-[var(--text-secondary)] fade-in">
                          <p className="mb-1 font-medium text-[var(--text-primary)]">
                            {tip.summary}
                          </p>
                          <p>{tip.detail}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="space-y-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                      Visual Threat Inspection Workspace
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      How email security gateways evaluate indicators
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('/simulator')}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                  >
                    Open Simulator
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-black/5">
                  <img
                    src="/src/assets/images/phishing_inspection_workspace_1792000917868.jpg"
                    alt="Email security headers and analysis"
                    referrerPolicy="no-referrer"
                    className="h-64 w-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
                    <span className="mb-0.5 block font-semibold text-emerald-600 dark:text-emerald-400">
                      DKIM & SPF Passes
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      Helps verify authorized mail servers and message integrity.
                    </span>
                  </div>

                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
                    <span className="mb-0.5 block font-semibold text-rose-600 dark:text-rose-400">
                      Domain Mismatch Alert
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      The displayed address differs from the verified return path.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator and Quiz CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            <Shield className="h-6 w-6" />
          </div>

          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
            Ready to Put Your Cyber Radar to the Test?
          </h2>

          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Take our 16-question cybersecurity assessment and practice
            identifying phishing emails in our hands-on mailbox simulator.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/simulator')}
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              Launch Email Simulator
            </button>

            <button
              onClick={() => onNavigate('/quiz')}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-transform hover:scale-[1.02] hover:bg-[var(--bg-surface-subtle)]"
            >
              Take 16-Question Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form - Always at the bottom of the Home Page */}
      <Contact />
    </div>
  );
};
