import { GitHubUser } from '@/types/github';

const API_BASE = 'https://api.github.com';

export async function fetchUserProfile(username: string): Promise<GitHubUser> {
  try {
    const response = await fetch(`${API_BASE}/users/${username}`, {
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function fetchContributions(username: string) {
  // GitHub doesn't provide a public API for contribution graph
  // Using mock data as specified in requirements
  return generateMockContributions();
}

function generateMockContributions() {
  const contributions = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const count = Math.floor(Math.random() * 10);
    contributions.push({
      date: new Date(d).toISOString().split('T')[0],
      count,
      level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 8 ? 3 : 4,
    });
  }

  return contributions;
}
