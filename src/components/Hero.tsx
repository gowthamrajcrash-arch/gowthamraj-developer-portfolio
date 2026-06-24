import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, FileText, Sparkles, Code2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  accentColor: string;
}

export default function Hero({ accentColor }: HeroProps) {
  const roles = [
    'Software Developer',
    'Python Developer',
    'Web Developer',
    'Computer Science Student',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Auto-typing text carousel effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting characters
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const accentColorClass = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30',
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100/50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/30',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/30',
  }[accentColor] || 'text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30';

  const accentBgClass = {
    blue: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20',
    indigo: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20',
    amber: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20',
    rose: 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20',
  }[accentColor] || 'bg-blue-600';

  const borderAccentClass = {
    blue: 'border-blue-600/20 dark:border-blue-500/10 focus:border-blue-500',
    emerald: 'border-emerald-600/20 dark:border-emerald-500/10 focus:border-emerald-500',
    indigo: 'border-indigo-600/20 dark:border-indigo-500/10 focus:border-indigo-500',
    amber: 'border-amber-500/20 dark:border-amber-500/10 focus:border-amber-500',
    rose: 'border-rose-600/20 dark:border-rose-500/10 focus:border-rose-500',
  }[accentColor] || 'border-blue-600/20';

  const dotAccentClass = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600',
    indigo: 'bg-indigo-600',
    amber: 'bg-amber-500',
    rose: 'bg-rose-600',
  }[accentColor] || 'bg-blue-600';

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-radial-glow dark:bg-none print:min-h-0 print:p-0 print:flex-none print:block print:overflow-visible print:bg-none"
    >
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-blue-300/10 dark:bg-blue-950/5 blur-3xl pointer-events-none print:hidden" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-emerald-300/15 dark:bg-emerald-950/5 blur-3xl pointer-events-none print:hidden" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 print:hidden">
        
        {/* Left Side: Brand Text & Pitch */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider font-semibold flex items-center gap-2 ${accentColorClass}`}
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>AVAILABLE FOR INTERNSHIPS & JUNIOR ROLES</span>
          </motion.div>

          <div className="text-gray-400 dark:text-white/40 text-xs font-mono mb-1 tracking-widest uppercase">[ ENGINEER_DESIGNER_PORTFOLIO ]</div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-[80px] leading-[0.85] font-black uppercase tracking-tighter text-gray-950 dark:text-white"
          >
            Gowtham<br />Raj B
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center text-xl sm:text-2xl font-mono text-gray-700 dark:text-gray-300 font-bold"
          >
            <span className="mr-2">I build as a</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 relative">
              {currentText}
              <span className={`inline-block w-1 h-5 ml-1 ${dotAccentClass} animate-pulse`} />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-700 dark:text-white/70 font-light leading-relaxed max-w-xl"
          >
            Detail-oriented software developer specializing in Python and Web architectures. Crafting innovative solutions through engineering precision.
          </motion.p>

          {/* Quick Contact Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-lg text-xs font-mono text-gray-500 dark:text-gray-400 mt-2"
          >
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Coimbatore, TN, India</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <Mail className="w-4 h-4 text-gray-400" />
              <a href="mailto:gowthamrajcrash@gmail.com" className="hover:underline transition-all">
                gowthamrajcrash@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <Phone className="w-4 h-4 text-gray-400" />
              <a href="tel:+919597528029" className="hover:underline transition-all">
                +91 9597528029
              </a>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <Code2 className="w-4 h-4 text-gray-400" />
              <span>B.E. CSE (2023 – 2027)</span>
            </div>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3.5 w-full mt-4"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className={`px-6 py-3.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer ${accentBgClass}`}
            >
              <span>Explore Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowResumeModal(true)}
              className="px-6 py-3.5 rounded-xl text-xs font-bold bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume (ATS)</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side: Interactive Visual Card */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className={`w-full max-w-sm rounded-3xl overflow-hidden glass-panel p-6 shadow-xl relative border ${borderAccentClass}`}
          >
            {/* Top Apple-styled Bar */}
            <div className="flex items-center justify-between border-b border-gray-200/50 dark:border-gray-800/50 pb-4 mb-5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                DEVELOPER_CARD.JSON
              </span>
            </div>

            {/* Profile Graphic Block */}
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="relative group">
                <div className={`absolute -inset-1 rounded-full opacity-60 blur group-hover:opacity-80 transition duration-1000 group-hover:duration-200 bg-gradient-to-r from-emerald-500 to-indigo-500`} />
                <div className="relative w-28 h-28 rounded-full bg-gray-50 dark:bg-gray-950 border-2 border-white dark:border-gray-800 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://github.com/gowthamrajcrash-arch.png"
                    alt="Gowtham Raj B"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // fallback to initials if avatar is not fetched or network offline
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="absolute font-extrabold text-3xl text-gray-800 dark:text-gray-100 z-[-1]">GB</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-950 dark:text-white">Gowtham Raj B</h3>
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">Coimbatore, Tamil Nadu, India</p>
              </div>

              {/* Status Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center mt-2 max-w-xs">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100/70 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30 font-mono">
                  Python Intern
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100/70 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/30 font-mono">
                  Web Dev Intern
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100/70 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30 font-mono">
                  B.E. CSE Student
                </span>
              </div>
            </div>

            {/* Tech Stack Mini Visual */}
            <div className="mt-4 border-t border-gray-200/50 dark:border-gray-800/50 pt-4 text-left">
              <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-2.5">
                CORE_TECHNOLOGIES
              </p>
              <div className="grid grid-cols-3 gap-2">
                {['Python', 'C++', 'SQL', 'MongoDB', 'JavaScript', 'Tailwind'].map((tech) => (
                  <div key={tech} className="bg-gray-100/50 dark:bg-gray-950/50 border border-gray-200/50 dark:border-gray-800/50 rounded-lg p-2 flex flex-col items-center justify-center gap-1">
                    <span className="text-[10px] font-mono font-bold text-gray-700 dark:text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive ATS Resume Preview Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 print:relative print:inset-auto print:z-0 print:p-0 print:bg-white print:block print:overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-950 rounded-2xl max-w-3xl w-full border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden print:bg-white print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full print:overflow-visible"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-900/50 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className={`w-5 h-5 ${currentText.includes('Python') ? 'text-emerald-500' : 'text-blue-500'}`} />
                <span className="font-bold text-gray-900 dark:text-white">Gowtham_Raj_Resume.pdf</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:gowthamrajcrash@gmail.com"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg text-white ${accentBgClass} flex items-center gap-1.5`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Gowtham</span>
                </a>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  <XIcon className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Resume Content (ATS Optimized, Clean Preview) */}
            <div className="p-8 max-h-[70vh] overflow-y-auto text-left font-sans bg-white text-gray-900 select-all selection:bg-blue-100 print:max-h-none print:overflow-visible print:p-0 print:text-black print:bg-white">
              {/* Header */}
              <div className="text-center border-b pb-6">
                <h1 className="text-3xl font-extrabold text-black tracking-tight">GOWTHAM RAJ B</h1>
                <p className="text-sm font-semibold text-gray-700 tracking-wide mt-1">
                  Software Developer | Python & Web Specialist | B.E. CSE Student
                </p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-2.5 font-mono">
                  <span>Tamil Nadu, India</span>
                  <span>•</span>
                  <a href="tel:+919597528029" className="hover:underline">+91 9597528029</a>
                  <span>•</span>
                  <a href="mailto:gowthamrajcrash@gmail.com" className="hover:underline">gowthamrajcrash@gmail.com</a>
                  <span>•</span>
                  <a href="https://www.linkedin.com/in/bgowthamraj" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn: Gowtham Raj</a>
                </div>
              </div>

              {/* Education */}
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b pb-1">EDUCATION</h3>
                <div className="mt-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">SNS COLLEGE OF TECHNOLOGY</h4>
                      <p className="text-xs text-gray-700 font-medium">Bachelor of Engineering in Computer Science and Engineering</p>
                    </div>
                    <div className="text-right text-xs font-semibold text-gray-600">
                      <span>2023 – 2027</span>
                      <br />
                      <span>Coimbatore, India</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">SRK MATRICULATION HIGHER SECONDARY SCHOOL</h4>
                      <p className="text-xs text-gray-700 font-medium">Higher Secondary Education (HSC)</p>
                    </div>
                    <div className="text-right text-xs font-semibold text-gray-600">
                      <span>Completed 2023</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Internships */}
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b pb-1">PROFESSIONAL EXPERIENCE</h3>
                
                <div className="mt-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">CYBERCODES</h4>
                      <p className="text-xs text-gray-700 font-medium">Python Development Intern</p>
                    </div>
                    <div className="text-right text-xs font-semibold text-gray-600">
                      <span>July 2024 – August 2024</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-700 mt-2 space-y-1 pl-1">
                    <li>Developed core programming concepts using Python for enterprise tasks.</li>
                    <li>Executed comprehensive testing, modular coding practices, and structured debugging of code.</li>
                    <li>Utilized SQL databases to connect backend systems and log outputs.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">INTERNPE</h4>
                      <p className="text-xs text-gray-700 font-medium">Web Development Intern</p>
                    </div>
                    <div className="text-right text-xs font-semibold text-gray-600">
                      <span>June 2025 – July 2025</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-700 mt-2 space-y-1 pl-1">
                    <li>Built dynamic web interfaces utilizing HTML5, CSS3, and JavaScript.</li>
                    <li>Created responsive frontend pages, mini projects, and integrated debugging protocols.</li>
                    <li>Worked alongside experienced mentors on core client development practices.</li>
                  </ul>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b pb-1">TECHNICAL SKILLS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-3 text-xs text-gray-700">
                  <p><strong>Languages:</strong> Python, C++, SQL, HTML, CSS, JavaScript</p>
                  <p><strong>Database & Storage:</strong> MongoDB, SQL, Firebase</p>
                  <p><strong>UI/UX Design:</strong> Figma, Wireframing, App Mockups</p>
                  <p><strong>Tools & Version Control:</strong> VS Code, Git, GitHub, Microsoft Office</p>
                  <p><strong>Methodologies:</strong> Problem Solving, Debugging, Logic Building</p>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b pb-1">CERTIFICATIONS</h3>
                <ul className="list-disc list-inside text-xs text-gray-700 mt-3 space-y-1">
                  <li><strong>Microsoft Certified: Azure AI Fundamentals</strong> — Learned Core AI, Machine Learning, Computer Vision, and Natural Language Processing.</li>
                  <li><strong>Python for Software Development (IMAGECON Academy)</strong> — Advanced concepts including SQL, MongoDB, Tkinter GUI, and Software Principles.</li>
                </ul>
              </div>

              {/* Projects */}
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b pb-1">SELECTED PROJECTS</h3>
                <div className="mt-3">
                  <h4 className="font-bold text-xs text-gray-900">Student Management System <span className="font-normal text-gray-600 font-mono">(Python, SQL)</span></h4>
                  <p className="text-xs text-gray-700 mt-1">Built modular records manager for registering student data, integrated search tools, and relational SQL backend querying.</p>
                </div>
                <div className="mt-3">
                  <h4 className="font-bold text-xs text-gray-900">Employee Management System <span className="font-normal text-gray-600 font-mono">(Python, MongoDB)</span></h4>
                  <p className="text-xs text-gray-700 mt-1">Engineered dynamic enterprise database tool executing complete CRUD operations, user metrics, and document-level sorting.</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-900 flex justify-end gap-3 print:hidden">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Print Resume
              </button>
              <button
                onClick={() => setShowResumeModal(false)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold text-white ${accentBgClass}`}
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

// Small helper for Close Button
function XIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
