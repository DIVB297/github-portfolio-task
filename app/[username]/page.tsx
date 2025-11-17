'use client';

import { useState } from "react";
import Header from "@/components/Header";
import ProfileNav from "@/components/ProfileNav";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileContent from "@/components/ProfileContent";
import RepositoriesContent from "@/components/RepositoriesContent";
import ProjectsContent from "@/components/ProjectsContent";
import PackagesContent from "@/components/PackagesContent";
import StarsContent from "@/components/StarsContent";

interface PageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: PageProps) {
  const { username } = params;
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'repositories':
        return <RepositoriesContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'packages':
        return <PackagesContent />;
      case 'stars':
        return <StarsContent />;
      default:
        return <ProfileContent username={username} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <Header username={username} />
      
      {/* Mobile/Tablet: Show profile info before tabs */}
      <div className="lg:hidden">
        <div className="bg-white border-b border-github-border">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
            <ProfileSidebar username={username} isMobile={true} />
          </div>
        </div>
      </div>

      <ProfileNav username={username} onTabChange={setActiveTab} />
      
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop: Show sidebar on left */}
          <aside className="hidden lg:block lg:w-[296px] flex-shrink-0">
            <ProfileSidebar username={username} isMobile={false} />
          </aside>
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
