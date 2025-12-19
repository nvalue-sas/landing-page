/**
 * Theme management utilities
 * Handles dark/light theme switching and persistence
 */

export type Theme = "light" | "dark";

/**
 * Checks if the system prefers dark mode
 */
export function prefersDarkMode(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Gets the current theme from localStorage or system preference
 */
export function getCurrentTheme(): Theme {
  const savedTheme = localStorage.getItem("theme") as Theme | null;

  if (savedTheme) {
    return savedTheme;
  }

  return prefersDarkMode() ? "dark" : "light";
}

/**
 * Applies the theme to the document
 */
export function applyTheme(theme: Theme): void {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

/**
 * Saves the theme to localStorage
 */
export function saveTheme(theme: Theme): void {
  localStorage.setItem("theme", theme);
}

/**
 * Initializes the theme on page load
 */
export function initTheme(): void {
  const theme = getCurrentTheme();
  applyTheme(theme);
}

/**
 * Toggles between light and dark theme
 */
export function toggleTheme(): void {
  const currentTheme = getCurrentTheme();
  const newTheme: Theme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);
  saveTheme(newTheme);
}

/**
 * Sets up a listener for system theme changes
 * Only applies if user hasn't manually set a preference
 */
export function watchSystemTheme(): void {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // Only auto-switch if user hasn't set a manual preference
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
}