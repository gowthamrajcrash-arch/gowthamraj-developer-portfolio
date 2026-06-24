import { useState, FormEvent } from 'react';
import { ExternalLink, Github, Search, Code, Cpu, ChevronDown, ChevronUp, UserPlus, Trash2, Sparkles, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectsProps {
  accentColor: string;
}

export default function Projects({ accentColor }: ProjectsProps) {
  const projectsData: Project[] = [
    {
      id: 'student-sys',
      title: 'Student Management System',
      tech: ['Python', 'SQL', 'SQLite', 'Tkinter'],
      features: ['Student Enrollment Records', 'Dynamic Database Queries', 'Search & Filtering'],
      description: 'A modular database application for recording student enrollments, logging attendance data, querying academic details, and managing structured academic records via robust relational queries.',
      category: 'Python',
      complexity: 4,
      mockImageUrl: '',
    },
    {
      id: 'employee-sys',
      title: 'Employee Management System',
      tech: ['Python', 'MongoDB', 'Tkinter', 'PyMongo'],
      features: ['Employee Records Log', 'Complete CRUD Engine', 'Analytical Reporting'],
      description: 'An enterprise management terminal supporting complete document-level CRUD actions, departmental indexing, and interactive CSV reporting outputs powered by non-relational databases.',
      category: 'Python',
      complexity: 4.5,
      mockImageUrl: '',
    },
    {
      id: 'portfolio-web',
      title: 'Premium Portfolio Website',
      tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      features: ['Apple Glassmorphism UI', 'Live GitHub API Syncing', 'Aesthetic Animation Paths'],
      description: 'A responsive developer portfolio featuring customizable accent color palettes, direct public GitHub repositories querying, real-time counter counters, and interactive mock dashboards.',
      category: 'Web',
      complexity: 5,
      mockImageUrl: '',
    },
    {
      id: 'ai-chatbot',
      title: 'NLP Conversational Chatbot',
      tech: ['Python', 'NLTK', 'Regex', 'Natural Language Processing'],
      features: ['Human-like Interaction', 'Context-aware responses', 'Text Pattern Processing'],
      description: 'A terminal-based automated interaction bot leveraging NLTK libraries, custom tokenization models, and rule-based regular expressions to provide fast, relevant user support.',
      category: 'AI',
      complexity: 4.2,
      mockImageUrl: '',
    },
    {
      id: 'task-mgr',
      title: 'Desktop Task Planner',
      tech: ['Python', 'JSON Storage', 'Tkinter GUI'],
      features: ['Time Tracking', 'Productivity Metrics', 'Local Schedule Backup'],
      description: 'A lightweight schedule-tracking terminal facilitating daily task completions, progress meters, productivity diagnostics, and visual status checks.',
      category: 'Python',
      complexity: 3.5,
      mockImageUrl: '',
    },
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'Python' | 'Web' | 'AI'>('all');

  // MOCK INTERACTION STATES (for interactive mini simulators)
  // Student Sys
  const [mockStudents, setMockStudents] = useState([
    { id: '101', name: 'Arun Kumar', course: 'B.E. CSE', phone: '+91 98765 43210' },
    { id: '102', name: 'Divya S', course: 'B.E. ECE', phone: '+91 87654 32109' },
  ]);
  const [studentInput, setStudentInput] = useState({ name: '', course: '', phone: '' });
  const [studentSearch, setStudentSearch] = useState('');

  // Employee Sys
  const [mockEmployees, setMockEmployees] = useState([
    { empId: 'E401', name: 'Ramesh Krishnan', dept: 'Development', role: 'Python Developer' },
    { empId: 'E402', name: 'Meera Nair', dept: 'UI/UX Design', role: 'Figma Architect' },
  ]);
  const [employeeInput, setEmployeeInput] = useState({ name: '', dept: '', role: '' });

  // AI Chatbot
  const [chatbotMessages, setChatbotMessages] = useState([
    { sender: 'bot', text: "Hello! I am Gowtham's AI assistant mockup. Ask me about his Skills, Education, or Internships!" }
  ]);
  const [chatbotInput, setChatbotInput] = useState('');

  // Task Planner
  const [mockTasks, setMockTasks] = useState([
    { id: 1, title: 'Revise SQL database indexing', completed: false },
    { id: 2, title: 'Code responsive portfolio sections', completed: true },
    { id: 3, title: 'Prepare Microsoft Azure AI review notes', completed: false },
  ]);
  const [taskInput, setTaskInput] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  const bgAccentClass = {
    blue: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/10',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10',
    indigo: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10',
    amber: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10',
    rose: 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/10',
  }[accentColor] || 'bg-blue-600';

  const textAccentClass = {
    blue: 'text-blue-600 dark:text-blue-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    amber: 'text-amber-500 dark:text-amber-400',
    rose: 'text-rose-600 dark:text-rose-400',
  }[accentColor] || 'text-blue-600';

  const textHighlightClass = {
    blue: 'text-blue-500',
    emerald: 'text-emerald-500',
    indigo: 'text-indigo-500',
    amber: 'text-amber-500',
    rose: 'text-rose-500',
  }[accentColor] || 'text-blue-500';

  const borderAccentClass = {
    blue: 'border-blue-600/20 dark:border-blue-500/10 focus:border-blue-500',
    emerald: 'border-emerald-600/20 dark:border-emerald-500/10 focus:border-emerald-500',
    indigo: 'border-indigo-600/20 dark:border-indigo-500/10 focus:border-indigo-500',
    amber: 'border-amber-500/20 dark:border-amber-500/10 focus:border-amber-500',
    rose: 'border-rose-600/20 dark:border-rose-500/10 focus:border-rose-500',
  }[accentColor] || 'border-blue-600/20';

  // --- HANDLERS FOR MOCK INTERACTION DEMOS ---
  // Student Sys
  const addStudent = (e: FormEvent) => {
    e.preventDefault();
    if (!studentInput.name) return;
    const newStudent = {
      id: (100 + mockStudents.length + 1).toString(),
      name: studentInput.name,
      course: studentInput.course || 'B.E. CSE',
      phone: studentInput.phone || '+91 XXXXX XXXXX',
    };
    setMockStudents([...mockStudents, newStudent]);
    setStudentInput({ name: '', course: '', phone: '' });
  };

  const removeStudent = (id: string) => {
    setMockStudents(mockStudents.filter(s => s.id !== id));
  };

  const searchedStudents = mockStudents.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.course.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Employee Sys
  const addEmployee = (e: FormEvent) => {
    e.preventDefault();
    if (!employeeInput.name) return;
    const newEmp = {
      empId: 'E' + (400 + mockEmployees.length + 1).toString(),
      name: employeeInput.name,
      dept: employeeInput.dept || 'Engineering',
      role: employeeInput.role || 'Junior Engineer',
    };
    setMockEmployees([...mockEmployees, newEmp]);
    setEmployeeInput({ name: '', dept: '', role: '' });
  };

  const deleteEmployee = (empId: string) => {
    setMockEmployees(mockEmployees.filter(e => e.empId !== empId));
  };

  // Chatbot logic
  const handleChatbotSend = (e: FormEvent) => {
    e.preventDefault();
    if (!chatbotInput.trim()) return;

    const userMsg = { sender: 'user', text: chatbotInput };
    setChatbotMessages(prev => [...prev, userMsg]);
    const cleanInput = chatbotInput.toLowerCase();
    setChatbotInput('');

    setTimeout(() => {
      let reply = "I am a simple regex pattern bot mockup. Try typing 'skills', 'education', 'internship', or 'projects' to learn about Gowtham Raj!";
      if (cleanInput.includes('skill') || cleanInput.includes('tech')) {
        reply = "Gowtham specializes in Python Programming, Relational/Non-Relational SQL databases (MongoDB), Frontend Web Dev (React.js, Tailwind), and UI prototyping in Figma.";
      } else if (cleanInput.includes('educat') || cleanInput.includes('college') || cleanInput.includes('degree')) {
        reply = "He is currently pursuing his Bachelor of Engineering in Computer Science (B.E. CSE, 2023-2027) at SNS College of Technology in Coimbatore, Tamil Nadu.";
      } else if (cleanInput.includes('intern') || cleanInput.includes('experi')) {
        reply = "Gowtham completed two vital internships: a Python Intern role at Cybercodes (July-Aug 2024) and a Web Development Intern role at InternPe (June-July 2025).";
      } else if (cleanInput.includes('project')) {
        reply = "He has built multiple notable projects: Student and Employee Management systems, an NLP chatbot, a custom desktop Task Planner, and this premium glassmorphic React portfolio!";
      } else if (cleanInput.includes('hello') || cleanInput.includes('hi')) {
        reply = "Hello there! Thanks for visiting my interactive portfolio mockup. Feel free to type keywords like 'skills' or 'internships'.";
      }

      setChatbotMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  // Task Planner logic
  const addTask = (e: FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      title: taskInput,
      completed: false,
    };
    setMockTasks([...mockTasks, newTask]);
    setTaskInput('');
  };

  const toggleTask = (id: number) => {
    setMockTasks(mockTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center md:text-left mb-12">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-500 dark:text-white/40 block mb-2">
            [ CASE_STUDIES_&_SIMULATORS ]
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-950 dark:text-white mt-3">
            Featured Projects
          </h2>
          <p className="text-base text-gray-600 dark:text-white/70 font-light leading-relaxed max-w-2xl mt-2">
            Each project contains a fully operational <b>interactive simulator app</b>. Expand any card below to run the live code prototypes in your browser!
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-10 overflow-x-auto justify-start border-b border-gray-100 dark:border-gray-900 pb-2">
          {['all', 'Python', 'Web', 'AI'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat as any);
                setExpandedId(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all border ${
                filter === cat
                  ? `${bgAccentClass} text-white border-transparent shadow-sm`
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat === 'all' ? 'All Platforms' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="flex flex-col gap-6">
          {filteredProjects.map((project) => {
            const isExpanded = expandedId === project.id;
            return (
              <motion.div
                key={project.id}
                layout
                className={`rounded-3xl border transition-all ${
                  isExpanded
                    ? `bg-gray-50/50 dark:bg-[#0a0a0a]/70 border-gray-300 dark:border-white/20 shadow-md`
                    : 'bg-white dark:bg-[#0a0a0a]/50 border-gray-200 dark:border-white/10 shadow-sm hover:border-gray-400 dark:hover:border-white/30'
                }`}
              >
                {/* Collapsed Header Area */}
                <div
                  onClick={() => toggleExpand(project.id)}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-2 flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                        {project.category === 'Web' ? <Code className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                      </span>
                      <h3 className="text-lg font-bold text-gray-950 dark:text-white group-hover:text-blue-500 transition-colors">
                        {project.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-gray-800/50">
                        v1.0
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 max-w-2xl font-sans">
                      {project.description}
                    </p>
                    {/* Tech badging */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-emerald-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      SIMULATOR_READY
                    </span>
                    <button
                      className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Simulator Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-950/40 overflow-hidden"
                    >
                      <div className="p-6 text-left grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Specs Panel */}
                        <div className="lg:col-span-4 space-y-5">
                          <div>
                            <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1.5">
                              SYSTEM_ARCHITECTURE
                            </p>
                            <div className="space-y-1">
                              {project.features.map((feature, fIdx) => (
                                <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                                  <CheckCircle className={`w-3.5 h-3.5 ${textHighlightClass} shrink-0`} />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">
                              PROJECT_COMPLEXITY
                            </p>
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, rIdx) => (
                                <span
                                  key={rIdx}
                                  className={`w-5 h-2 rounded ${
                                    rIdx < Math.floor(project.complexity)
                                      ? 'bg-amber-400'
                                      : 'bg-gray-200 dark:bg-gray-800'
                                  }`}
                                />
                              ))}
                              <span className="text-xs font-mono font-bold text-gray-600 dark:text-gray-400 ml-1.5">
                                {project.complexity}/5
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 flex items-center justify-center gap-1.5 shadow-sm">
                              <Github className="w-4 h-4" />
                              <span>View Source</span>
                            </button>
                            <button className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white ${bgAccentClass} flex items-center justify-center gap-1.5`}>
                              <ExternalLink className="w-4 h-4" />
                              <span>Live App</span>
                            </button>
                          </div>
                        </div>

                        {/* Interactive UI Mock Simulation Container */}
                        <div className="lg:col-span-8 flex flex-col">
                          <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-2">
                            SIMULATED_USER_INTERFACE_PREVIEW
                          </p>
                          
                          <div className="flex-1 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 overflow-hidden shadow-lg min-h-[300px]">
                            {/* Window Header */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-2.5 border-b border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between">
                              <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                              </div>
                              <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-semibold tracking-wider uppercase">
                                {project.id}.app - Gowtham Sandbox
                              </span>
                              <span className="w-4 h-4" />
                            </div>

                            {/* --- SIMULATORS --- */}
                            {project.id === 'student-sys' && (
                              /* STUDENT SYSTEM SIMULATOR */
                              <div className="p-4 flex flex-col h-full text-xs font-sans text-gray-700 dark:text-gray-300">
                                <form onSubmit={addStudent} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
                                  <input
                                    type="text"
                                    placeholder="Student Name"
                                    value={studentInput.name}
                                    onChange={(e) => setStudentInput({ ...studentInput, name: e.target.value })}
                                    className={`col-span-2 px-3 py-1.5 rounded-lg border bg-white dark:bg-gray-950 text-gray-900 dark:text-white ${borderAccentClass} focus:outline-none text-xs`}
                                  />
                                  <input
                                    type="text"
                                    placeholder="B.E. CSE"
                                    value={studentInput.course}
                                    onChange={(e) => setStudentInput({ ...studentInput, course: e.target.value })}
                                    className={`px-3 py-1.5 rounded-lg border bg-white dark:bg-gray-950 text-gray-900 dark:text-white ${borderAccentClass} focus:outline-none text-xs`}
                                  />
                                  <button
                                    type="submit"
                                    className={`px-3 py-1.5 rounded-lg text-white font-bold cursor-pointer transition-all flex items-center justify-center gap-1 text-xs ${bgAccentClass}`}
                                  >
                                    <UserPlus className="w-3.5 h-3.5" />
                                    <span>Enroll</span>
                                  </button>
                                </form>

                                {/* Search Bar */}
                                <div className="relative mb-3">
                                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                                  <input
                                    type="text"
                                    placeholder="Search student records dynamically..."
                                    value={studentSearch}
                                    onChange={(e) => setStudentSearch(e.target.value)}
                                    className={`w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-950 border rounded-lg text-xs text-gray-900 dark:text-white ${borderAccentClass} focus:outline-none`}
                                  />
                                </div>

                                {/* Table Layout */}
                                <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden flex-1 max-h-[160px] overflow-y-auto">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 text-[10px] font-mono text-gray-400 dark:text-gray-500">
                                        <th className="p-2 pl-3">ID</th>
                                        <th className="p-2">NAME</th>
                                        <th className="p-2">COURSE</th>
                                        <th className="p-2 text-right pr-3">ACTION</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                                      {searchedStudents.map((s) => (
                                        <tr key={s.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                                          <td className="p-2 pl-3 font-mono font-bold text-gray-400">{s.id}</td>
                                          <td className="p-2 font-semibold text-gray-900 dark:text-white">{s.name}</td>
                                          <td className="p-2 font-medium">{s.course}</td>
                                          <td className="p-2 text-right pr-3">
                                            <button
                                              onClick={() => removeStudent(s.id)}
                                              className="p-1 rounded-md text-red-500 hover:bg-red-500/10"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {project.id === 'employee-sys' && (
                              /* EMPLOYEE MONGODB CRUD SIMULATOR */
                              <div className="p-4 flex flex-col h-full text-xs font-sans text-gray-700 dark:text-gray-300">
                                <form onSubmit={addEmployee} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
                                  <input
                                    type="text"
                                    placeholder="Employee Name"
                                    value={employeeInput.name}
                                    onChange={(e) => setEmployeeInput({ ...employeeInput, name: e.target.value })}
                                    className={`col-span-2 px-3 py-1.5 rounded-lg border bg-white dark:bg-gray-950 text-gray-900 dark:text-white ${borderAccentClass} focus:outline-none text-xs`}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Dept (e.g. Sales)"
                                    value={employeeInput.dept}
                                    onChange={(e) => setEmployeeInput({ ...employeeInput, dept: e.target.value })}
                                    className={`px-3 py-1.5 rounded-lg border bg-white dark:bg-gray-950 text-gray-900 dark:text-white ${borderAccentClass} focus:outline-none text-xs`}
                                  />
                                  <button
                                    type="submit"
                                    className={`px-3 py-1.5 rounded-lg text-white font-bold cursor-pointer transition-all flex items-center justify-center gap-1 text-xs ${bgAccentClass}`}
                                  >
                                    <UserPlus className="w-3.5 h-3.5" />
                                    <span>Add Doc</span>
                                  </button>
                                </form>

                                {/* MongoDB Schema visualizer */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1">
                                  {/* Left list */}
                                  <div className="md:col-span-7 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden max-h-[160px] overflow-y-auto">
                                    <div className="bg-gray-50 dark:bg-gray-950 px-3 py-1.5 border-b border-gray-200 dark:border-gray-800 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                                      COLLECTION: employees
                                    </div>
                                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                      {mockEmployees.map((e) => (
                                        <div key={e.empId} className="p-2.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900">
                                          <div>
                                            <p className="font-bold text-gray-900 dark:text-white text-xs">{e.name}</p>
                                            <p className="text-[10px] text-gray-500 font-medium">{e.dept} • {e.role || 'Software Intern'}</p>
                                          </div>
                                          <button
                                            onClick={() => deleteEmployee(e.empId)}
                                            className="p-1 rounded-md text-red-500 hover:bg-red-500/10"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Right document JSON visualizer */}
                                  <div className="md:col-span-5 bg-gray-950 rounded-xl p-3 border border-gray-800 max-h-[160px] overflow-y-auto">
                                    <div className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                      MONGODB_DOCUMENT_PREVIEW
                                    </div>
                                    <pre className="text-[10px] font-mono text-emerald-400 whitespace-pre-wrap text-left leading-relaxed">
                                      {JSON.stringify(mockEmployees, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            )}

                            {project.id === 'portfolio-web' && (
                              /* PORTFOLIO DEMO */
                              <div className="p-4 flex flex-col items-center justify-center h-full text-center text-xs text-gray-600 dark:text-gray-400">
                                <div className="space-y-4 max-w-sm">
                                  <div className="inline-flex p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-full text-indigo-500">
                                    <Sparkles className="w-6 h-6 animate-pulse" />
                                  </div>
                                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                                    Recursion Dashboard!
                                  </h4>
                                  <p className="text-xs">
                                    You are currently exploring Gowtham Raj's Portfolio Website in real-time. Feel free to toggle the floating palette in the navigation bar to alter theme accents instantly!
                                  </p>
                                  <div className="flex justify-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                  </div>
                                </div>
                              </div>
                            )}

                            {project.id === 'ai-chatbot' && (
                              /* AI CHATBOT REGEX SIMULATOR */
                              <div className="p-4 flex flex-col h-full text-xs font-sans text-gray-700 dark:text-gray-300">
                                {/* Chat Log */}
                                <div className="flex-1 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-3 overflow-y-auto max-h-[150px] space-y-2 mb-3">
                                  {chatbotMessages.map((msg, mIdx) => (
                                    <div
                                      key={mIdx}
                                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <div
                                        className={`px-3 py-2 rounded-xl max-w-[80%] text-left text-xs ${
                                          msg.sender === 'user'
                                            ? `${bgAccentClass} text-white`
                                            : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200'
                                        }`}
                                      >
                                        {msg.text}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Send Bar */}
                                <form onSubmit={handleChatbotSend} className="flex gap-1.5">
                                  <input
                                    type="text"
                                    placeholder="Type 'skills', 'projects', or 'experience'..."
                                    value={chatbotInput}
                                    onChange={(e) => setChatbotInput(e.target.value)}
                                    className={`flex-1 px-3 py-2 bg-white dark:bg-gray-950 border rounded-lg text-xs text-gray-900 dark:text-white ${borderAccentClass} focus:outline-none`}
                                  />
                                  <button
                                    type="submit"
                                    className={`px-3.5 py-2 rounded-lg text-white font-bold cursor-pointer transition-all flex items-center justify-center ${bgAccentClass}`}
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                  </button>
                                </form>
                              </div>
                            )}

                            {project.id === 'task-mgr' && (
                              /* TASK MANAGEMENT SIMULATOR */
                              <div className="p-4 flex flex-col h-full text-xs font-sans text-gray-700 dark:text-gray-300">
                                <form onSubmit={addTask} className="flex gap-1.5 mb-3">
                                  <input
                                    type="text"
                                    placeholder="Add task to your daily list..."
                                    value={taskInput}
                                    onChange={(e) => setTaskInput(e.target.value)}
                                    className={`flex-1 px-3 py-1.5 bg-white dark:bg-gray-950 border rounded-lg text-xs text-gray-900 dark:text-white ${borderAccentClass} focus:outline-none`}
                                  />
                                  <button
                                    type="submit"
                                    className={`px-3.5 py-1.5 rounded-lg text-white font-bold cursor-pointer transition-all flex items-center justify-center ${bgAccentClass}`}
                                  >
                                    Add Task
                                  </button>
                                </form>

                                {/* Scroll Task List */}
                                <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden max-h-[140px] overflow-y-auto flex-1">
                                  {mockTasks.map((task) => (
                                    <div
                                      key={task.id}
                                      onClick={() => toggleTask(task.id)}
                                      className="p-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={task.completed}
                                        readOnly
                                        className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                                      />
                                      <span className={`text-xs ${task.completed ? 'line-through text-gray-400 dark:text-gray-500 font-medium' : 'text-gray-850 dark:text-gray-200 font-semibold'}`}>
                                        {task.title}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
