import { useTheme, type Theme } from "../context/ThemeContext";
import "../styles/ThemeSwitcher.css";

const themes: { value: Theme; label: string }[] = [
  { value: "light", label: "☀️ Light" },
  { value: "dark", label: "🌙 Dark" },
  { value: "oled", label: "⚫ OLED" },
  { value: "classic", label: "🌊 Classic" },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      className="theme-switcher"
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      aria-label="Choose theme"
    >
      {themes.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  );
}

export default ThemeSwitcher;
