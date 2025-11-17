import { FaRegStar } from 'react-icons/fa';

export default function StarsContent() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FaRegStar className="w-16 h-16 text-github-muted mb-4" />
      <h2 className="text-2xl font-semibold text-github-text mb-2">
        You don't have any starred repositories yet
      </h2>
    </div>
  );
}
