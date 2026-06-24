import { useState, useEffect, FormEvent } from 'react';
import { Mail, Linkedin, Github, Phone, MapPin, Send, CheckCircle2, History, Trash2, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

interface ContactProps {
  accentColor: string;
}

export default function Contact({ accentColor }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [messageLogs, setMessageLogs] = useState<ContactMessage[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  // Load local message cache on startup
  useEffect(() => {
    const saved = localStorage.getItem('gwr_contact_messages');
    if (saved) {
      try {
        setMessageLogs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!form.name.trim()) tempErrors.name = 'Full name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Invalid email address format';
    }
    if (!form.subject.trim()) tempErrors.subject = 'Subject line is required';
    if (!form.message.trim()) tempErrors.message = 'Message body is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Compile message object
    const newMessage: ContactMessage = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      timestamp: new Date().toLocaleString(),
    };

    // Save locally
    const updated = [newMessage, ...messageLogs];
    setMessageLogs(updated);
    localStorage.setItem('gwr_contact_messages', JSON.stringify(updated));

    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});

    // Auto clear success notice
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const clearLogs = () => {
    setMessageLogs([]);
    localStorage.removeItem('gwr_contact_messages');
  };

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

  const borderAccentClass = {
    blue: 'border-blue-600/20 dark:border-blue-500/10 focus:border-blue-500 focus:ring-blue-500/20',
    emerald: 'border-emerald-600/20 dark:border-emerald-500/10 focus:border-emerald-500 focus:ring-emerald-500/20',
    indigo: 'border-indigo-600/20 dark:border-indigo-500/10 focus:border-indigo-500 focus:ring-indigo-500/20',
    amber: 'border-amber-500/20 dark:border-amber-500/10 focus:border-amber-500 focus:ring-amber-500/20',
    rose: 'border-rose-600/20 dark:border-rose-500/10 focus:border-rose-500 focus:ring-rose-500/20',
  }[accentColor] || 'border-blue-600/20';

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 dark:bg-indigo-950/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-500 dark:text-white/40 block mb-2">
            [ CONTACT_ESTABLISH_COMMUNICATION ]
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-950 dark:text-white mt-3">
            Connect With Me
          </h2>
          <p className="text-base text-gray-600 dark:text-white/70 font-light leading-relaxed max-w-xl mx-auto mt-2">
            Have a project, internship vacancy, or simply want to say hello? Drop a line in the form below or find me on social handles.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Quick Connect & Info Column (Left Side) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 text-left">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-950 dark:text-white">
                Contact Information
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Feel free to contact me via email or phone. I usually respond within 24 hours.
              </p>

              {/* Detail list */}
              <div className="space-y-4">
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-150 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50">
                  <span className={`p-2 rounded-xl bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400 shadow-sm border border-gray-100 dark:border-gray-800`}>
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="text-xs">
                    <p className="font-bold text-gray-400 font-mono uppercase tracking-wider text-[9px]">Direct Email</p>
                    <a href="mailto:gowthamrajcrash@gmail.com" className="font-semibold text-gray-900 dark:text-white hover:underline transition-all">
                      gowthamrajcrash@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-150 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50">
                  <span className={`p-2 rounded-xl bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400 shadow-sm border border-gray-100 dark:border-gray-800`}>
                    <Phone className="w-4 h-4" />
                  </span>
                  <div className="text-xs">
                    <p className="font-bold text-gray-400 font-mono uppercase tracking-wider text-[9px]">Mobile Phone</p>
                    <a href="tel:+919597528029" className="font-semibold text-gray-900 dark:text-white hover:underline transition-all">
                      +91 9597528029
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-150 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50">
                  <span className={`p-2 rounded-xl bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400 shadow-sm border border-gray-100 dark:border-gray-800`}>
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div className="text-xs">
                    <p className="font-bold text-gray-400 font-mono uppercase tracking-wider text-[9px]">Home Base</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connector Row */}
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-900/60">
              <p className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest">
                EXTERNAL_RESOURCES
              </p>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <a
                  href="mailto:gowthamrajcrash@gmail.com"
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-950 text-gray-700 dark:text-gray-300 transition-all font-semibold shadow-sm"
                >
                  <Mail className="w-4 h-4 shrink-0 text-red-500" />
                  <span>Email</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/bgowthamraj"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-950 text-gray-700 dark:text-gray-300 transition-all font-semibold shadow-sm"
                >
                  <Linkedin className="w-4 h-4 shrink-0 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/gowthamrajcrash-arch"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-950 text-gray-700 dark:text-gray-300 transition-all font-semibold shadow-sm"
                >
                  <Github className="w-4 h-4 shrink-0 text-gray-900 dark:text-white" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form and logs Column (Right Side) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* The actual Contact form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0a0a0a]/50 border border-gray-200 dark:border-white/10 shadow-sm relative overflow-hidden text-left">
              
              <h3 className="text-xl font-bold text-gray-950 dark:text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider pl-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="Gowtham Raj"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-3.5 py-3 rounded-xl bg-white dark:bg-gray-950 border text-xs text-gray-900 dark:text-white transition-all outline-none ${
                        errors.name ? 'border-red-500' : borderAccentClass
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold font-mono pl-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider pl-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="gowthamrajcrash@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-3.5 py-3 rounded-xl bg-white dark:bg-gray-950 border text-xs text-gray-900 dark:text-white transition-all outline-none ${
                        errors.email ? 'border-red-500' : borderAccentClass
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-semibold font-mono pl-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider pl-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Inquiry regarding python roles"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl bg-white dark:bg-gray-950 border text-xs text-gray-900 dark:text-white transition-all outline-none ${
                      errors.subject ? 'border-red-500' : borderAccentClass
                    }`}
                  />
                  {errors.subject && <p className="text-[10px] text-red-500 font-semibold font-mono pl-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider pl-1">Message Body</label>
                  <textarea
                    rows={4}
                    placeholder="Type your core message here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl bg-white dark:bg-gray-950 border text-xs text-gray-900 dark:text-white transition-all outline-none resize-none ${
                      errors.message ? 'border-red-500' : borderAccentClass
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-semibold font-mono pl-1">{errors.message}</p>}
                </div>

                {/* Submit action */}
                <div className="flex items-center justify-between pt-2">
                  
                  {/* Local log button toggler */}
                  {messageLogs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowLogs(!showLogs)}
                      className="text-[10px] font-mono font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>{showLogs ? 'Hide message cache' : `Show cache (${messageLogs.length})`}</span>
                    </button>
                  )}
                  {messageLogs.length === 0 && <div />}

                  <button
                    type="submit"
                    className={`px-5 py-3 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-all duration-300 hover:scale-103 cursor-pointer ${bgAccentClass}`}
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Success state dialog */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-950 dark:text-white">Message Logged!</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mt-1.5">
                      Your message has been logged successfully into Gowtham's local sandbox message cache database!
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className={`mt-5 px-4 py-2 rounded-xl text-xs font-semibold text-white ${bgAccentClass}`}
                    >
                      Back to Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MESSAGE HISTORY DRAWER (Visible if showLogs is active) */}
            <AnimatePresence>
              {showLogs && messageLogs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="p-5 rounded-3xl border border-gray-150 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50 text-left"
                >
                  <div className="flex items-center justify-between border-b border-gray-200/50 dark:border-gray-800/50 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-bold text-gray-950 dark:text-white font-mono uppercase tracking-wider">
                        VISITOR_MESSAGES_CACHE
                      </span>
                    </div>
                    <button
                      onClick={clearLogs}
                      className="text-[10px] font-mono text-red-500 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Purge Cache</span>
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[220px] overflow-y-auto">
                    {messageLogs.map((msg, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3.5 rounded-2xl bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 shadow-sm relative text-xs"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="p-1 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                              <User className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white leading-tight">{msg.name}</p>
                              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{msg.email}</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-gray-400">{msg.timestamp}</span>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white mt-1">
                          Re: {msg.subject}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 leading-relaxed pl-1 border-l-2 border-gray-100 dark:border-gray-900">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
