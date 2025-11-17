'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { GitHubUser } from '@/types/github';
import { fetchUserProfile } from '@/lib/github';
import { HiOutlineOfficeBuilding, HiOutlineLocationMarker, HiOutlineMail, HiOutlineLink, HiUsers } from 'react-icons/hi';
import { FaXTwitter } from 'react-icons/fa6';

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
          <HiUsers className="w-4 h-4" />
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
              <HiOutlineOfficeBuilding className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{user.company}</span>
            </div>
          )}
          
          {user.location && (
            <div className="flex items-center gap-1.5 text-github-text">
              <HiOutlineLocationMarker className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{user.location}</span>
            </div>
          )}

          {user.email && (
            <div className="flex items-center gap-1.5 text-github-text">
              <HiOutlineMail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
          )}

          {user.blog && (
            <div className="flex items-center gap-1.5 text-github-text">
              <HiOutlineLink className="w-4 h-4 flex-shrink-0" />
              <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="text-github-link hover:underline truncate">{user.blog}</a>
            </div>
          )}

          {user.twitter_username && (
            <div className="flex items-center gap-1.5 text-github-text">
              <FaXTwitter className="w-4 h-4 flex-shrink-0" />
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
        <HiUsers className="w-4 h-4" />
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
            <HiOutlineOfficeBuilding className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{user.company}</span>
          </div>
        )}
        
        {user.location && (
          <div className="flex items-center gap-2 text-github-text">
            <HiOutlineLocationMarker className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{user.location}</span>
          </div>
        )}

        {user.email && (
          <div className="flex items-center gap-2 text-github-text">
            <HiOutlineMail className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
        )}

        {user.blog && (
          <div className="flex items-center gap-2 text-github-text">
            <HiOutlineLink className="w-4 h-4 flex-shrink-0" />
            <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-github-link hover:underline truncate">
              {user.blog.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}

        {user.twitter_username && (
          <div className="flex items-center gap-2 text-github-text">
            <FaXTwitter className="w-4 h-4 flex-shrink-0" />
            <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-github-link hover:underline truncate">
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
