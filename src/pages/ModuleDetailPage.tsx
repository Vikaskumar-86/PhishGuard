import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Shield, AlertTriangle, Info, Lightbulb, BookmarkCheck, ExternalLink, HelpCircle } from 'lucide-react';
import { useTraining } from '../context/TrainingContext';
import { LEARNING_MODULES } from '../data/learningModules';

interface ModuleDetailPageProps {
  moduleId: string;
  onNavigate: (path: string) => void;
}

export const ModuleDetailPage: React.FC<ModuleDetailPageProps> = ({ moduleId, onNavigate }) => {
  const { isModuleCompleted, markModuleComplete, unmarkModule } = useTraining();
  const [activeUrlTest, setActiveUrlTest] = useState('https://login.secure.bankofamerica.com.account-update.info/auth');

  // Find module
  const currentModuleIndex = LEARNING_MODULES.findIndex((m) => m.id === moduleId);
  const currentModule = LEARNING_MODULES[currentModuleIndex] || LEARNING_MODULES[0];

  const prevModule = currentModuleIndex > 0 ? LEARNING_MODULES[currentModuleIndex - 1] : null;
  const nextModule = currentModuleIndex < LEARNING_MODULES.length - 1 ? LEARNING_MODULES[currentModuleIndex + 1] : null;

  const isCompleted = isModuleCompleted(currentModule.id);

  const toggleComplete = () => {
    if (isCompleted) {
      unmarkModule(currentModule.id);
    } else {
      markModuleComplete(currentModule.id);
    }
  };

  // Helper for URL inspector interactive tool
  const parseDemoUrl = (urlStr: string) => {
    try {
      const parsed = new URL(urlStr);
      const hostParts = parsed.hostname.split('.');
      const rootDomain = hostParts.length >= 2 ? hostParts.slice(-2).join('.') : parsed.hostname;
      const subdomain = hostParts.length > 2 ? hostParts.slice(0, -2).join('.') : 'None';
      return {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        rootDomain,
        subdomain,
        pathname: parsed.pathname,
        isDeceptive: rootDomain !== 'bankofamerica.com' && parsed.hostname.includes('bankofamerica.com'),
      };
    } catch {
      return null;
    }
  };

  const parsedUrl = parseDemoUrl(activeUrlTest);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('/learn')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Curriculum
          </button>

          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span>Module {currentModule.moduleNumber} of {LEARNING_MODULES.length}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentModule.estimatedMinutes} min
            </span>
          </div>
        </div>

        {/* Module Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              Module 0{currentModule.moduleNumber}
            </span>

            <button
              onClick={toggleComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-color)]'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`} />
              {isCompleted ? 'Marked as Complete' : 'Mark as Complete'}
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {currentModule.title}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {currentModule.subtitle}
          </p>

          <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed">
            <strong className="text-[var(--text-primary)] block mb-1">Executive Summary:</strong>
            {currentModule.overview}
          </div>
        </div>

        {/* Structured Sections */}
        <div className="space-y-6">
          {currentModule.sections.map((section) => (
            <div
              key={section.id}
              className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-5"
            >
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {section.title}
              </h2>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {section.content}
              </p>

              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Key Indicators & Forensic Signals
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {section.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Callouts */}
              {section.callout && (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                    section.callout.type === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                      : section.callout.type === 'tip'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                      : 'bg-[var(--accent-soft)] border-[var(--accent-color)]/30 text-[var(--text-primary)]'
                  }`}
                >
                  {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                  {section.callout.type === 'tip' && <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                  {section.callout.type === 'info' && <Info className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-0.5" />}
                  <div>
                    <strong className="block font-semibold mb-0.5">{section.callout.title}</strong>
                    {section.callout.text}
                  </div>
                </div>
              )}

              {/* Realistic Labeled Example (if provided) */}
              {section.example && (
                <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--border-subtle)]">
                    <span className="font-bold text-[var(--text-primary)]">
                      {section.example.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      Sample Simulated Phish
                    </span>
                  </div>

                  <div className="space-y-1 text-xs font-mono">
                    <p><span className="text-[var(--text-muted)]">From:</span> {section.example.from}</p>
                    <p><span className="text-[var(--text-muted)]">Subject:</span> {section.example.subject}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] whitespace-pre-line font-sans leading-relaxed">
                    {section.example.body}
                  </div>

                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                      Forensic Red Flags Identified:
                    </span>
                    <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                      {section.example.redFlags.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold">✕</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Interactive URL Deconstructor Widget for Module 3 */}
          {currentModule.id === 'module-3' && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--accent-color)]" />
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Interactive URL Anatomy Deconstructor
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Try selecting different URLs below to see how subdomains deceive users into thinking a site belongs to a trusted brand.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'https://login.secure.bankofamerica.com.account-update.info/auth',
                  'https://signin.paypal.com/signin/client',
                  'https://paypal-security-recovery.biz/verify',
                  'https://accounts.google.com/ServiceLogin',
                ].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setActiveUrlTest(sample)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-colors ${
                      activeUrlTest === sample
                        ? 'border-[var(--accent-color)] bg-[var(--accent-soft)] text-[var(--accent-color)] font-semibold'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {sample.split('//')[1].split('/')[0]}
                  </button>
                ))}
              </div>

              {parsedUrl && (
                <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] space-y-3 font-mono text-xs">
                  <div className="p-2.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] break-all">
                    <span className="text-blue-500">{parsedUrl.protocol}//</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{parsedUrl.subdomain}.</span>
                    <span className="text-rose-600 dark:text-rose-400 font-extrabold underline">{parsedUrl.rootDomain}</span>
                    <span className="text-slate-500">{parsedUrl.pathname}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                    <div>
                      <span className="text-[var(--text-muted)] block text-[11px]">Actual Registered Domain Owner:</span>
                      <span className="font-bold font-mono text-[var(--text-primary)]">{parsedUrl.rootDomain}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block text-[11px]">Deceptive Subdomain Trick:</span>
                      <span className="font-bold font-mono text-amber-600 dark:text-amber-400">{parsedUrl.subdomain}</span>
                    </div>
                  </div>

                  {parsedUrl.isDeceptive && (
                    <div className="p-3 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-sans">
                      ⚠️ <strong>Severe Phishing Red Flag:</strong> Even though "bankofamerica.com" appears in the web address, it is only a deceptive subdomain! The actual owner of this website is <strong>{parsedUrl.rootDomain}</strong>.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Key Takeaways Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-[var(--accent-color)]" />
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Core Takeaways for Module {currentModule.moduleNumber}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {currentModule.takeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] space-y-1.5"
              >
                <span className="text-xs font-mono font-bold text-[var(--accent-color)]">
                  Rule #{idx + 1}
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {takeaway}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--text-muted)] italic pt-2">
            Next recommendation: {currentModule.practicePrompt}
          </p>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <div>
            {prevModule ? (
              <button
                onClick={() => onNavigate(`/learn/${prevModule.id}`)}
                className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous: Module 0{prevModule.moduleNumber}
              </button>
            ) : (
              <div />
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleComplete}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'text-white shadow-xs'
              }`}
              style={{ backgroundColor: !isCompleted ? 'var(--accent-color)' : undefined }}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>

            {nextModule ? (
              <button
                onClick={() => onNavigate(`/learn/${nextModule.id}`)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)]"
              >
                Next Module (0{nextModule.moduleNumber})
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('/simulator')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-xs"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Proceed to Simulator
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
