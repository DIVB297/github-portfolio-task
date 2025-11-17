import { RiGitRepositoryLine } from 'react-icons/ri';

export default function RepositoriesContent() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <RiGitRepositoryLine className="w-16 h-16 text-github-muted mb-4" />
      <h2 className="text-2xl font-semibold text-github-text mb-2">
        There aren't any repositories yet
      </h2>
    </div>
  );
}
