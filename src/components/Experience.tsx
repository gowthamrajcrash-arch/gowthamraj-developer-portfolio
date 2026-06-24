import { useState } from 'react';
import { Calendar, MapPin, Briefcase, GraduationCap, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Internship, Education } from '../types';

interface ExperienceProps {
  accentColor: string;
}

export default function Experience({ accentColor }: ExperienceProps) {
  const internships: Internship[] = [
    {
      id: 'internpe',
      company: 'InternPe',
      role: 'Web Development Intern',
      duration: 'June 2025 – July 2025',
      responsibilities: [
        'Mastered Web Development fundamentals, creating layouts with HTML, CSS, and interactive client logic in JavaScript.',
        'Engineered responsive web applications and frontend mini projects with cross-browser compatibility.',
        'Conducted complete code debugging, logic validation, and system optimization.',
        'Practiced modern frontend paradigms and collaborative code integration.',
      ],
      skills: ['Web Development', 'Frontend', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Debugging'],
      icon: 'web',
    },
    {
      id: 'cybercodes',
      company: 'Cybercodes',
      role: 'Python Intern',
      duration: 'July 2024 – August 2024',
      responsibilities: [
        'Engineered complex Python backend scripts for automation, data processing, and terminal workflows.',
        'Executed logical reasoning exercises and modular coding principles to debug existing scripts.',
        'Gained hands-on experience in structured software development life cycles and clean testing models.',
        'Integrated basic database queries and object-oriented architectures.',
      ],
      skills: ['Python Programming', 'Software Development', 'Debugging', 'Logical Reasoning', 'SQL'],
      icon: 'python',
    },
  ];

  const education: Education[] = [
    {
      id: 'sns',
      institution: 'SNS College of Technology',
      degree: 'Bachelor of Engineering (B.E.)',
      field: 'Computer Science and Engineering',
      duration: '2023 – 2027',
      location: 'Coimbatore, Tamil Nadu',
      achievements: [
        'Actively learning Advanced Data Structures, Relational Database Management Systems, and Python Object Oriented Programming.',
        'Participating in campus developer clubs, tech hackathons, and collaborative software projects.',
        'Maintaining strong core conceptual foundations in Computer Science engineering practices.',
      ],
      icon: 'college',
    },
    {
      id: 'srk',
      institution: 'SRK Matriculation Higher Secondary School',
      degree: 'Higher Secondary Education (HSC)',
      field: 'Science & Computer Science Domain',
      duration: 'Completed 2023',
      location: 'Tamil Nadu, India',
      achievements: [
        'Graduated with excellent scores in Mathematics, Physics, Chemistry, and Computer Science.',
        'Discovered a deep passion for computer science programming concepts and logic development.',
      ],
      icon: 'school',
    },
  ];

  const [activeTab, setActiveTab] = useState<'internships' | 'education'>('internships');

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

  const lineAccentClass = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  }[accentColor] || 'bg-blue-500';

  const pillAccentClass = {
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30',
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/30',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/30',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/30',
  }[accentColor] || 'bg-blue-500/10 text-blue-600';

  return (
    <section id="timeline" className="py-24 bg-gray-50/50 dark:bg-gray-950/20 border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-500 dark:text-white/40 block mb-2">
            [ CAREER_&_ACADEMIC_CHRONOLOGY ]
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-950 dark:text-white mt-3">
            Journey & Experience
          </h2>
          <p className="text-base text-gray-600 dark:text-white/70 font-light leading-relaxed max-w-xl mx-auto mt-2">
            Explore my professional training periods, work as an intern, and formal computer science engineering background.
          </p>

          {/* Toggle Tabs */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl border border-gray-200/50 dark:border-gray-800/50">
              <button
                onClick={() => setActiveTab('internships')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                  activeTab === 'internships'
                    ? `${bgAccentClass} text-white shadow-sm`
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Professional Internships</span>
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                  activeTab === 'education'
                    ? `${bgAccentClass} text-white shadow-sm`
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Educational Milestones</span>
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 pl-6 sm:pl-8 ml-4 mt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'internships' ? (
              <motion.div
                key="internships"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.35 }}
                className="space-y-12"
              >
                {internships.map((intern, idx) => (
                  <div key={intern.id} className="relative group">
                    {/* Timeline Node Icon */}
                    <span className={`absolute -left-[43px] sm:-left-[51px] top-1 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 ${lineAccentClass}`}>
                      <Briefcase className="w-4.5 h-4.5" />
                    </span>

                    {/* Timeline Card */}
                    <div className="bg-white dark:bg-[#0a0a0a]/50 p-6 rounded-3xl border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-900 pb-3 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-950 dark:text-white">
                            {intern.role}
                          </h3>
                          <p className={`text-sm font-semibold ${textAccentClass}`}>
                            {intern.company}
                          </p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end text-xs font-mono text-gray-500 dark:text-gray-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {intern.duration}
                          </span>
                        </div>
                      </div>

                      {/* Bullet Point Responsibilities */}
                      <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
                        {intern.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex gap-2.5 items-start">
                            <ArrowRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${textAccentClass}`} />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Badges */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {intern.skills.map((skill) => (
                          <span key={skill} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono ${pillAccentClass}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.35 }}
                className="space-y-12"
              >
                {education.map((edu, idx) => (
                  <div key={edu.id} className="relative group">
                    {/* Timeline Node Icon */}
                    <span className={`absolute -left-[43px] sm:-left-[51px] top-1 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 ${lineAccentClass}`}>
                      <GraduationCap className="w-4.5 h-4.5" />
                    </span>

                    {/* Timeline Card */}
                    <div className="bg-white dark:bg-[#0a0a0a]/50 p-6 rounded-3xl border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-900 pb-3 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-950 dark:text-white">
                            {edu.degree}
                          </h3>
                          <p className={`text-sm font-semibold ${textAccentClass}`}>
                            {edu.institution}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {edu.field}
                          </p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end text-xs font-mono text-gray-500 dark:text-gray-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {edu.duration}
                          </span>
                          <span className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {edu.location}
                          </span>
                        </div>
                      </div>

                      {/* Achievements/Bullet points */}
                      {edu.achievements && (
                        <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
                          {edu.achievements.map((ach, aIdx) => (
                            <li key={aIdx} className="flex gap-2.5 items-start">
                              <BookOpen className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${textAccentClass}`} />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
