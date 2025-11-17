'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

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
                    <HiMenu className="w-5 h-5" />
                </button>

                {/* GitHub Logo */}
                <Link href="/" className="text-github-text hover:text-github-link">
                    <FaGithub className="w-8 h-8" />
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
                        <FiSearch className="w-5 h-5" />
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
