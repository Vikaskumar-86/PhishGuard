import React, { createContext, useContext, useEffect, useState } from 'react';
import { AccentColor, ThemeMode } from '../types';

export const PRESET_ACCENTS: AccentColor[] = [
  { id: 'cyber-blue', name: 'Cyber Blue', hex: '#2563EB', hoverHex: '#1D4ED8' },
  { id: 'emerald-guard', name: 'Emerald Guard', hex: '#059669', hoverHex: '#047857' },
  { id: 'violet-shield', name: 'Violet Shield', hex: '#7C3AED', hoverHex: '#6D28D9' },
  { id: 'amber-alert', name: 'Amber Alert', hex: '#D97706', hoverHex: '#B45309' },
  { id: 'crimson-defense', name: 'Crimson Defense', hex: '#DC2626', hoverHex: '#B91C1C' },
  { id: 'cyan-sentinel', name: 'Cyan Sentinel', hex: '#0284C7', hoverHex: '#0369A1' },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  setCustomAccent: (hex: string) => void;
  presetAccents: AccentColor[];
}

const THEME_STORAGE_KEY = 'phishguard_theme_mode';
const ACCENT_STORAGE_KEY = 'phishguard_accent_color';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default theme is strictly creamy
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'creamy') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
    return 'creamy';
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    try {
      const saved = localStorage.getItem(ACCENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.hex) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return PRESET_ACCENTS[0]; // Cyber Blue default
  });

  // Apply theme class to document.body
  useEffect(() => {
    document.body.classList.remove('theme-creamy', 'theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  // Apply accent color CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', accent.hex);
    root.style.setProperty('--accent-hover', accent.hoverHex);
    root.style.setProperty('--accent-soft', `${accent.hex}20`);
    root.style.setProperty('--accent-ring', `${accent.hex}40`);

    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, JSON.stringify(accent));
    } catch {
      // Ignore
    }
  }, [accent]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
  };

  const setCustomAccent = (hex: string) => {
    // Validate hex
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setAccentState({
        id: 'custom',
        name: 'Custom',
        hex,
        hoverHex: hex,
      });
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        accent,
        setAccent,
        setCustomAccent,
        presetAccents: PRESET_ACCENTS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
