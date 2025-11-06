// ==========================================================================
// THEME UTILITIES
// ==========================================================================

export type Theme = 'light' | 'dark' | 'system';

class ThemeManager {
  private readonly STORAGE_KEY = 'kissmate-theme';
  private currentTheme: Theme = 'system';

  constructor() {
    this.initializeTheme();
    this.watchSystemTheme();
  }

  private initializeTheme(): void {
    // Get theme from localStorage or default to system
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
    this.currentTheme = savedTheme || 'system';
    this.applyTheme(this.currentTheme);
  }

  private watchSystemTheme(): void {
    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applySystemTheme();
      }
    });
  }

  private applySystemTheme(): void {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }

  private applyTheme(theme: Theme): void {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
      this.applySystemTheme();
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  public setTheme(theme: Theme): void {
    this.currentTheme = theme;
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.applyTheme(theme);
  }

  public getTheme(): Theme {
    return this.currentTheme;
  }

  public getEffectiveTheme(): 'light' | 'dark' {
    if (this.currentTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  public toggleTheme(): void {
    const effectiveTheme = this.getEffectiveTheme();
    this.setTheme(effectiveTheme === 'light' ? 'dark' : 'light');
  }
}

// Export singleton instance
export const themeManager = new ThemeManager();

// React hook for theme management
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(themeManager.getTheme());
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(
    themeManager.getEffectiveTheme()
  );

  useEffect(() => {
    const updateTheme = () => {
      setEffectiveTheme(themeManager.getEffectiveTheme());
    };

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    // Listen for manual theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      observer.disconnect();
    };
  }, []);

  const setTheme = (newTheme: Theme) => {
    themeManager.setTheme(newTheme);
    setThemeState(newTheme);
    setEffectiveTheme(themeManager.getEffectiveTheme());
  };

  const toggleTheme = () => {
    themeManager.toggleTheme();
    setThemeState(themeManager.getTheme());
    setEffectiveTheme(themeManager.getEffectiveTheme());
  };

  return {
    theme,
    effectiveTheme,
    setTheme,
    toggleTheme,
    isDark: effectiveTheme === 'dark'
  };
}