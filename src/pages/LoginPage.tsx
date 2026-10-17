import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ButtonSpinner } from '../components/common/CyberShieldLoader';
import { ForgotPasswordModal } from '../components/common/ForgotPasswordModal';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, isLoading, user } = useAuth();

  const [email, setEmail] = useState(user?.email || 'alex.vance@defense-guard.org');
  const [password, setPassword] = useState('SecurePass2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both your email address and password.');
      return;
    }

    const res = await login(email, password, rememberMe);
    if (res.success) {
      onNavigate('/dashboard');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 sm:py-12 bg-[var(--bg-page)]">
      <div className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-xl p-6 sm:p-8 transition-all">
        {/* Brand header badge */}
        <div className="text-center mb-6">
          <div
            className="w-12 h-12 rounded-xl text-white mx-auto flex items-center justify-center mb-3 shadow-md"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            Sign In to PhishGuard
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Access your phishing awareness modules and threat simulations
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[var(--text-muted)] pointer-events-none" />
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password field with show/hide toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="text-xs font-semibold text-[var(--text-primary)]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[var(--text-muted)] pointer-events-none" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-color)] cursor-pointer"
                disabled={isLoading}
              />
              <span className="text-xs text-[var(--text-secondary)]">Remember me</span>
            </label>
          </div>

          {/* Submit Sign In button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:opacity-50"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              {isLoading && <ButtonSpinner size="sm" />}
              {isLoading ? 'Authenticating Security Session...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Demo Mode Notice */}
        <div className="mt-5 p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] leading-relaxed">
          <strong className="text-[var(--text-secondary)] block mb-0.5">Demo Authentication:</strong>
          Any valid email and 8+ character password will authorize your local demo session. Pre-filled with standard test credentials.
        </div>

        {/* Don't have an account link */}
        <div className="mt-6 text-center text-xs text-[var(--text-secondary)]">
          Don’t have an account?{' '}
          <button
            onClick={() => onNavigate('/register')}
            className="font-semibold underline hover:text-[var(--accent-color)]"
            style={{ color: 'var(--accent-color)' }}
          >
            Create a new account
          </button>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        defaultEmail={email}
      />
    </div>
  );
};
