import { useState, useEffect, FormEvent } from 'react';
import { Github, Folder, Star, GitFork, Search, RefreshCw, Flame, BookOpen, Users, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GitHubSectionProps {
  accentColor: string;
}

interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

export default function GitHubSection({ accentColor }: GitHubSectionProps) {
  const [username, setUsername] = useState('gowthamrajcrash-arch');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [languages, setLanguages] = useState<Record<string, number>>({});

  const fetchGithubData = async (userQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${userQuery}`);
      if (!userRes.ok) {
        throw new Error('User not found in GitHub. Try another handle.');
      }
      const userData = await userRes.json();
      
      // 2. Fetch public repos
      const reposRes = await fetch(`https://api.github.com/users/${userQuery}/repos?sort=updated&per_page=8`);
      let reposData: GithubRepo[] = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      setUser(userData);
      setRepos(reposData);

      // Compute languages ratio dynamically from the repositories payload
      const langCounts: Record<string, number> = {};
      let totalLangs = 0;
      reposData.forEach(r => {
        if (r.language) {
          langCounts[r.language] = (langCounts[r.language] || 0) + 1;
          totalLangs++;
        }
      });

      const langRatios: Record<string, number> = {};
      Object.keys(langCounts).forEach(lang => {
        langRatios[lang] = Math.round((langCounts[lang] / totalLangs) * 100);
      });

      // Set default languages if none are found in the repos (e.g. fresh account)
      if (Object.keys(langRatios).length === 0) {
        setLanguages({ 'Python': 60, 'JavaScript': 25, 'HTML/CSS': 15 });
      } else {
        setLanguages(langRatios);
      }

    } catch (err: any) {
      setError(err.message || 'Failed to communicate with GitHub API.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchGithubData(username);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      fetchGithubData(username.trim());
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

  const borderAccentClass = {
    blue: 'border-blue-500/20 focus:border-blue-500',
    emerald: 'border-emerald-500/20 focus:border-emerald-500',
    indigo: 'border-indigo-500/20 focus:border-indigo-500',
    amber: 'border-amber-500/20 focus:border-amber-500',
    rose: 'border-rose-500/20 focus:border-rose-500',
  }[accentColor] || 'border-blue-500/20';

  const progressAccentClass = (lang: string) => {
    if (lang === 'Python') return 'bg-emerald-500';
    if (lang === 'C++') return 'bg-blue-500';
    if (lang === 'JavaScript' || lang === 'TypeScript') return 'bg-amber-400';
    if (lang === 'HTML' || lang === 'CSS') return 'bg-rose-500';
    return 'bg-indigo-500';
  };

  // Generate clean mockup of contribution grid matrix (52 weeks x 7 days)
  // Each index corresponds to level of commits: 0 (light gray) to 4 (deep emerald)
  const renderContributionGraph = () => {
    const levels = [0, 1, 2, 0, 3, 4, 1, 0, 2, 1, 0, 2, 3, 4, 0, 1, 2, 1, 0, 2, 3, 1, 0, 4, 2, 1, 0, 3, 2, 1, 0, 2, 3, 1, 0, 1, 0, 2, 3, 4, 1, 0, 2, 3, 0, 1, 2, 1, 0, 3, 4, 2];
    const days = ['Mon', 'Wed', 'Fri'];
    
    return (
      <div className="bg-white dark:bg-[#0a0a0a]/50 border border-gray-200 dark:border-white/10 p-5 rounded-3xl">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-900 dark:text-white font-mono uppercase tracking-wider">
              PUBLIC_COMMITS_MATRIX
            </span>
          </div>
          <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase">
            365 days contribution timeline
          </span>
        </div>

        <div className="flex items-start gap-2.5">
          {/* Day markers */}
          <div className="flex flex-col gap-2.5 justify-between h-20 text-[10px] font-mono text-gray-400 mt-2 font-medium">
            {days.map(d => <span key={d}>{d}</span>)}
          </div>

          {/* Matrix Grid */}
          <div className="flex-1 overflow-x-auto pb-1">
            <div className="flex gap-1 min-w-[320px]">
              {Array.from({ length: 24 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, rowIdx) => {
                    const hashVal = (colIdx * 7 + rowIdx) % levels.length;
                    const commitLevel = levels[hashVal];
                    
                    const colorClass = [
                      'bg-gray-100 dark:bg-gray-800',
                      'bg-emerald-200 dark:bg-emerald-950/40 text-emerald-400',
                      'bg-emerald-300 dark:bg-emerald-900/60 text-emerald-300',
                      'bg-emerald-400 dark:bg-emerald-700/80 text-emerald-200',
                      'bg-emerald-600 dark:bg-emerald-500 text-white',
                    ][commitLevel];

                    return (
                      <div
                        key={rowIdx}
                        title={`Activity weight: ${commitLevel}`}
                        className={`w-3 h-3 rounded-sm ${colorClass} transition-colors hover:scale-115`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] font-mono text-gray-400 font-medium">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-gray-100 dark:bg-gray-800" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-200 dark:bg-emerald-900" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400 dark:bg-emerald-700" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600 dark:bg-emerald-500" />
          <span>More</span>
        </div>
      </div>
    );
  };

  return (
    <section id="github" className="py-24 bg-gray-50/50 dark:bg-gray-950/20 border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-500 dark:text-white/40 block mb-2">
              [ OPEN_SOURCE_SYNCHRONICITY ]
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-950 dark:text-white">
              Dynamic GitHub Sync
            </h2>
            <p className="text-base text-gray-600 dark:text-white/70 font-light leading-relaxed max-w-xl pt-2">
              Communicates dynamically with GitHub APIs to fetch active code repositories and runtime language profiles. Enter any GitHub username to update the metrics.
            </p>
          </div>

          {/* Interactive Search Customizer Form */}
          <form onSubmit={handleSearch} className="flex bg-white dark:bg-gray-950 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm self-center md:self-end">
            <div className="relative flex items-center pl-3">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="gowthamrajcrash-arch"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-2 pr-4 py-1.5 text-xs font-mono bg-transparent text-gray-900 dark:text-white focus:outline-none w-36 sm:w-44"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${bgAccentClass}`}
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              <span>Sync Repo</span>
            </button>
          </form>
        </div>

        {/* Sync Status / Error */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl border border-red-200 bg-red-100/30 text-xs font-bold text-red-600 dark:text-red-400 font-mono text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Profile & Language breakdown (Left Side) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* profile widget */}
            <div className="bg-white dark:bg-[#0a0a0a]/50 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm">
              {loading ? (
                <div className="space-y-4 skeleton-loading">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 mx-auto" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mx-auto" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mx-auto" />
                </div>
              ) : user ? (
                <div className="text-center space-y-4 text-xs">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-white dark:border-gray-800 shadow-md">
                    <img src={user.avatar_url} alt={user.login} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-950 dark:text-white leading-tight">{user.name || user.login}</h3>
                    <a href={user.html_url} target="_blank" rel="noreferrer" className={`text-[11px] font-mono hover:underline mt-0.5 inline-block ${textAccentClass}`}>
                      @{user.login}
                    </a>
                  </div>
                  {user.bio && (
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                      {user.bio}
                    </p>
                  )}
                  {/* stats row */}
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-800/80 pt-4 text-xs">
                    <div className="flex flex-col items-center">
                      <span className="font-extrabold text-base text-gray-900 dark:text-white font-mono">{user.public_repos}</span>
                      <span className="text-[10px] font-mono font-semibold text-gray-400">REPOSITORIES</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-extrabold text-base text-gray-900 dark:text-white font-mono">{user.followers}</span>
                      <span className="text-[10px] font-mono font-semibold text-gray-400">FOLLOWERS</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center font-mono py-6">Load a valid profile above</p>
              )}
            </div>

            {/* Language stats card */}
            <div className="bg-white dark:bg-[#0a0a0a]/50 p-6 rounded-3xl border border-gray-200 dark:border-white/10 text-left shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-900 pb-2.5">
                <Code className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-gray-900 dark:text-white font-mono uppercase tracking-wider">
                  TOP_LANGUAGES_INDEX
                </span>
              </div>
              <div className="space-y-4">
                {Object.entries(languages).map(([lang, pct]) => (
                  <div key={lang} className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-mono font-semibold text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${progressAccentClass(lang)}`} />
                        {lang}
                      </span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800/60 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${progressAccentClass(lang)}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Contribution & Repositories list (Right Side) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Render Activity Matrix */}
            {renderContributionGraph()}

            {/* Top Repositories Grid */}
            <div className="space-y-4 text-left">
              <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">
                ACTIVE_REPOS_PAYLOAD
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loading ? (
                  Array.from({ length: 4 }).map((_, rIdx) => (
                    <div key={rIdx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 dark:bg-gray-900/50 skeleton-loading h-28 flex flex-col justify-between" />
                  ))
                ) : repos.length > 0 ? (
                  repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 rounded-3xl bg-white dark:bg-[#0a0a0a]/50 border border-gray-200 dark:border-white/10 shadow-sm hover:border-gray-400 dark:hover:border-white/30 transition-all flex flex-col justify-between group h-32"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Folder className="w-4 h-4 text-gray-400" />
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:underline truncate max-w-[150px]">
                            {repo.name}
                          </h4>
                        </div>
                        {repo.description && (
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                            {repo.description}
                          </p>
                        )}
                      </div>

                      {/* Repo tags row */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mt-2">
                        {repo.language && (
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            {repo.language}
                          </span>
                        )}
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3.5 h-3.5 text-gray-400" />
                            {repo.forks_count}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="col-span-2 p-6 text-center text-xs text-gray-400 font-mono border border-dashed rounded-2xl">
                    No public repositories found. Try typing another profile.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
