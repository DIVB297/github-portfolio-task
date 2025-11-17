import { TbCube } from 'react-icons/tb';

export default function PackagesContent() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <TbCube className="w-16 h-16 text-github-muted mb-4" />
      <h2 className="text-2xl font-semibold text-github-text mb-2">
        There aren't any packages yet
      </h2>
    </div>
  );
}
