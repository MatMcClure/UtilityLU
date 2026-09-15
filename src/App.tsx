import { useState, useEffect } from "react";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import SavedLineupsPage from "./pages/SavedLineups";
import { ThemeProvider } from "./context/ThemeContext";

type View = { page: "home" } | { page: "map"; mapId: string } | { page: "saved" };

function App() {
  const [view, setView] = useState<View>({ page: "home" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.history.replaceState({ view: { page: "home" } }, "", "/");
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setView(event.state?.view ?? { page: "home" });
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