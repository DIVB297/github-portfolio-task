'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
    username?: string;
}

interface UserProfile {
    avatar_url: string;
    login: string;
}

export default function Header({ username }: HeaderProps) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (username) {
            fetch(`https://api.github.com/users/${username}`)
                .then(res => res.json())
                .then(data => setUserProfile(data))
                .catch(err => console.error('Failed to fetch user profile', err));
        }
    }, [username]);

    return (
        <header className="bg-github-bg dark:bg-github-dark-bg border-b border-github-border dark:border-github-dark-border sticky top-0 z-50">
            <nav className="px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
                {/* Menu Button (Mobile) */}
                <button className="p-2 hover:bg-github-hover dark:hover:bg-github-dark-hover rounded-lg lg:hidden text-github-text dark:text-github-dark-text">
                    <HiMenu className="w-5 h-5" />
                </button>

                {/* GitHub Logo */}
                <Link href="/" className="text-github-text dark:text-github-dark-text hover:text-github-link dark:hover:text-github-dark-link">
                    <FaGithub className="w-8 h-8" />
                </Link>

                {/* Username - Only show when provided */}
                {username && (
                    <Link href={`/${username}`} className="text-github-text dark:text-github-dark-text font-semibold hover:text-github-link dark:hover:text-github-dark-link text-sm">
                        {username}
                    </Link>
                )}



                {/* Right Side Navigation */}
                <div className="flex items-center gap-2 ml-auto">
                    {/* Search Icon (Small screens) */}
                    <button className="p-2 hover:bg-github-hover dark:hover:bg-github-dark-hover rounded-lg lg:hidden text-github-text dark:text-github-dark-text">
                        <FiSearch className="w-5 h-5" />
                    </button>

                    {/* Search Bar (Large screens) */}
                    <div className="flex-1 max-w-5xl hidden lg:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search or jump to..."
                                className="w-full px-3 py-1.5 bg-github-bg dark:bg-github-dark-bg border border-github-border dark:border-github-dark-border rounded-md text-sm text-github-text dark:text-github-dark-text placeholder-github-muted dark:placeholder-github-dark-muted focus:border-github-link dark:focus:border-github-dark-link focus:outline-none focus:ring-1 focus:ring-github-link dark:focus:ring-github-dark-link"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-github-muted dark:text-github-dark-muted">/</span>
                        </div>
                    </div>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 hover:bg-github-hover dark:hover:bg-github-dark-hover rounded-lg text-github-text dark:text-github-dark-text transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <MdDarkMode className="w-5 h-5" />
                        ) : (
                            <MdLightMode className="w-5 h-5" />
                        )}
                    </button>

                    {/* Profile Avatar */}
                    {userProfile ? (
                        <Link href={`/${username}`} className="w-8 h-8 rounded-full overflow-hidden border border-github-border dark:border-github-dark-border hover:opacity-80 transition-opacity">
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
                        <div className="w-8 h-8 rounded-full bg-github-hover dark:bg-github-dark-hover border border-github-border dark:border-github-dark-border"></div>
                    )}
                </div>
            </nav>
        </header>
    );
}
