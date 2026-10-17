import React, { useState } from 'react';
import { Shield, Mail, ExternalLink, Heart } from 'lucide-react';
import { TermsModal } from './TermsModal';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [termsOpen, setTermsOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-color)] transition-colors duration-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[var(--border-subtle)]">
            {/* Column 1: Brand & Mission */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span className="text-base font-bold text-[var(--text-primary)]">
                  PhishGuard
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-md">
                An open-access educational cybersecurity training platform engineered to empower students, employees, and everyday digital citizens against deceptive social engineering attacks.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span>Safe Educational Sandbox</span>
                <span aria-hidden="true">·</span>
                <span>Non-Operational Simulations</span>
                <span aria-hidden="true">·</span>
                <span>Zero Database Collection</span>
              </div>
            </div>

            {/* Column 2: Platform Navigation */}
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
                Training Hub
              </h4>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                <li>
                  <button onClick={() => onNavigate('/learn')} className="hover:text-[var(--text-primary)] transition-colors">
                    Learning Modules (1–5)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('/simulator')} className="hover:text-[var(--text-primary)] transition-colors">
                    Phishing Email Simulator
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('/quiz')} className="hover:text-[var(--text-primary)] transition-colors">
                    Interactive Security Quiz
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('/results')} className="hover:text-[var(--text-primary)] transition-colors">
                    Progress & Certification
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Resources */}
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
                Governance & Policy
              </h4>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                <li>
                  <button onClick={() => setTermsOpen(true)} className="hover:text-[var(--text-primary)] transition-colors text-left">
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => setPolicyOpen(true)} className="hover:text-[var(--text-primary)] transition-colors text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setContactOpen(true)} className="hover:text-[var(--text-primary)] transition-colors text-left">
                    Security Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('/settings')} className="hover:text-[var(--text-primary)] transition-colors text-left">
                    Theme & Accent Settings
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <p>
              © {new Date().getFullYear()} PhishGuard Training Platform. Built for digital defense literacy.
            </p>
            <p className="flex items-center gap-1">
              Protected by awareness and knowledge
            </p>
          </div>
        </div>
      </footer>

      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />

      {/* Privacy Policy Modal */}
      {policyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl max-w-lg w-full p-6 text-sm text-[var(--text-secondary)] space-y-4 shadow-xl">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">PhishGuard Privacy Policy</h3>
            <p className="text-xs leading-relaxed">
              PhishGuard is designed with privacy-first principles. In this release, all registration details and simulator progress exist in your local client-side memory and local storage. No external servers or third-party ad networks harvest your credentials.
            </p>
            <p className="text-xs leading-relaxed">
              Passwords used during demo registration are neither transmitted nor saved in plaintext.
            </p>
            <button
              onClick={() => setPolicyOpen(false)}
              className="w-full py-2 text-xs font-semibold text-white rounded-lg"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl max-w-md w-full p-6 text-sm text-[var(--text-secondary)] space-y-4 shadow-xl">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Contact Cybersecurity Training Desk</h3>
            <p className="text-xs leading-relaxed">
              Have questions regarding phishing curriculum, corporate licensing, or want to submit an anonymized suspicious email sample for our simulator?
            </p>
            <div className="p-3 rounded-lg bg-[var(--bg-surface-subtle)] text-xs text-[var(--text-primary)] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--accent-color)]" />
              <span>security-education@phishguard-platform.edu</span>
            </div>
            <button
              onClick={() => setContactOpen(false)}
              className="w-full py-2 text-xs font-semibold text-white rounded-lg"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
