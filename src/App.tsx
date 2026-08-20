import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import HostReceptionModal from './components/HostReceptionModal';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BarPage from './pages/BarPage';

export default function App() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#0d0905] text-[#f5f0e8] selection:bg-[#c9973e] selection:text-[#0d0905] overflow-x-hidden font-sans">
        {/* Scroll To Top on Route Navigation */}
        <ScrollToTop />

        {/* Viewport Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Host Stand QR Reception Check-in Modal */}
        <HostReceptionModal />

        {/* Editorial Preloader Component */}
        <Preloader onComplete={() => setIsPreloaderComplete(true)} />

        {/* Custom Precision Cursor */}
        <CustomCursor />

        {/* Noise Texture Overlay */}
        <NoiseOverlay />

        {/* Main Application Wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isPreloaderComplete ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col min-h-screen justify-between"
        >
          {/* Universal Sticky Header Navigation */}
          <Navbar />

          {/* Multipage Route Views */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/bar" element={<BarPage />} />
              {/* Fallback to Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>

          {/* Universal 4-Column Luxury Footer */}
          <Footer />
        </motion.div>
      </div>
    </BrowserRouter>
  );
}
