export interface Project {
  id: string;
  title: string;
  tech: string[];
  features: string[];
  description: string;
  category: 'Python' | 'Web' | 'Fullstack' | 'AI';
  complexity: number; // 1-5 rating
  mockImageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  skills: string[];
  icon: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  achievements?: string[];
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  skills: string[];
  credentialId?: string;
  icon: string;
  color: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100 percentage
  category: 'Programming' | 'Web' | 'Database' | 'Design' | 'Tools' | 'Core' | 'Soft';
  iconName: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
