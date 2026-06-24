import { Code2, ArrowUp } from 'lucide-react';

interface FooterProps {
  accentColor: string;
}

export default function Footer({ accentColor }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  const textAccentClass = {
    blue: 'text-blue-600 dark:text-blue-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    amber: 'text-amber-500 dark:text-amber-400',
    rose: 'text-rose-600 dark:text-rose-400',
  }[accentColor] || 'text-blue-600';

  const bgAccentClass = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    amber: 'bg-amber-500 hover:bg-amber-600',
    rose: 'bg-rose-600 hover:bg-rose-700',
  }[accentColor] || 'bg-blue-600';

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#060606] py-12 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo brand */}
        <div className="flex items-center gap-2.5">
          <div className="text-left">
            <span className="block font-bold text-gray-900 dark:text-white tracking-tight leading-none text-base">
              Gowtham Raj B
            </span>
            <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 tracking-wider">
              Software Developer • Portfolio
            </span>
          </div>
        </div>

        {/* Copy text */}
        <p className="text-xs font-mono text-gray-400 dark:text-gray-500 font-medium">
          © {currentYear} Gowtham Raj B. All rights reserved.
        </p>

        {/* Action controls */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5" />
            <span>ATS_APPROVED</span>
          </span>

          <button
            onClick={handleScrollToTop}
            title="Scroll to Top"
            className={`p-2.5 rounded-xl text-white cursor-pointer transition-all hover:scale-105 ${bgAccentClass}`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
