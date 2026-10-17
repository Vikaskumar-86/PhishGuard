import React, { useState } from 'react';
import { X, KeyRound, Mail, CheckCircle2 } from 'lucide-react';
import { ButtonSpinner } from './CyberShieldLoader';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, defaultEmail = '' }) => {
  const [email, setEmail] = useState(defaultEmail);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please provide a valid registered email address.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('sent');
    }, 700);
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-color)] flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Reset Demo Password
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                PhishGuard Security Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {status === 'sent' ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              Password Reset Link Sent
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              We dispatched simulated recovery instructions to <strong className="text-[var(--text-primary)]">{email}</strong>. In this demo, you can log in directly using your email and any 8-character password.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 w-full py-2.5 text-xs font-semibold text-white rounded-lg"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <p className="text-xs text-[var(--text-secondary)]">
              Enter your registered email address. We will verify your identity and send a secure reset link.
            </p>

            <div>
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-[var(--text-muted)] pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
                  disabled={status === 'submitting'}
                />
              </div>
              {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white rounded-lg shadow-xs disabled:opacity-50"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                {status === 'submitting' && <ButtonSpinner size="sm" />}
                Send Reset Link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
