import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import SearchPage from "./pages/SearchPage";
import PlayGame from "./pages/PlayGame";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import "./index.css";
import "./legal.css";

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
            <Route path="/play/:slug" element={<PlayGame />} />

            {/* Legal pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </BrowserRouter>
  );
}