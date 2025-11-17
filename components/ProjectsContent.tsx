export default function ProjectsContent() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-github-border rounded-lg">
      <svg className="w-16 h-16 text-github-muted mb-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v7.5a.75.75 0 01-1.5 0v-7.5zM8 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5A.75.75 0 008 3z"></path>
      </svg>
      <h2 className="text-2xl font-semibold text-github-text mb-2">
        There aren't any projects yet
      </h2>
    </div>
  );
}
