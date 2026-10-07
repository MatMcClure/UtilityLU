import { useState, useEffect } from "react";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import SavedLineups from "./pages/SavedLineups";
import { ThemeProvider } from "./context/ThemeContext";
import { maps } from "./data/maps";

type View =
  | { page: "home" }
  | { page: "map"; mapId: string; lineupId?: string }
  | { page: "saved" };

function getViewFromPath(pathname: string): View {
  if (pathname === "/saved") {
    return { page: "saved" };
  }

  const mapMatch = pathname.match(/^\/maps\/(.+)$/);
  if (mapMatch) {
    const mapId = mapMatch[1];
    const mapExists = maps.some((m) => m.id === mapId);
    if (mapExists) {
      return { page: "map", mapId };
    }
  }

  return { page: "home" };
}

function App() {
  const [view, setView] = useState<View>(() =>
    getViewFromPath(window.location.pathname)
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.history.replaceState({ view }, "", window.location.pathname);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setView(event.state?.view ?? getViewFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const goToMap = (mapId: string) => {
    const newView: View = { page: "map", mapId };
    setView(newView);
    window.history.pushState({ view: newView }, "", `/maps/${mapId}`);
  };

  const goToLineup = (mapId: string, lineupId: string) => {
    const newView: View = { page: "map", mapId, lineupId };
    setView(newView);
    window.history.pushState({ view: newView }, "", `/maps/${mapId}`);
  };

  const goToSaved = () => {
    const newView: View = { page: "saved" };
    setView(newView);
    window.history.pushState({ view: newView }, "", "/saved");
  };

  return (
    <ThemeProvider>
      {view.page === "map" ? (
        <MapPage
          mapId={view.mapId}
          initialLineupId={view.lineupId}
          onViewSaved={goToSaved}
          onSelectLineup={goToLineup}
        />
      ) : view.page === "saved" ? (
        <SavedLineups />
      ) : (
        <Home
          onSelectMap={goToMap}
          onSelectLineup={goToLineup}
          onViewSaved={goToSaved}
          currentImageIndex={currentImageIndex}
          onImageIndexChange={setCurrentImageIndex}
        />
      )}
    </ThemeProvider>
  );
}

export default App;