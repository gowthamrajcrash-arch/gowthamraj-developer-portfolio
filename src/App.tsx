import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GitHubSection from './components/GitHubSection';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Theme state settings (Defaults: dark: true, accentColor: 'blue')
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('gwr_theme_dark');
    return saved ? saved === 'true' : true;
  });

  const [accentColor, setAccentColor] = useState<string>(() => {
    return localStorage.getItem('gwr_theme_accent') || 'blue';
  });

  // Keep theme class in sync on document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('gwr_theme_dark', darkMode.toString());
  }, [darkMode]);

  // Keep accent color in sync on localStorage
  useEffect(() => {
    localStorage.setItem('gwr_theme_accent', accentColor);
  }, [accentColor]);

  // Premium cross-fade transition wrapper for theme changes
  const handleSetDarkMode = (value: boolean | ((prev: boolean) => boolean)) => {
    const doc = document as any;
    if (doc.startViewTransition) {
      doc.startViewTransition(() => {
        setDarkMode(value);
      });
    } else {
      setDarkMode(value);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 ease-in-out bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-500/10 select-none print:bg-white print:text-black print:min-h-0 print:h-auto">
      
      {/* Floating Header Navbar */}
      <div className="print:hidden">
        <Navbar
          darkMode={darkMode}
          setDarkMode={handleSetDarkMode}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
        />
      </div>

      {/* Main Single-View Layout Blocks */}
      <main className="relative">
        {/* About / Hero Profile Block */}
        <Hero accentColor={accentColor} />

        <div className="print:hidden">
          {/* Dynamic Achievements Counters Row */}
          <Stats accentColor={accentColor} />

          {/* Technical Mastery Skills Block */}
          <Skills accentColor={accentColor} />

          {/* Experience & Timelines Chronology */}
          <Experience accentColor={accentColor} />

          {/* Interactive Showcase & Playful App Simulators */}
          <Projects accentColor={accentColor} />

          {/* Live GitHub Profile & Repos APIs Sync Dashboard */}
          <GitHubSection accentColor={accentColor} />

          {/* Verified Credentials List */}
          <Certifications accentColor={accentColor} />

          {/* Contact Form, Contacts Map & Local Message History */}
          <Contact accentColor={accentColor} />
        </div>
      </main>

      {/* Minimal Footer */}
      <div className="print:hidden">
        <Footer accentColor={accentColor} />
      </div>
    </div>
  );
}
