import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import { useLenis } from './hooks/useLenis';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Placements from './pages/Services';
import Courses from './pages/Projects';
import CourseDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis Smooth Scroll synced with GSAP
  useLenis();

  return (
    <div className="relative min-h-screen bg-bg text-text overflow-x-hidden">
      {/* 3% Noise overlay */}
      <div className="noise-overlay" />

      {/* Custom Precision Cursor */}
      <Cursor />

      {/* Initial Preloader Wipe */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Sticky Global Navbar */}
      <Navbar />

      {/* Main Routed Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Global Architectural Footer */}
      <Footer />
    </div>
  );
}

