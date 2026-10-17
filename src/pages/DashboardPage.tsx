
import React, { useCallback, useEffect, useState } from 'react';
import {
  Shield,
  BookOpen,
  MailCheck,
  Award,
  CheckCircle2,
  ChevronRight,
  History,
  RefreshCw,
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useTraining } from '../context/TrainingContext';
import { LEARNING_MODULES } from '../data/learningModules';


interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

interface QuizAttempt {
  id: string;
  quiz_name: string;
  score: number;
  total_questions: number;
  created_at: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
}) => {
  const { user } = useAuth();
  const { stats, completedModules, quizResult } = useTraining();

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const loadQuizHistory = useCallback(async () => {
    setHistoryLoading(true);
    setHistoryError('');

    try {
      const { data: userData, error: authError } =
        await supabase.auth.getUser();

      if (authError) throw authError;

      if (!userData.user) {
        setQuizHistory([]);
        setHistoryError('Please sign in to view your test history.');
        return;
      }

      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('id, quiz_name, score, total_questions, created_at')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setQuizHistory((data ?? []) as QuizAttempt[]);
    } catch (error) {
      console.error('Unable to load quiz history:', error);
      setHistoryError(
        error instanceof Error
          ? error.message
          : 'Unable to load test history. Please try again.'
      );
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadQuizHistory();
  }, [loadQuizHistory, refreshKey]);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">
                  {user?.name || 'Cyber Cadet'}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent-color)] font-semibold">
                  {stats.rankTitle}
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] mt-1">
                {user?.email || 'demo-user@organization.org'} · Member since{' '}
                {user?.joinDate || '2026'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/settings')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-[var(--border-color)]"
            >
              Custom Theme
            </button>

            <button
              onClick={() => onNavigate('/learn')}
              className="px-4 py-2 text-xs font-semibold text-white rounded-lg"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              Resume Training
            </button>
          </div>
        </div>

        {/* Metric Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Security Readiness"
            value={`${stats.overallReadinessScore}%`}
            description="Your overall cybersecurity readiness."
            icon={<Shield className="w-5 h-5" />}
            progress={stats.overallReadinessScore}
          />

          <MetricCard
            title="Training Progress"
            value={`${stats.modulesCompletedCount} / ${stats.modulesTotal}`}
            description="Learning modules completed."
            icon={<BookOpen className="w-5 h-5" />}
            progress={stats.modulePercent}
          />

          <MetricCard
            title="Simulator Accuracy"
            value={`${stats.simulatorAccuracyPercent}%`}
            description={`${stats.simulatorCorrectCount}/${stats.simulatorTestedCount} scenarios correct.`}
            icon={<MailCheck className="w-5 h-5" />}
            progress={stats.simulatorAccuracyPercent}
          />
        </div>

        {/* Learning Modules */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Core Training Curriculum</h2>
            <button
              onClick={() => onNavigate('/learn')}
              className="text-sm font-semibold text-[var(--accent-color)] flex items-center"
            >
              Browse all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARNING_MODULES.map((mod) => {
              const isCompleted = completedModules.includes(mod.id);

              return (
                <button
                  type="button"
                  key={mod.id}
                  onClick={() => onNavigate(`/learn/${mod.id}`)}
                  className="text-left p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors"
                >
                  <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-2">
                    <span>Module 0{mod.moduleNumber}</span>
                    <span>{mod.estimatedMinutes} min</span>
                  </div>

                  <h3 className="font-bold mb-1">{mod.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {mod.subtitle}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex justify-between text-sm">
                    <span className={isCompleted ? 'text-emerald-500' : ''}>
                      {isCompleted ? (
                        <><CheckCircle2 className="inline w-4 h-4" /> Done</>
                      ) : 'Pending'}
                    </span>
                    <span className="text-[var(--accent-color)]">Open →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Simulator and Quiz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
            <div className="flex items-center gap-2">
              <MailCheck className="w-5 h-5 text-[var(--accent-color)]" />
              <h3 className="font-bold">Phishing Email Simulator</h3>
            </div>

            <p className="text-sm text-[var(--text-secondary)]">
              Practice identifying suspicious emails, deceptive links and phishing attempts.
            </p>

            <button
              onClick={() => onNavigate('/simulator')}
              className="w-full py-3 rounded-xl text-white font-semibold"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              Start Simulator Practice
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold">Cybersecurity Assessment</h3>
            </div>

            <p className="text-sm text-[var(--text-secondary)]">
              {quizResult
                ? `Latest score: ${quizResult.percentage}% (${quizResult.score}/${quizResult.total}).`
                : 'Test your knowledge of phishing, social engineering and online security.'}
            </p>

            <button
              onClick={() => onNavigate('/quiz')}
              className="w-full py-3 rounded-xl border border-[var(--border-color)] font-semibold"
            >
              {quizResult ? 'Retake Security Quiz' : 'Take Knowledge Quiz'}
            </button>
          </div>
        </div>

        {/* Test History */}
        <section className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-[var(--accent-color)]" />
              <div>
                <h2 className="text-lg font-bold">Test History</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Your previous quiz attempts and scores.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setRefreshKey((previous) => previous + 1)}
              disabled={historyLoading}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-color)] disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${historyLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {historyLoading ? (
            <p className="py-4 text-sm text-[var(--text-secondary)]">
              Loading test history...
            </p>
          ) : historyError ? (
            <div className="space-y-3">
              <p className="text-sm text-rose-500">{historyError}</p>
              <button
                onClick={() => setRefreshKey((previous) => previous + 1)}
                className="text-sm text-[var(--accent-color)] font-semibold"
              >
                Try again
              </button>
            </div>
          ) : quizHistory.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <Award className="w-10 h-10 mx-auto text-[var(--text-secondary)]" />
              <h3 className="font-semibold">No test attempts yet</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Complete a quiz to see your score here.
              </p>
              <button
                onClick={() => onNavigate('/quiz')}
                className="px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Take a Quiz
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] text-[var(--text-secondary)]">
                    <th className="py-3 pr-4">Test Name</th>
                    <th className="py-3 pr-4">Score</th>
                    <th className="py-3 pr-4">Percentage</th>
                    <th className="py-3">Date &amp; Time</th>
                  </tr>
                </thead>
                <tbody>
                  {quizHistory.map((attempt) => {
                    const percentage = attempt.total_questions > 0
                      ? Math.round((attempt.score / attempt.total_questions) * 100)
                      : 0;

                    return (
                      <tr key={attempt.id} className="border-b border-[var(--border-color)]">
                        <td className="py-4 pr-4">{attempt.quiz_name}</td>
                        <td className="py-4 pr-4">
                          {attempt.score}/{attempt.total_questions}
                        </td>
                        <td className="py-4 pr-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            percentage >= 75
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : 'bg-amber-500/10 text-amber-600'
                          }`}>
                            {percentage}%
                          </span>
                        </td>
                        <td className="py-4 text-xs whitespace-nowrap text-[var(--text-secondary)]">
                          {new Date(attempt.created_at).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        

      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
}

function MetricCard({
  title,
  value,
  description,
  icon,
  progress,
}: MetricCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          {title}
        </span>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
          style={{ backgroundColor: 'var(--accent-color)' }}
        >
          {icon}
        </div>
      </div>

      <p className="text-3xl font-extrabold">{value}</p>

      <div className="w-full h-2 rounded-full overflow-hidden bg-[var(--border-color)]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.max(0, Math.min(100, progress))}%`,
            backgroundColor: 'var(--accent-color)',
          }}
        />
      </div>

      <p className="text-xs text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}
