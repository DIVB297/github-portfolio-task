'use client';

import { useState, useEffect } from 'react';

interface ProfileNavProps {
  username: string;
  onTabChange?: (tab: string) => void;
}

export default function ProfileNav({ username, onTabChange }: ProfileNavProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="border-b border-github-border bg-github-bg">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <nav className="flex gap-2 overflow-x-auto -mb-px pt-4">
          <button
            onClick={() => handleTabClick('overview')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-orange-500 text-github-text'
                : 'border-transparent text-github-muted hover:text-github-text hover:border-github-border'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75z"></path>
              <path d="M6.5 6.5v4.5a.5.5 0 001 0V6.5a.5.5 0 00-1 0zM3 6.5v4.5a.5.5 0 001 0V6.5a.5.5 0 00-1 0zM10 6.5v4.5a.5.5 0 001 0V6.5a.5.5 0 00-1 0z"></path>
            </svg>
            Overview
          </button>
          <button
            onClick={() => handleTabClick('repositories')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'repositories'
                ? 'border-orange-500 text-github-text'
                : 'border-transparent text-github-muted hover:text-github-text hover:border-github-border'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
            </svg>
            Repositories
            <span className="px-2 py-0.5 bg-gray-200 rounded-full text-xs">8</span>
          </button>
          <button
            onClick={() => handleTabClick('projects')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'border-orange-500 text-github-text'
                : 'border-transparent text-github-muted hover:text-github-text hover:border-github-border'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v7.5a.75.75 0 01-1.5 0v-7.5zM8 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5A.75.75 0 008 3z"></path>
            </svg>
            Projects
            <span className="px-2 py-0.5 bg-gray-200 rounded-full text-xs">5</span>
          </button>
          <button
            onClick={() => handleTabClick('packages')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'packages'
                ? 'border-orange-500 text-github-text'
                : 'border-transparent text-github-muted hover:text-github-text hover:border-github-border'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"></path>
            </svg>
            Packages
          </button>
          <button
            onClick={() => handleTabClick('stars')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'stars'
                ? 'border-orange-500 text-github-text'
                : 'border-transparent text-github-muted hover:text-github-text hover:border-github-border'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
            </svg>
            Stars
            <span className="px-2 py-0.5 bg-gray-200 rounded-full text-xs">5</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
