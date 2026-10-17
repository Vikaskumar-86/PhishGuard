import React, { useState } from 'react';
import { Mail, Shield, AlertTriangle, CheckCircle2, XCircle, HelpCircle, ChevronRight, RotateCcw, ExternalLink, ArrowRight, Info, Paperclip, Lock, ArrowLeft } from 'lucide-react';
import { useTraining } from '../context/TrainingContext';
import { SIMULATOR_SCENARIOS } from '../data/simulatorScenarios';

interface SimulatorPageProps {
  onNavigate: (path: string) => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({ onNavigate }) => {
  const { simulatorAnswers, recordSimulatorAnswer, resetSimulator, stats } = useTraining();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<{ anchor: string; actualUrl: string } | null>(null);
  const [showHeaders, setShowHeaders] = useState(false);

  const scenario = SIMULATOR_SCENARIOS[currentScenarioIndex] || SIMULATOR_SCENARIOS[0];
  const userAnswer = simulatorAnswers[scenario.id];
  const hasAnswered = !!userAnswer;

  const isUserCorrect = hasAnswered && (
    (scenario.isPhishing && userAnswer === 'phishing') ||
    (!scenario.isPhishing && userAnswer === 'legitimate')
  );

  const handleSelectChoice = (choice: 'phishing' | 'legitimate' | 'unsure') => {
    recordSimulatorAnswer(scenario.id, choice);
  };

  const handleNext = () => {
    if (currentScenarioIndex < SIMULATOR_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setShowHeaders(false);
      setHoveredLink(null);
    }
  };

  const handlePrev = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1);
      setShowHeaders(false);
      setHoveredLink(null);
    }
  };

  const handleRestart = () => {
    resetSimulator();
    setCurrentScenarioIndex(0);
    setShowHeaders(false);
    setHoveredLink(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header & Simulator Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              <span>Threat Simulator</span>
              <span aria-hidden="true">·</span>
              <span>Scenario {currentScenarioIndex + 1} of {SIMULATOR_SCENARIOS.length}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[var(--accent-color)]">{scenario.difficulty} Level</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
              Phishing Email Laboratory
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Inspect headers, sender addresses, and hover over links to detect deceptive indicators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Lab
            </button>
            <div className="text-right">
              <span className="text-xs text-[var(--text-muted)] block">Accuracy</span>
              <span className="text-sm font-bold font-mono tabular-nums text-[var(--text-primary)]">
                {stats.simulatorAccuracyPercent}% ({stats.simulatorCorrectCount}/{stats.simulatorTestedCount})
              </span>
            </div>
          </div>
        </div>

        {/* Email Client Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Simulated Inbox Scenario Selector (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface-subtle)]">
              <span className="text-xs font-bold text-[var(--text-primary)]">
                Simulation Scenarios ({SIMULATOR_SCENARIOS.length})
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                {Object.keys(simulatorAnswers).length} Tested
              </span>
            </div>

            <div className="divide-y divide-[var(--border-subtle)] max-h-[560px] overflow-y-auto">
              {SIMULATOR_SCENARIOS.map((item, idx) => {
                const ans = simulatorAnswers[item.id];
                const active = idx === currentScenarioIndex;
                const isItemCorrect = ans && (
                  (item.isPhishing && ans === 'phishing') ||
                  (!item.isPhishing && ans === 'legitimate')
                );

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentScenarioIndex(idx);
                      setShowHeaders(false);
                      setHoveredLink(null);
                    }}
                    className={`w-full text-left p-4 transition-colors relative flex items-start gap-3 ${
                      active
                        ? 'bg-[var(--accent-soft)]/50'
                        : 'hover:bg-[var(--bg-surface-subtle)]'
                    }`}
                  >
                    {active && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                      />
                    )}
                    <div className="mt-0.5">
                      {ans ? (
                        isItemCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="font-semibold text-[var(--text-primary)] truncate">
                          {item.senderName}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] shrink-0">
                          #{item.scenarioNumber}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-primary)] font-medium truncate">
                        {item.subject}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                        {item.previewSnippet}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Email Reader & Decision Deck (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* The Email Viewer Frame */}
            <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs overflow-hidden">
              {/* Email Client Header Bar */}
              <div className="p-4 sm:p-5 border-b border-[var(--border-color)] bg-[var(--bg-surface-subtle)] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                    {scenario.subject}
                  </h2>
                  <button
                    onClick={() => setShowHeaders(!showHeaders)}
                    className="text-xs font-semibold text-[var(--accent-color)] hover:underline self-start sm:self-auto"
                  >
                    {showHeaders ? 'Hide Security Headers' : 'Inspect Security Headers (DKIM/SPF)'}
                  </button>
                </div>

                {/* Sender metadata row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--text-secondary)]">
                  <div>
                    <span className="text-[var(--text-muted)]">From: </span>
                    <strong className="text-[var(--text-primary)]">{scenario.senderName}</strong>{' '}
                    <span className="font-mono text-[var(--text-secondary)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">
                      &lt;{scenario.senderEmail}&gt;
                    </span>
                  </div>
                  <span className="text-[var(--text-muted)] font-mono">{scenario.date}</span>
                </div>

                {/* Expanded Forensic Headers */}
                {showHeaders && (
                  <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono space-y-1.5 animate-in fade-in">
                    <p className="text-[11px] font-bold text-[var(--text-primary)] font-sans uppercase tracking-wider mb-1">
                      Raw Network Envelope Headers:
                    </p>
                    <p><span className="text-[var(--text-muted)]">Return-Path:</span> {scenario.returnPath || scenario.senderEmail}</p>
                    {scenario.replyTo && <p><span className="text-[var(--text-muted)]">Reply-To:</span> {scenario.replyTo}</p>}
                    <div className="flex items-center gap-4 pt-1 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        scenario.dkimStatus === 'Pass' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                      }`}>
                        DKIM: {scenario.dkimStatus}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        scenario.spfStatus === 'Pass' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                      }`}>
                        SPF: {scenario.spfStatus}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Email Body Area */}
              <div className="p-6 space-y-4">
                <div className="text-xs sm:text-sm text-[var(--text-primary)] whitespace-pre-line leading-relaxed font-sans">
                  {scenario.bodyText}
                </div>

                {/* Interactive Simulated Links */}
                {scenario.links.map((link, idx) => (
                  <div key={idx} className="pt-2">
                    <div
                      onMouseEnter={() => setHoveredLink({ anchor: link.anchorText, actualUrl: link.destinationUrl })}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="inline-block"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          // Provide harmless safe feedback
                        }}
                        className="text-xs sm:text-sm font-semibold underline px-3 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] transition-all cursor-pointer"
                        style={{ color: 'var(--accent-color)' }}
                      >
                        🔗 {link.anchorText}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Simulated Malicious Attachment (if any) */}
                {scenario.attachments && scenario.attachments.length > 0 && (
                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <span className="text-xs font-semibold text-[var(--text-muted)] block mb-2">
                      Attachments ({scenario.attachments.length}):
                    </span>
                    <div className="space-y-2">
                      {scenario.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <Paperclip className="w-4 h-4 text-rose-500" />
                            <div>
                              <p className="font-mono font-semibold text-[var(--text-primary)]">{att.filename}</p>
                              <p className="text-[11px] text-[var(--text-muted)]">{att.size} · {att.note}</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-600">
                            Suspicious
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Simulated Status Bar (Browser Link Inspector) */}
              <div className="p-3 bg-slate-900 text-slate-300 border-t border-slate-800 text-xs font-mono flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-slate-500">Destination Preview:</span>
                  {hoveredLink ? (
                    <span className="text-amber-300 font-bold underline truncate">
                      {hoveredLink.actualUrl}
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">
                      Hover cursor over links above to inspect real destination URL
                    </span>
                  )}
                </div>
                {hoveredLink && (
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-sans hidden sm:inline">
                    URL Heuristic Active
                  </span>
                )}
              </div>
            </div>

            {/* Decision Deck: Phishing / Legitimate / Unsure */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    What is your security verdict on this message?
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Classify based on sender forensics, urgent manipulation, or domain authenticity.
                  </p>
                </div>
                {hasAnswered && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--bg-surface-subtle)] text-[var(--text-primary)]">
                    Answered: <strong className="capitalize">{userAnswer}</strong>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <button
                  onClick={() => handleSelectChoice('phishing')}
                  className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 ${
                    userAnswer === 'phishing'
                      ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 shadow-xs'
                      : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-primary)]'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Phishing Attack
                </button>

                <button
                  onClick={() => handleSelectChoice('legitimate')}
                  className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 ${
                    userAnswer === 'legitimate'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-primary)]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Legitimate Communication
                </button>

                <button
                  onClick={() => handleSelectChoice('unsure')}
                  className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 ${
                    userAnswer === 'unsure'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-xs'
                      : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-primary)]'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  Unsure / Need Verification
                </button>
              </div>

              {/* Forensic Educational Breakdown upon answering */}
              {hasAnswered && (
                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-4 animate-in fade-in">
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      isUserCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    {isUserCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong className="block text-sm font-bold mb-1">
                        {isUserCorrect ? 'Correct Analysis!' : 'Caution: Incorrect Classification'}
                      </strong>
                      <p className="text-xs leading-relaxed">
                        Actual Classification: <strong className="underline">{scenario.isPhishing ? 'Malicious Phishing Attack' : 'Legitimate Corporate Communication'}</strong>. {scenario.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Warning Signs / Red Flags */}
                  {scenario.redFlags.length > 0 && (
                    <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] space-y-2">
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                        Forensic Warning Signs Detected:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                        {scenario.redFlags.map((flag, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">⚠️</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommended Safe Actions */}
                  <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] space-y-2">
                    <span className="text-xs font-bold text-[var(--accent-color)] uppercase tracking-wider block">
                      Recommended Safe Protocol:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                      {scenario.safeActions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next / Previous Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentScenarioIndex === 0}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)] disabled:opacity-40"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Previous Scenario
                    </button>

                    {currentScenarioIndex < SIMULATOR_SCENARIOS.length - 1 ? (
                      <button
                        onClick={handleNext}
                        className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white rounded-lg shadow-xs"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                      >
                        Next Scenario
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('/quiz')}
                        className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white rounded-lg shadow-xs"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                      >
                        Proceed to Quiz
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
