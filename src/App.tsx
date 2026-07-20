import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps/:mapId" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;