'use client';

import { mockRepositories } from '@/lib/mockData';
import Link from 'next/link';

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Go: '#00ADD8',
  Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B',
  Dart: '#00B4AB',
};

export default function PopularRepositories() {
  // Show first 6 repositories
  const repos = mockRepositories.slice(0, 6);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-github-text">Popular repositories</h2>
        <Link href="#" className="text-sm text-github-link hover:underline">
          Customize your pins
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="border border-github-border rounded-lg p-4 bg-white hover:bg-github-hover transition-colors"
          >
            <div className="space-y-3">
              {/* Repo Name */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-github-muted flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                </svg>
                <Link href="#" className="text-sm font-semibold text-github-link hover:underline truncate">
                  {repo.name}
                </Link>
                <span className="px-2 py-0.5 text-xs border border-github-border rounded-full text-github-muted flex-shrink-0">
                  {repo.visibility === 'public' ? 'Public' : 'Private'}
                </span>
              </div>

              {/* Description */}
              {repo.description && (
                <p className="text-xs text-github-muted line-clamp-2">
                  {repo.description}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-github-muted">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
