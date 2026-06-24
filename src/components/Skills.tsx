import { useState } from 'react';
import { Terminal, Laptop, Database, PenTool, Settings, MessageSquare, Cpu, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Skill } from '../types';

interface SkillsProps {
  accentColor: string;
}

export default function Skills({ accentColor }: SkillsProps) {
  const skillsData: Skill[] = [
    // Programming
    { name: 'Python Programming', level: 90, category: 'Programming', iconName: 'Terminal' },
    { name: 'C++ Programming', level: 80, category: 'Programming', iconName: 'Terminal' },
    { name: 'SQL Querying', level: 85, category: 'Programming', iconName: 'Terminal' },
    
    // Web Dev
    { name: 'HTML5 Semantic Web', level: 95, category: 'Web', iconName: 'Laptop' },
    { name: 'CSS3 & Responsive Design', level: 90, category: 'Web', iconName: 'Laptop' },
    { name: 'JavaScript ES6+', level: 82, category: 'Web', iconName: 'Laptop' },
    { name: 'React.js & Vite', level: 75, category: 'Web', iconName: 'Laptop' },
    { name: 'Tailwind CSS', level: 88, category: 'Web', iconName: 'Laptop' },

    // Databases
    { name: 'MongoDB', level: 78, category: 'Database', iconName: 'Database' },
    { name: 'Relational SQL', level: 85, category: 'Database', iconName: 'Database' },

    // UI/UX & Tools
    { name: 'Figma UI Design', level: 80, category: 'Design', iconName: 'PenTool' },
    { name: 'Wireframing & Prototyping', level: 85, category: 'Design', iconName: 'PenTool' },
    { name: 'Visual Studio Code', level: 90, category: 'Tools', iconName: 'Settings' },
    { name: 'Git & GitHub', level: 85, category: 'Tools', iconName: 'Settings' },
    { name: 'Microsoft Office Suite', level: 88, category: 'Tools', iconName: 'Settings' },

    // Core Methodologies
    { name: 'Problem Solving & Logic', level: 92, category: 'Core', iconName: 'Cpu' },
    { name: 'Software Debugging', level: 88, category: 'Core', iconName: 'Cpu' },
    { name: 'Logical Thinking', level: 90, category: 'Core', iconName: 'Cpu' },
    { name: 'Software Development Practices', level: 82, category: 'Core', iconName: 'Cpu' },

    // Soft Skills
    { name: 'Team Collaboration', level: 92, category: 'Soft', iconName: 'MessageSquare' },
    { name: 'Technical Communication', level: 88, category: 'Soft', iconName: 'MessageSquare' },
    { name: 'Creativity & Innovation', level: 85, category: 'Soft', iconName: 'MessageSquare' },
    { name: 'Time Management', level: 90, category: 'Soft', iconName: 'MessageSquare' },
    { name: 'Adaptability & Learning', level: 95, category: 'Soft', iconName: 'MessageSquare' },
  ];

  const categories = [
    { value: 'all', label: 'All Skillsets', icon: Cpu },
    { value: 'Programming', label: 'Programming', icon: Terminal },
    { value: 'Web', label: 'Web Development', icon: Laptop },
    { value: 'Database', label: 'Databases', icon: Database },
    { value: 'Design', label: 'UI/UX Design', icon: PenTool },
    { value: 'Tools', label: 'Developer Tools', icon: Settings },
    { value: 'Core', label: 'Core Engineering', icon: Cpu },
    { value: 'Soft', label: 'Soft Skills', icon: MessageSquare },
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'bento'>('bento');

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Programming': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30';
      case 'Web': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30';
      case 'Database': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/30';
      case 'Design': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/30';
      case 'Tools': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/30';
      case 'Core': return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800/30';
      default: return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800/30';
    }
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-4 h-4" />;
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'PenTool': return <PenTool className="w-4 h-4" />;
      case 'Settings': return <Settings className="w-4 h-4" />;
      case 'MessageSquare': return <MessageSquare className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  const bgAccentClass = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    amber: 'bg-amber-500 hover:bg-amber-600',
    rose: 'bg-rose-600 hover:bg-rose-700',
  }[accentColor] || 'bg-blue-600';

  const textAccentClass = {
    blue: 'text-blue-600 dark:text-blue-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    amber: 'text-amber-500 dark:text-amber-400',
    rose: 'text-rose-600 dark:text-rose-400',
  }[accentColor] || 'text-blue-600';

  const progressAccentClass = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600',
    indigo: 'bg-indigo-600',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  }[accentColor] || 'bg-blue-600';

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-500 dark:text-white/40 block">
              [ STACK_PROFICIENCY_MATRIX ]
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-950 dark:text-white">
              Stack Proficiency
            </h2>
            <p className="text-base text-gray-600 dark:text-white/70 font-light leading-relaxed max-w-xl pt-2">
              A comprehensive directory of my technology proficiency, core methodologies, soft skills, and application tooling.
            </p>
          </div>

          {/* Toggle View Options */}
          <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl self-center md:self-end border border-gray-200/50 dark:border-gray-800/50">
            <button
              onClick={() => setViewMode('bento')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                viewMode === 'bento'
                  ? `${bgAccentClass} text-white shadow-sm`
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Mastery Bars
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                viewMode === 'grid'
                  ? `${bgAccentClass} text-white shadow-sm`
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Compact Badges
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto justify-start border-b border-gray-100 dark:border-gray-900">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all border ${
                  isSelected
                    ? `${bgAccentClass} text-white border-transparent shadow-sm`
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <CatIcon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Visualizer Block */}
        <div className="min-h-[250px]">
          <AnimatePresence mode="popLayout">
            {viewMode === 'bento' ? (
              // BENTO PROGRESS BAR VIEW
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredSkills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                    className="p-5 rounded-3xl bg-white dark:bg-[#0a0a0a]/50 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${getCategoryColor(skill.category)}`}>
                          {getSkillIcon(skill.iconName)}
                        </div>
                        <span className="font-bold text-sm text-gray-900 dark:text-white group-hover:translate-x-0.5 transition-transform">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800/70 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className={`h-full rounded-full ${progressAccentClass}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // COMPACT BADGE GRID VIEW
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-3.5 justify-start"
              >
                {filteredSkills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.2) }}
                    className={`px-4 py-3 rounded-2xl border flex items-center gap-2.5 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 shadow-sm transition-all ${getCategoryColor(skill.category)}`}
                  >
                    <CheckCircle2 className="w-4 h-4 opacity-70" />
                    <span className="text-xs font-bold font-sans tracking-wide">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
