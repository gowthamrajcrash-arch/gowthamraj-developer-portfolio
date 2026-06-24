import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

export const ACCENTS = [
  { name: 'Azure Blue', class: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600/30', value: 'blue' },
  { name: 'Emerald', class: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600/30', value: 'emerald' },
  { name: 'Indigo', class: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-600/30', value: 'indigo' },
  { name: 'Amber Gold', class: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500/30', value: 'amber' },
  { name: 'Hot Coral', class: 'bg-rose-500', text: 'text-rose-500', border: 'border-rose-500/30', value: 'rose' },
];

export default function Navbar({ darkMode, setDarkMode, accentColor, setAccentColor }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Timeline', id: 'timeline' },
    { label: 'Projects', id: 'projects' },
    { label: 'GitHub', id: 'github' },
    { label: 'Certs', id: 'certs' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section highlights
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'hero' ? 0 : offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const currentAccent = ACCENTS.find(a => a.value === accentColor) || ACCENTS[0];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-white/80 dark:bg-gray-950/80 shadow-md backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Monogram */}
        <button
          onClick={() => handleScrollTo('hero')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md transition-all duration-300 group-hover:scale-105 ${currentAccent.class}`}>
            GR
          </div>
          <div className="text-left">
            <span className="block font-bold text-gray-900 dark:text-white tracking-tight leading-none text-base">
              Gowtham Raj B
            </span>
            <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 tracking-wider">
              Aspiring Software Dev
            </span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1 bg-gray-100/60 dark:bg-gray-900/60 p-1.5 rounded-full border border-gray-200/40 dark:border-gray-800/40 backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${currentAccent.class} text-white shadow-sm`
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Accent Color Palette Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowPalette(!showPalette)}
              title="Customizer Accent Color"
              className="p-2.5 rounded-xl border border-gray-200/60 dark:border-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
            >
              <Palette className="w-4.5 h-4.5" />
            </button>

            <AnimatePresence>
              {showPalette && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPalette(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 p-3 z-20"
                  >
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 font-bold px-1">
                      Choose Theme Accent
                    </p>
                    <div className="flex flex-col gap-1">
                      {ACCENTS.map((accent) => (
                        <button
                          key={accent.value}
                          onClick={() => {
                            setAccentColor(accent.value);
                            setShowPalette(false);
                          }}
                          className={`flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-full ${accent.class} border border-white/20`} />
                            <span>{accent.name}</span>
                          </div>
                          {accentColor === accent.value && (
                            <Check className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl border border-gray-200/60 dark:border-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Contact Button */}
          <button
            onClick={() => handleScrollTo('contact')}
            className={`hidden md:inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold text-white cursor-pointer shadow-sm transition-all duration-300 hover:shadow-md ${currentAccent.class} hover:opacity-90`}
          >
            Let's Talk
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 lg:hidden rounded-xl border border-gray-200/60 dark:border-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden w-full border-t border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? `${currentAccent.class} text-white`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-50 font-mono">0{(navItems.indexOf(item) + 1)}</span>
                  </button>
                );
              })}
              <button
                onClick={() => handleScrollTo('contact')}
                className={`mt-2 w-full py-3.5 rounded-xl text-center text-sm font-bold text-white ${currentAccent.class}`}
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
