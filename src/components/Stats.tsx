import { useState, useEffect } from 'react';
import { Briefcase, Award, Wrench, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsProps {
  accentColor: string;
}

interface StatItem {
  id: string;
  label: string;
  targetValue: number;
  suffix: string;
  icon: any;
  color: string;
  subtitle: string;
}

export default function Stats({ accentColor }: StatsProps) {
  const statConfig: StatItem[] = [
    {
      id: 'internships',
      label: 'Internships Completed',
      targetValue: 2,
      suffix: '+',
      icon: Briefcase,
      color: 'from-emerald-500 to-teal-500',
      subtitle: 'Cybercodes & InternPe',
    },
    {
      id: 'certifications',
      label: 'Professional Certifications',
      targetValue: 2,
      suffix: '+',
      icon: Award,
      color: 'from-blue-500 to-indigo-500',
      subtitle: 'Microsoft Azure & Python',
    },
    {
      id: 'skills',
      label: 'Technical Skills Mastered',
      targetValue: 12,
      suffix: '+',
      icon: Wrench,
      color: 'from-amber-500 to-orange-500',
      subtitle: 'Languages, DBs & UITools',
    },
    {
      id: 'degree',
      label: 'Ongoing Engineering B.E.',
      targetValue: 2027,
      suffix: '',
      icon: GraduationCap,
      color: 'from-rose-500 to-pink-500',
      subtitle: 'Graduation Year, SNS Tech',
    },
  ];

  // Simple stateful counter animation hook
  const [counts, setCounts] = useState<Record<string, number>>({
    internships: 0,
    certifications: 0,
    skills: 0,
    degree: 1900,
  });

  useEffect(() => {
    const duration = 1200; // ms for animation to complete
    const steps = 30;
    const stepTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setCounts((prev) => {
        const next = { ...prev };
        statConfig.forEach((stat) => {
          const startVal = stat.id === 'degree' ? 1900 : 0;
          const delta = (stat.targetValue - startVal) / steps;
          const currentVal = Math.floor(startVal + delta * stepCount);
          next[stat.id] = Math.min(currentVal, stat.targetValue);
        });
        return next;
      });

      if (stepCount >= steps) {
        clearInterval(timer);
        // Force exact targets at the end
        setCounts({
          internships: 2,
          certifications: 2,
          skills: 12,
          degree: 2027,
        });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const borderAccentClass = {
    blue: 'hover:border-blue-500/40 hover:shadow-blue-500/5',
    emerald: 'hover:border-emerald-500/40 hover:shadow-emerald-500/5',
    indigo: 'hover:border-indigo-500/40 hover:shadow-indigo-500/5',
    amber: 'hover:border-amber-500/40 hover:shadow-amber-500/5',
    rose: 'hover:border-rose-500/40 hover:shadow-rose-500/5',
  }[accentColor] || 'hover:border-blue-500/40';

  const textAccentClass = {
    blue: 'text-blue-500',
    emerald: 'text-emerald-500',
    indigo: 'text-indigo-500',
    amber: 'text-amber-500',
    rose: 'text-rose-500',
  }[accentColor] || 'text-blue-500';

  return (
    <section className="py-12 bg-gray-50/50 dark:bg-gray-950/20 border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statConfig.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl bg-white dark:bg-[#0a0a0a]/40 border border-gray-100 dark:border-white/10 shadow-sm flex flex-col items-center sm:items-start text-center sm:text-left transition-all ${borderAccentClass}`}
              >
                {/* Stat Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} p-2 text-white flex items-center justify-center shadow-sm mb-4`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Animated Value */}
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl sm:text-4xl font-black italic text-gray-950 dark:text-white tracking-tighter">
                    {counts[stat.id] < 10 && stat.id !== 'degree' ? `0${counts[stat.id]}` : counts[stat.id]}
                  </span>
                  <span className={`text-2xl font-black italic tracking-tighter ${textAccentClass}`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Labels */}
                <p className="text-[10px] font-mono text-gray-400 dark:text-white/40 uppercase tracking-widest mt-3">
                  {stat.label}
                </p>
                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">
                  {stat.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
