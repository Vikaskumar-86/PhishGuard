import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
    >
      <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-color)] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="terms-title" className="text-base font-semibold text-[var(--text-primary)]">
                Terms and Conditions & Educational Policy
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Last updated: October 2026 · PhishGuard Platform
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] transition-colors"
            aria-label="Close Terms modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-[var(--text-secondary)] leading-relaxed">
          <div className="p-3.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-color)] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[var(--text-primary)] block mb-0.5">Educational Purpose Only</strong>
              PhishGuard is designed exclusively for educational cybersecurity training and defense awareness. All simulated emails, domains, and entities are synthetic.
            </div>
          </div>

          <section>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              1. Acceptance of Terms
            </h3>
            <p>
              By creating an account or accessing PhishGuard, you agree to comply with these terms, privacy guidelines, and community safety policies. If you do not accept these terms, you may not register or utilize training modules.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              2. Privacy and Data Handling
            </h3>
            <p>
              In this client-side demonstration version, your personal registration data is stored in your local browser sandbox. PhishGuard does not store your plaintext passwords or share your contact information with third parties.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              3. Simulated Phishing Exercises
            </h3>
            <p>
              Our interactive scenarios use realistic training simulations. These simulations never transmit malicious software, collect real credentials, or initiate real financial transactions. Users agree not to weaponize any educational materials learned within this system.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              4. User Conduct and Integrity
            </h3>
            <p>
              Users agree to provide accurate registration details, respect intellectual property, and take quizzes ethically. Attempting to reverse-engineer or disrupt testing systems is strictly prohibited.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              5. Disclaimer of Security Warranties
            </h3>
            <p>
              While PhishGuard strives to provide accurate threat detection knowledge, no training program guarantees 100% immunity against advanced evolving cyber attacks. Users must maintain continuous vigilance and adhere to their company security protocols.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-subtle)]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            Close
          </button>
          {onAccept && (
            <button
              type="button"
              onClick={() => {
                onAccept();
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white rounded-lg shadow-xs transition-colors"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Accept and Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
