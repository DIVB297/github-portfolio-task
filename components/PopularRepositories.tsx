'use client';

import { mockRepositories } from '@/lib/mockData';
import Link from 'next/link';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { GoRepoForked } from 'react-icons/go';
import { FaRegStar } from 'react-icons/fa';

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
        <h2 className="text-base font-semibold text-github-text dark:text-github-dark-text">Popular repositories</h2>
        <Link href="#" className="text-sm text-github-link dark:text-github-dark-link hover:underline">
          Customize your pins
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="border border-github-border dark:border-github-dark-border rounded-lg p-4 bg-white dark:bg-github-dark-hover hover:bg-github-hover dark:hover:bg-gray-800 transition-colors"
          >
            <div className="space-y-3">
              {/* Repo Name */}
              <div className="flex items-center gap-2">
                <RiGitRepositoryLine className="w-4 h-4 text-github-muted dark:text-github-dark-muted flex-shrink-0" />
                <Link href="#" className="text-sm font-semibold text-github-link dark:text-github-dark-link hover:underline truncate">
                  {repo.name}
                </Link>
                <span className="px-2 py-0.5 text-xs border border-github-border dark:border-github-dark-border rounded-full text-github-muted dark:text-github-dark-muted flex-shrink-0">
                  {repo.visibility === 'public' ? 'Public' : 'Private'}
                </span>
              </div>

              {/* Description */}
              {repo.description && (
                <p className="text-xs text-github-muted dark:text-github-dark-muted line-clamp-2">
                  {repo.description}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-github-muted dark:text-github-dark-muted">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
