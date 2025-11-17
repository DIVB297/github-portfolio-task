'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { GitHubUser } from '@/types/github';
import { fetchUserProfile } from '@/lib/github';

interface ProfileSidebarProps {
  username: string;
  isMobile?: boolean;
}

export default function ProfileSidebar({ username, isMobile = false }: ProfileSidebarProps) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchUserProfile(username)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('User not found');
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div className={`animate-pulse ${isMobile ? 'flex items-start gap-4' : 'space-y-4'}`}>
        <div className={`bg-github-hover rounded-full ${isMobile ? 'w-24 h-24 flex-shrink-0' : 'w-full aspect-square'}`} />
        {isMobile ? (
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-github-hover rounded" />
            <div className="h-4 bg-github-hover rounded w-1/2" />
          </div>
        ) : (
          <>
            <div className="h-6 bg-github-hover rounded" />
            <div className="h-4 bg-github-hover rounded w-2/3" />
          </>
        )}
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-8">
        <p className="text-github-muted mb-4">User not found</p>
        <a href="/shreeramk" className="text-github-link hover:underline">
          Go to default profile
        </a>
      </div>
    );
  }

  // Mobile layout - horizontal
  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-github-border flex-shrink-0">
            <Image
              src={user.avatar_url}
              alt={user.name || user.login}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Name and Username */}
            <div className="mb-2">
              <h1 className="text-xl font-semibold text-github-text">{user.name || user.login}</h1>
              <p className="text-lg text-github-muted">{user.login}</p>
            </div>

            {/* Edit Profile Button */}
            <button className="px-4 py-1.5 text-sm font-medium bg-github-hover hover:bg-gray-200 border border-github-border rounded-md text-github-text transition-colors">
              Edit profile
            </button>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-github-text leading-relaxed">{user.bio}</p>
        )}

        {/* Followers */}
        <div className="flex items-center gap-1 text-sm text-github-muted">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a3.001 3.001 0 01-2.599 2.967 5.471 5.471 0 01.897 1.654A4.002 4.002 0 0015.5 12.5a.75.75 0 01-1.5 0 2.5 2.5 0 00-2.5-2.5h-.5a.75.75 0 010-1.5h.5A3.5 3.5 0 0011 4z"></path>
          </svg>
          <a href="#" className="text-github-text hover:text-github-link font-semibold">{user.followers}</a>
          <span>followers</span>
          <span>·</span>
          <a href="#" className="text-github-text hover:text-github-link font-semibold">{user.following}</a>
          <span>following</span>
        </div>

        {/* Additional Info - Compact for mobile */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {user.company && (
            <div className="flex items-center gap-1.5 text-github-text">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM1.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-2.5zM6 1.75A.25.25 0 016.25 1.5h2.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25h-2.5a.25.25 0 01-.25-.25V1.75zM10.5 5a.5.5 0 110 1 .5.5 0 010-1zm0 3a.5.5 0 110 1 .5.5 0 010-1z"></path>
              </svg>
              <span className="truncate">{user.company}</span>
            </div>
          )}
          
          {user.location && (
            <div className="flex items-center gap-1.5 text-github-text">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
              <span className="truncate">{user.location}</span>
            </div>
          )}

          {user.email && (
            <div className="flex items-center gap-1.5 text-github-text">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809v6.442zm13-8.181v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81z"></path>
              </svg>
              <span className="truncate">{user.email}</span>
            </div>
          )}

          {user.blog && (
            <div className="flex items-center gap-1.5 text-github-text">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
              </svg>
              <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-github-link hover:underline truncate">
                {user.blog.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}

          {user.twitter_username && (
            <div className="flex items-center gap-1.5 text-github-text">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.567 5.144c.008.123.008.247.008.371 0 3.796-2.889 8.173-8.172 8.173v-.002A8.131 8.131 0 011 12.398a5.768 5.768 0 004.25-1.19 2.876 2.876 0 01-2.683-1.995c.431.083.875.066 1.297-.05A2.873 2.873 0 011.56 6.348v-.036c.4.222.847.345 1.304.36a2.876 2.876 0 01-.89-3.836 8.152 8.152 0 005.92 3 2.874 2.874 0 014.895-2.619 5.763 5.763 0 001.824-.697 2.883 2.883 0 01-1.263 1.588A5.712 5.712 0 0015 3.656a5.834 5.834 0 01-1.433 1.488z"></path>
              </svg>
              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-github-link hover:underline truncate">
                @{user.twitter_username}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop layout - vertical
  return (
    <div className="space-y-4">
      {/* Profile Image */}
      <div className="relative w-full aspect-square rounded-full overflow-hidden border border-github-border">
        <Image
          src={user.avatar_url}
          alt={user.name || user.login}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Name and Username */}
      <div>
        <h1 className="text-2xl font-semibold text-github-text mb-1">{user.name || user.login}</h1>
        <p className="text-xl text-github-muted">{user.login}</p>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-sm text-github-text leading-relaxed">{user.bio}</p>
      )}

      {/* Edit Profile Button */}
      <button className="w-full px-3 py-1.5 text-sm font-medium bg-github-hover hover:bg-gray-200 border border-github-border rounded-md text-github-text transition-colors">
        Edit profile
      </button>

      {/* Followers */}
      <div className="flex items-center gap-1 text-sm text-github-muted">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a3.001 3.001 0 01-2.599 2.967 5.471 5.471 0 01.897 1.654A4.002 4.002 0 0015.5 12.5a.75.75 0 01-1.5 0 2.5 2.5 0 00-2.5-2.5h-.5a.75.75 0 010-1.5h.5A3.5 3.5 0 0011 4z"></path>
        </svg>
        <a href="#" className="text-github-text hover:text-github-link font-semibold">{user.followers}</a>
        <span>followers</span>
        <span>·</span>
        <a href="#" className="text-github-text hover:text-github-link font-semibold">{user.following}</a>
        <span>following</span>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 text-sm">
        {user.company && (
          <div className="flex items-center gap-2 text-github-text">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM1.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-2.5zM6 1.75A.25.25 0 016.25 1.5h2.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25h-2.5a.25.25 0 01-.25-.25V1.75zM10.5 5a.5.5 0 110 1 .5.5 0 010-1zm0 3a.5.5 0 110 1 .5.5 0 010-1z"></path>
            </svg>
            <span className="truncate">{user.company}</span>
          </div>
        )}
        
        {user.location && (
          <div className="flex items-center gap-2 text-github-text">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="truncate">{user.location}</span>
          </div>
        )}

        {user.email && (
          <div className="flex items-center gap-2 text-github-text">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809v6.442zm13-8.181v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81z"></path>
            </svg>
            <span className="truncate">{user.email}</span>
          </div>
        )}

        {user.blog && (
          <div className="flex items-center gap-2 text-github-text">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
            </svg>
            <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-github-link hover:underline truncate">
              {user.blog.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}

        {user.twitter_username && (
          <div className="flex items-center gap-2 text-github-text">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.567 5.144c.008.123.008.247.008.371 0 3.796-2.889 8.173-8.172 8.173v-.002A8.131 8.131 0 011 12.398a5.768 5.768 0 004.25-1.19 2.876 2.876 0 01-2.683-1.995c.431.083.875.066 1.297-.05A2.873 2.873 0 011.56 6.348v-.036c.4.222.847.345 1.304.36a2.876 2.876 0 01-.89-3.836 8.152 8.152 0 005.92 3 2.874 2.874 0 014.895-2.619 5.763 5.763 0 001.824-.697 2.883 2.883 0 01-1.263 1.588A5.712 5.712 0 0015 3.656a5.834 5.834 0 01-1.433 1.488z"></path>
            </svg>
            <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-github-link hover:underline truncate">
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
