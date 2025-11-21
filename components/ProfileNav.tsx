'use client';

import { useState } from 'react';
import { IoBookOutline } from "react-icons/io5";
import { RiGitRepositoryLine } from "react-icons/ri";
import { LuTable2 } from "react-icons/lu";
import { TbCube } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";

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
    <div className="border-b border-github-border dark:border-github-dark-border bg-github-bg dark:bg-github-dark-bg">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <nav className="flex gap-2 overflow-x-auto -mb-px pt-4">
          <button
            onClick={() => handleTabClick('overview')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-orange-500 text-github-text dark:text-github-dark-text'
                : 'border-transparent text-github-muted dark:text-github-dark-muted hover:text-github-text dark:hover:text-github-dark-text hover:border-github-border dark:hover:border-github-dark-border'
            }`}
          >
            <IoBookOutline className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => handleTabClick('repositories')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'repositories'
                ? 'border-orange-500 text-github-text dark:text-github-dark-text'
                : 'border-transparent text-github-muted dark:text-github-dark-muted hover:text-github-text dark:hover:text-github-dark-text hover:border-github-border dark:hover:border-github-dark-border'
            }`}
          >
            <RiGitRepositoryLine className="w-4 h-4" />
            Repositories
            <span className="px-2 py-0.5 bg-gray-200 dark:bg-github-dark-hover rounded-full text-xs dark:text-github-dark-text">8</span>
          </button>
          <button
            onClick={() => handleTabClick('projects')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'border-orange-500 text-github-text dark:text-github-dark-text'
                : 'border-transparent text-github-muted dark:text-github-dark-muted hover:text-github-text dark:hover:text-github-dark-text hover:border-github-border dark:hover:border-github-dark-border'
            }`}
          >
            <LuTable2 className="w-4 h-4" />
            Projects
            <span className="px-2 py-0.5 bg-gray-200 dark:bg-github-dark-hover rounded-full text-xs dark:text-github-dark-text">5</span>
          </button>
          <button
            onClick={() => handleTabClick('packages')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'packages'
                ? 'border-orange-500 text-github-text dark:text-github-dark-text'
                : 'border-transparent text-github-muted dark:text-github-dark-muted hover:text-github-text dark:hover:text-github-dark-text hover:border-github-border dark:hover:border-github-dark-border'
            }`}
          >
            <TbCube className="w-4 h-4" />
            Packages
          </button>
          <button
            onClick={() => handleTabClick('stars')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'stars'
                ? 'border-orange-500 text-github-text dark:text-github-dark-text'
                : 'border-transparent text-github-muted dark:text-github-dark-muted hover:text-github-text dark:hover:text-github-dark-text hover:border-github-border dark:hover:border-github-dark-border'
            }`}
          >
            <FaRegStar className="w-4 h-4" />
            Stars
            <span className="px-2 py-0.5 bg-gray-200 dark:bg-github-dark-hover rounded-full text-xs dark:text-github-dark-text">5</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
