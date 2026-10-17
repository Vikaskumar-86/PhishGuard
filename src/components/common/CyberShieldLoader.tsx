import React from 'react';
import { Shield, Lock } from 'lucide-react';

interface FullPageLoaderProps {
  message?: string;
  submessage?: string;
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  message = 'Securing your learning experience...',
  submessage = 'Analyzing security heuristics and loading cryptographic state',
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all">
      <div className="relative flex flex-col items-center max-w-sm w-full p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl text-center">
        {/* Animated Shield with Orbital Ring */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          {/* Outer Pulsing Aura */}
          <div className="absolute inset-0 rounded-full bg-[var(--accent-soft)] animate-ping opacity-75" />
          
          {/* Rotating Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent-color)] border-r-[var(--accent-color)] animate-spin" />
          
          {/* Inner Shield Badge */}
          <div className="relative z-10 w-14 h-14 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent-color)] shadow-inner">
            <Shield className="w-7 h-7" />
            <Lock className="w-3.5 h-3.5 absolute bottom-4 text-[var(--accent-color)]" />
          </div>
        </div>

        {/* Message */}
        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1.5">
          {message}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {submessage}
        </p>

        {/* Subtle Progress Bar */}
        <div className="w-full mt-6 h-1.5 bg-[var(--border-subtle)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--accent-color)] rounded-full animate-pulse w-3/4" />
        </div>
      </div>
    </div>
  );
};

export const ButtonSpinner: React.FC<{ size?: 'sm' | 'md'; className?: string }> = ({ size = 'sm', className = '' }) => {
  const sizeClasses = size === 'sm' ? 'w-4 h-4 border-2' : 'w-5 h-5 border-2';
  return (
    <div
      className={`inline-block animate-spin rounded-full border-current border-t-transparent ${sizeClasses} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export const CardSkeleton: React.FC<{ lines?: number; className?: string }> = ({ lines = 3, className = '' }) => {
  return (
    <div className={`p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] animate-pulse ${className}`}>
      <div className="h-5 bg-[var(--border-subtle)] rounded w-2/5 mb-4" />
      <div className="space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3.5 bg-[var(--border-subtle)] rounded"
            style={{ width: `${85 - i * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
};
