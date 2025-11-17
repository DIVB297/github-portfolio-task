'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeaderProps {
    username?: string;
}

interface UserProfile {
    avatar_url: string;
    login: string;
}

export default function Header({ username }: HeaderProps) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (username) {
            fetch(`https://api.github.com/users/${username}`)
                .then(res => res.json())
                .then(data => setUserProfile(data))
                .catch(err => console.error('Failed to fetch user profile', err));
        }
    }, [username]);

    return (
        <header className="bg-github-bg border-b border-github-border sticky top-0 z-50">
            <nav className="px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
                {/* Menu Button (Mobile) */}
                <button className="p-2 hover:bg-github-hover rounded-lg lg:hidden text-github-text">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"></path>
                    </svg>
                </button>

                {/* GitHub Logo */}
                <Link href="/" className="text-github-text hover:text-github-link">
                    <svg height="32" width="32" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                </Link>

                {/* Username - Only show when provided */}
                {username && (
                    <Link href={`/${username}`} className="text-github-text font-semibold hover:text-github-link text-sm">
                        {username}
                    </Link>
                )}



                {/* Right Side Navigation */}
                <div className="flex items-center gap-2 ml-auto">
                    {/* Search Icon (Small screens) */}
                    <button className="p-2 hover:bg-github-hover rounded-lg lg:hidden text-github-text">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path>
                        </svg>
                    </button>

                    {/* Search Bar (Large screens) */}
                    <div className="flex-1 max-w-5xl hidden lg:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search or jump to..."
                                className="w-full px-3 py-1.5 bg-github-bg border border-github-border rounded-md text-sm text-github-text placeholder-github-muted focus:border-github-link focus:outline-none focus:ring-1 focus:ring-github-link"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-github-muted">/</span>
                        </div>
                    </div>

                    {/* Profile Avatar */}
                    {userProfile ? (
                        <Link href={`/${username}`} className="w-8 h-8 rounded-full overflow-hidden border border-github-border hover:opacity-80 transition-opacity">
                            <Image
                                src={userProfile.avatar_url}
                                alt={userProfile.login}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                                unoptimized
                            />
                        </Link>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-github-hover border border-github-border"></div>
                    )}
                </div>
            </nav>
        </header>
    );
}
