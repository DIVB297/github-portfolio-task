'use client';

import { mockRepositories } from '@/lib/mockData';

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Go: '#00ADD8',
  Shell: '#89e051',
  Rust: '#dea584',
  Java: '#b07219',
};

export default function RepositoryList() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return 'Updated 1 month ago';
    return `Updated ${diffMonths} months ago`;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Find a repository..."
          className="flex-1 px-3 py-2 bg-github-bg border border-github-border rounded-lg text-sm text-white placeholder-github-muted focus:border-github-link focus:outline-none"
        />
        <div className="flex gap-2">
          <select className="px-3 py-2 bg-github-bg border border-github-border rounded-lg text-sm text-white focus:border-github-link focus:outline-none">
            <option>Type: All</option>
            <option>Sources</option>
            <option>Forks</option>
            <option>Archived</option>
          </select>
          <select className="px-3 py-2 bg-github-bg border border-github-border rounded-lg text-sm text-white focus:border-github-link focus:outline-none">
            <option>Sort: Last updated</option>
            <option>Name</option>
            <option>Stars</option>
          </select>
        </div>
      </div>

      {/* Repository List */}
      <div className="space-y-6">
        {mockRepositories.map((repo) => (
          <div
            key={repo.id}
            className="border-b border-github-border pb-6 last:border-b-0"
          >
            <div className="space-y-3">
              {/* Repo Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold">
                    <a
                      href="#"
                      className="text-github-link hover:underline"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  {repo.visibility === 'public' && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs border border-github-border rounded-full text-github-muted">
                      Public
                    </span>
                  )}
                </div>
                <button className="px-3 py-1 text-xs font-medium border border-github-border rounded-lg hover:bg-github-hover transition-colors">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                    </svg>
                    Star
                  </span>
                </button>
              </div>

              {/* Description */}
              {repo.description && (
                <p className="text-sm text-github-text">{repo.description}</p>
              )}

              {/* Repo Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-github-muted">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: languageColors[repo.language] || '#8b949e' }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                    </svg>
                    <span>{repo.stargazers_count}</span>
                  </div>
                )}
                {repo.forks_count > 0 && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                    </svg>
                    <span>{repo.forks_count}</span>
                  </div>
                )}
                <span>{formatDate(repo.updated_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
