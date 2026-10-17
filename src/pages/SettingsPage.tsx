import React, { useState } from 'react';
import { Palette, Sun, Moon, Sparkles, Check, RotateCcw, Shield, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTraining } from '../context/TrainingContext';
import { ThemeMode } from '../types';

interface SettingsPageProps {
  onNavigate: (path: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const { theme, setTheme, accent, setAccent, setCustomAccent, presetAccents } = useTheme();
  const { resetAllProgress } = useTraining();
  const [customHex, setCustomHex] = useState(accent.hex);
  const [resetSuccess, setResetSuccess] = useState(false);

  const themeOptions: { mode: ThemeMode; label: string; description: string; previewBg: string; previewCard: string }[] = [
    {
      mode: 'creamy',
      label: 'Default Creamy White',
      description: 'Warm, elegant parchment aesthetic (#FAF7F0) with soft white cards and high-contrast typography.',
      previewBg: '#FAF7F0',
      previewCard: '#FFFFFF',
    },
    {
      mode: 'light',
      label: 'Clean Light Mode',
      description: 'Crisp, contemporary daylight styling with pure white cards and slate-neutral accents.',
      previewBg: '#F8FAFC',
      previewCard: '#FFFFFF',
    },
    {
      mode: 'dark',
      label: 'Deep Dark Mode',
      description: 'Deep navy-charcoal canvas (#0B111E) tailored for low-light environments and high contrast.',
      previewBg: '#0B111E',
      previewCard: '#131D2E',
    },
  ];

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setCustomAccent(val);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all module progress, simulator answers, and quiz results back to beginning?')) {
      resetAllProgress();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            <Palette className="w-4 h-4 text-[var(--accent-color)]" />
            <span>Visual Ergonomics & Preferences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Theme & Interface Customization
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Personalize your PhishGuard interface. Switch between the signature Creamy White, Light, and Dark modes, or customize your cybersecurity accent palette.
          </p>
        </div>

        {/* Section 1: 3-Way Theme Selector */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-5">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interface Color Theme
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Default is Creamy White. Preferences are saved automatically to your device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((opt) => {
              const isSelected = theme === opt.mode;
              return (
                <div
                  key={opt.mode}
                  onClick={() => setTheme(opt.mode)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'border-[var(--accent-color)] bg-[var(--bg-surface-subtle)] shadow-md'
                      : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface-subtle)]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Visual Preview Box */}
                    <div
                      className="w-full h-24 rounded-xl border p-2.5 flex flex-col justify-between transition-colors shadow-inner"
                      style={{
                        backgroundColor: opt.previewBg,
                        borderColor: isSelected ? 'var(--accent-color)' : 'rgba(0,0,0,0.1)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-4 h-4 rounded-full bg-[var(--accent-color)]" />
                        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                          {opt.mode}
                        </span>
                      </div>
                      <div
                        className="p-2 rounded-lg border text-[10px] font-medium shadow-xs"
                        style={{
                          backgroundColor: opt.previewCard,
                          borderColor: 'rgba(0,0,0,0.08)',
                        }}
                      >
                        <span className="block truncate text-[var(--text-primary)]">Card Component</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          {opt.label}
                        </h3>
                        {isSelected && (
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: 'var(--accent-color)' }}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold ${
                      isSelected ? 'text-[var(--accent-color)]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {isSelected ? '● Active Theme' : 'Click to Apply'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Accent Color Picker */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Accent Color Customization
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Select one of our curated security presets or choose your own custom brand color.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Curated Defense Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {presetAccents.map((item) => {
                const isSelected = accent.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setAccent(item);
                      setCustomHex(item.hex);
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                      isSelected
                        ? 'border-[var(--accent-color)] bg-[var(--bg-surface-subtle)] shadow-xs scale-102 ring-2 ring-[var(--accent-color)] ring-offset-1'
                        : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)]'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full shadow-inner flex items-center justify-center text-white"
                      style={{ backgroundColor: item.hex }}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-semibold text-[var(--text-primary)]">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {item.hex}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Color Input */}
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Custom Hex Color Selection
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
                <input
                  type="color"
                  value={customHex}
                  onChange={handleCustomColorChange}
                  className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                  aria-label="Pick color"
                />
                <input
                  type="text"
                  value={customHex}
                  onChange={handleCustomColorChange}
                  placeholder="#2563EB"
                  className="w-28 px-2 py-1 text-xs font-mono font-bold rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] uppercase focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span>Current Active Accent:</span>
                <span
                  className="px-2 py-0.5 rounded font-mono font-bold text-white text-[11px]"
                  style={{ backgroundColor: accent.hex }}
                >
                  {accent.hex} ({accent.name})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Reset Demo Data */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              Reset Training Progress & Cache
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Clear your local module completions, simulator verdicts, and quiz scoring to start fresh.
            </p>
            {resetSuccess && (
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Progress successfully reset to baseline!
              </p>
            )}
          </div>

          <button
            onClick={handleResetData}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-rose-600 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 rounded-xl transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo Progress
          </button>
        </div>
      </div>
    </div>
  );
};
