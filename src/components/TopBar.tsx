import ThemeSwitcher from "./ThemeSwitcher";
import "../styles/TopBar.css";

interface TopBarProps {
  onViewSaved: () => void;
}

function TopBar({ onViewSaved }: TopBarProps) {
  return (
    <div className="top-bar">
      <ThemeSwitcher />
      <button className="saved-link" onClick={onViewSaved}>
        ★ Saved Lineups
      </button>
    </div>
  );
}

export default TopBar;