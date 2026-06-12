import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import SearchPage from "./pages/SearchPage";
import PlayGame from "./pages/PlayGame";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="layout">
        <div className="content fade">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/play/:slug"
              element={<PlayGame />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}