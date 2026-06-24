import { useState } from 'react';
import { Award, Sparkles, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Certification } from '../types';

interface CertificationsProps {
  accentColor: string;
}

export default function Certifications({ accentColor }: CertificationsProps) {
  const certifications: Certification[] = [
    {
      id: 'azure-ai',
      title: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      skills: [
        'Artificial Intelligence (AI)',
        'Machine Learning (ML)',
        'Computer Vision',
        'Natural Language Processing (NLP)',
        'Microsoft Azure AI Services',
      ],
      credentialId: 'MS-AI-900-GRB',
      icon: 'azure',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'imagecon-python',
      title: 'Python for Software Development',
      issuer: 'IMAGECON Academy',
      skills: [
        'Python Development',
        'Relational SQL',
        'MongoDB Integration',
        'Tkinter GUI Architectures',
        'Software Development Fundamentals',
      ],
      credentialId: 'IM-PSD-2024-GWR',
      icon: 'imagecon',
      color: 'from-emerald-600 to-teal-600',
    },
  ];

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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

  const pillAccentClass = {
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30',
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/30',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/30',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/30',
  }[accentColor] || 'bg-blue-500/10 text-blue-600';

  return (
    <section id="certs" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-500 dark:text-white/40 block mb-2">
            [ VERIFIED_CREDENTIALS_INDEX ]
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-950 dark:text-white mt-3">
            Professional Certifications
          </h2>
          <p className="text-base text-gray-600 dark:text-white/70 font-light leading-relaxed max-w-xl mx-auto mt-2">
            Industry accredited validations confirming my theoretical mastery and software production engineering competence.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#0a0a0a]/50 border border-gray-200 dark:border-white/10 flex flex-col justify-between hover:border-gray-400 dark:hover:border-white/30 hover:shadow-lg transition-all text-left relative overflow-hidden group shadow-sm"
            >
              {/* Top Accent lighting */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br opacity-5 dark:opacity-10 pointer-events-none group-hover:scale-125 transition-transform" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4 mb-5 border-b border-gray-100 dark:border-gray-900 pb-4">
                  <div className="flex items-center gap-3">
                    <span className={`p-2.5 rounded-xl bg-gradient-to-br ${cert.color} text-white shadow-md`}>
                      <Award className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                        {cert.issuer} Verified
                      </h4>
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-0.5">
                        ID: {cert.credentialId}
                      </p>
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-mono font-bold text-emerald-500 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>ACTIVE</span>
                  </span>
                </div>

                {/* Cert Title */}
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white leading-snug">
                  {cert.title}
                </h3>

                {/* Sub features / skills learned */}
                <div className="mt-4 space-y-2">
                  <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">
                    SKILLS_ACQUIRED
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span key={skill} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono ${pillAccentClass}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Action */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-end">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="text-xs font-bold font-mono text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-950 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 max-w-lg w-full relative overflow-hidden"
            >
              {/* Cert Header details */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-emerald-500" />
              
              <div className="text-center space-y-5 mt-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100/60 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                    CREDENTIAL_VERIFICATION_CERT
                  </h3>
                  <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {selectedCert.title}
                  </h2>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Officially Issued by {selectedCert.issuer} to Gowtham Raj B
                  </p>
                </div>

                <div className="border border-gray-150 dark:border-gray-900/60 rounded-2xl p-4 text-left space-y-2.5 font-mono text-[11px] bg-gray-50/50 dark:bg-gray-900/40">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">RECIPIENT_ID:</span>
                    <span className="text-gray-800 dark:text-gray-200 font-bold">GOWTHAM_RAJ_B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">ISSUER_NAME:</span>
                    <span className="text-gray-800 dark:text-gray-200 font-bold">{selectedCert.issuer.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">CREDENTIAL_HASH:</span>
                    <span className="text-gray-800 dark:text-gray-200 font-bold truncate max-w-[150px]">{selectedCert.credentialId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">STATUS_VERIFICATION:</span>
                    <span className="text-emerald-500 font-extrabold">VERIFIED_SECURE</span>
                  </div>
                </div>

                {/* Sub skills learned list */}
                <div className="text-left">
                  <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-2">
                    CORE_CREDENTIAL_SYLLABUS
                  </p>
                  <div className="flex flex-col gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                    {selectedCert.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal actions */}
                <div className="flex gap-2.5 pt-4">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                  >
                    Dismiss
                  </button>
                  <a
                    href="mailto:gowthamrajcrash@gmail.com"
                    className={`flex-1 py-3 rounded-xl text-xs font-bold text-white text-center flex items-center justify-center gap-1.5 ${bgAccentClass}`}
                  >
                    <span>Request Copy</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
