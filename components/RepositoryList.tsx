'use client';

import { mockRepositories } from '@/lib/mockData';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { GoRepoForked } from 'react-icons/go';
import { FaRegStar } from 'react-icons/fa';

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
                    <FaRegStar className="w-4 h-4" />
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
                    <FaRegStar className="w-4 h-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                )}
                {repo.forks_count > 0 && (
                  <div className="flex items-center gap-1">
                    <GoRepoForked className="w-4 h-4" />
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
