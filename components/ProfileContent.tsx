'use client';

import ContributionGraph from './ContributionGraph';
import PopularRepositories from './PopularRepositories';

interface ProfileContentProps {
  username: string;
}

export default function ProfileContent({ username }: ProfileContentProps) {
  return (
    <div className="space-y-6">
      {/* Popular Repositories */}
      <PopularRepositories />

      {/* Contribution Graph */}
      <div>
        <ContributionGraph username={username} />
      </div>


      {/* Contribution Activity Section */}
      <div>
        <h2 className="text-base font-semibold text-github-text mb-4">Contribution activity</h2>
        <div className="text-sm text-github-muted">
          <p className="mb-2 font-semibold text-github-text">October 2025</p>
          <div className="text-xs text-github-muted italic">
            No contribution activity in this period
          </div>
        </div>
      </div>
    </div>
  );
}
