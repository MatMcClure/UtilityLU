import { useState, useEffect } from "react";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import SavedLineupsPage from "./pages/SavedLineups";
import { ThemeProvider } from "./context/ThemeContext";
import { maps } from "./data/maps";

type View = { page: "home" } | { page: "map"; mapId: string } | { page: "saved" };

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

  // Sync the initial history entry to match the URL actually loaded,
  // without adding a new entry (replaceState, not pushState).
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

  const goToSaved = () => {
    const newView: View = { page: "saved" };
    setView(newView);
    window.history.pushState({ view: newView }, "", "/saved");
  };

  return (
    <ThemeProvider>
      {view.page === "map" ? (
        <MapPage mapId={view.mapId} onViewSaved={goToSaved} />
      ) : view.page === "saved" ? (
        <SavedLineupsPage />
      ) : (
        <Home
          onSelectMap={goToMap}
          onViewSaved={goToSaved}
          currentImageIndex={currentImageIndex}
          onImageIndexChange={setCurrentImageIndex}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
