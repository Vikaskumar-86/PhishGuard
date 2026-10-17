import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ShieldCheck, ArrowRight, RotateCcw, Download, Printer, BookOpen, AlertTriangle, ExternalLink, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTraining } from '../context/TrainingContext';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

interface ResultsPageProps {
  onNavigate: (path: string) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { quizResult, stats, completedModules, resetQuiz } = useTraining();
  const [showCertificate, setShowCertificate] = useState(false);

  // If no quiz has been taken yet, show informative onboarding state
  const hasQuiz = !!quizResult;
  const scorePercent = hasQuiz ? quizResult.percentage : 0;
  const correctCount = hasQuiz ? quizResult.score : 0;
  const incorrectCount = hasQuiz ? quizResult.total - quizResult.score : 0;
  const isPassed = scorePercent >= 75;

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Summary Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              <span>Security Certification & Progress</span>
              <span aria-hidden="true">·</span>
              <span>Demo Training Profile</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Cybersecurity Readiness & Assessment Results
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Consolidated evaluation of your threat detection capability across educational modules, inbox simulations, and examination questions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isPassed && (
              <button
                onClick={() => setShowCertificate(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white rounded-xl shadow-xs transition-transform hover:scale-102"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <Award className="w-4 h-4" />
                View Official Certificate
              </button>
            )}
            <button
              onClick={() => onNavigate('/quiz')}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {hasQuiz ? 'Retake Quiz' : 'Take Knowledge Quiz'}
            </button>
          </div>
        </div>

        {/* 4 Scorecard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Quiz Score */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Assessment Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
                {hasQuiz ? `${scorePercent}%` : '--'}
              </span>
              {hasQuiz && (
                <span className={`text-xs font-bold ${isPassed ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {isPassed ? 'PASSED' : 'NEEDS REVIEW'}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              {hasQuiz ? `${correctCount} correct · ${incorrectCount} incorrect` : 'Take the quiz to generate score'}
            </p>
          </div>

          {/* Card 2: Phishing Simulator Accuracy */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Simulator Detection
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
                {stats.simulatorAccuracyPercent}%
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-medium">
                Accuracy
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              {stats.simulatorCorrectCount} of {stats.simulatorTestedCount} scenarios classified correctly
            </p>
          </div>

          {/* Card 3: Modules Completed */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Curriculum Mastery
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
                {stats.modulesCompletedCount} / {stats.modulesTotal}
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {stats.modulePercent}%
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              {stats.modulesCompletedCount === stats.modulesTotal ? 'All core modules finished' : 'Incomplete modules pending'}
            </p>
          </div>

          {/* Card 4: Security Readiness Composite */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Readiness Composite
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-[var(--accent-color)]">
                {stats.overallReadinessScore}%
              </span>
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                {stats.rankTitle}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Consolidated security capability index
            </p>
          </div>
        </div>

        {/* Breakdown Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Category Proficiency & Weak Areas (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Performance */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-5">
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Category Proficiency Analysis
              </h2>

              {hasQuiz && quizResult ? (
                <div className="space-y-4">
                  {Object.entries(quizResult.categoryScores).map(([cat, score]) => {
                    const pct = Math.round((score.correct / score.total) * 100);
                    return (
                      <div key={cat} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[var(--text-primary)]">{cat}</span>
                          <span className="font-mono text-[var(--text-muted)]">
                            {score.correct}/{score.total} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-[var(--border-subtle)] h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-[var(--text-secondary)] bg-[var(--bg-surface-subtle)] rounded-xl">
                  Complete the 16-question assessment to unlock detailed topic proficiency charts.
                </div>
              )}
            </div>

            {/* Targeted Areas for Improvement */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Targeted Areas for Improvement
                </h3>
              </div>

              {hasQuiz && quizResult && quizResult.weakAreas.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs text-[var(--text-secondary)]">
                    Based on your incorrect answers, we recommend reviewing these specific modules:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {quizResult.weakAreas.map((area, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 text-xs space-y-1.5"
                      >
                        <span className="font-bold text-amber-800 dark:text-amber-300 block">
                          {area}
                        </span>
                        <p className="text-[11px] text-[var(--text-secondary)]">
                          Focus on identifying deceptive indicators and out-of-band verification.
                        </p>
                        <button
                          onClick={() => onNavigate('/learn')}
                          className="text-[11px] font-semibold text-[var(--accent-color)] hover:underline inline-flex items-center gap-1"
                        >
                          Review relevant module <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-200">
                  {hasQuiz
                    ? 'Outstanding! You achieved 100% accuracy with zero weak areas detected.'
                    : 'Take the assessment to discover tailored defensive recommendations.'}
                </div>
              )}
            </div>
          </div>

          {/* Right: Suggested Next Steps & Certification Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Certificate Preview Card */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-4 text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[var(--accent-color)] shadow-md">
                <img
                  src="/src/assets/images/phishguard_certified_badge_1792000917896.jpg"
                  alt="PhishGuard Official Badge"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  PhishGuard Defense Credential
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Issued to: <strong className="text-[var(--text-primary)]">{user?.name || 'Authorized Trainee'}</strong>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-surface-subtle)] text-xs text-[var(--text-secondary)]">
                {isPassed ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Eligible for Certificate of Completion
                  </span>
                ) : (
                  <span className="text-[var(--text-muted)]">
                    Score 75% or higher on the assessment to unlock your official credential.
                  </span>
                )}
              </div>

              <button
                onClick={() => setShowCertificate(true)}
                disabled={!isPassed}
                className="w-full py-2.5 text-xs font-semibold text-white rounded-xl shadow-xs disabled:opacity-40 transition-transform hover:scale-101"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Inspect Official Credential
              </button>
            </div>

            {/* Next Steps Checklist */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Suggested Defensive Next Steps
              </h3>
              <ul className="space-y-3 text-xs text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Enable FIDO2 or Authenticator-based MFA across your primary email and banking portals.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Adopt a password manager to guarantee protection against typosquatted login portals.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Practice the 5-step email inspection habit on every unexpected invoice or security alert.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white text-slate-900 border-4 border-amber-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 my-auto text-center font-sans">
            {/* Top Seal */}
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden shadow-lg border border-amber-500/50">
              <img
                src="/src/assets/images/phishguard_certified_badge_1792000917896.jpg"
                alt="PhishGuard Crest"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">
                Certificate of Proficiency & Awareness
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                PhishGuard Certified Defender
              </h2>
            </div>

            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              This document certifies that
            </p>

            <div className="py-2 border-b-2 border-slate-300 max-w-md mx-auto">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
                {user?.name || 'Alex Vance'}
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              has successfully mastered all modules of the PhishGuard Phishing Awareness Training Platform, demonstrating rigorous proficiency in email header inspection, domain typosquatting detection, social engineering defense, and incident response.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Final Score</span>
                <strong className="text-slate-900 font-mono text-sm">{scorePercent}%</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Issue Date</span>
                <strong className="text-slate-900 font-mono text-sm">{new Date().toISOString().split('T')[0]}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Verification ID</span>
                <strong className="text-slate-900 font-mono text-sm">PG-2026-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Certificate
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
