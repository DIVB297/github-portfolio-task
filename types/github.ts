export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  company: string | null;
  location: string | null;
  email: string | null;
  blog: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  visibility: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export type TabType = 'repositories' | 'projects' | 'packages' | 'stars';
