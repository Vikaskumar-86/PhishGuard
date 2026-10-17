
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface QuizAttempt {
  id: string;
  quiz_name: string;
  score: number;
  total_questions: number;
  percentage: number;
  created_at: string;
}

interface TestHistoryPageProps {
  onNavigate: (path: string) => void;
}

export const TestHistoryPage: React.FC<TestHistoryPageProps> = ({
  onNavigate,
}) => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadHistory = async () => {
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError || !userData.user) {
          throw new Error('Please sign in to view your test history.');
        }

        const { data, error: historyError } = await supabase
          .from('quiz_attempts')
          .select(
            'id, quiz_name, score, total_questions, percentage, created_at'
          )
          .eq('user_id', userData.user.id)
          .order('created_at', { ascending: false });

        if (historyError) throw historyError;

        if (active) setAttempts((data ?? []) as QuizAttempt[]);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Could not load test history.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadHistory();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Test History</h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Review your previous Phishing Awareness Quiz attempts.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/quiz')}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            Take Quiz
          </button>
        </div>

        {loading ? (
          <p className="text-sm">Loading your test history...</p>
        ) : error ? (
          <div className="rounded-xl border border-red-500/30 p-5 text-sm text-red-500">
            {error}
          </div>
        ) : attempts.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-8 text-center">
            <h2 className="font-semibold">No tests completed yet</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Your attempts will appear here after you submit a quiz.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="border-b border-[var(--border-color)]">
                <tr>
                  <th className="p-4">Test</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Percentage</th>
                  <th className="p-4">Date & Time</th>
                </tr>
              </thead>

              <tbody>
                {attempts.map((attempt) => (
                  <tr
                    key={attempt.id}
                    className="border-b border-[var(--border-color)] last:border-b-0"
                  >
                    <td className="p-4 font-medium">
                      {attempt.quiz_name}
                    </td>
                    <td className="p-4">
                      {attempt.score}/{attempt.total_questions}
                    </td>
                    <td className="p-4 font-semibold">
                      {attempt.percentage}%
                    </td>
                    <td className="p-4 text-[var(--text-secondary)]">
                      {new Date(attempt.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={() => onNavigate('/dashboard')}
          className="text-sm font-semibold text-[var(--accent-color)] hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
