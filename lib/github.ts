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
  // Try to fetch real GitHub contributions via GraphQL API
  // If no token is available, fall back to mock data
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  if (!token) {
    console.warn('No GitHub token found. Using mock data for contributions.');
    return generateMockContributions();
  }

  try {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const query = `
      query ($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            totalCommitContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          login: username,
          from: oneYearAgo.toISOString(),
          to: today.toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contributions from GraphQL');
    }

    const json = await response.json();
    
    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new Error('GraphQL query failed');
    }

    const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    const contributions: Array<{
      date: string;
      count: number;
      level: number;
      color?: string;
    }> = [];

    // Flatten weeks into a single array of contribution days
    weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        const count = day.contributionCount;
        contributions.push({
          date: day.date,
          count: count,
          level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 8 ? 3 : 4,
          color: day.color,
        });
      });
    });

    return contributions;
  } catch (error) {
    console.error('Error fetching contributions from GitHub GraphQL API:', error);
    console.warn('Falling back to mock data');
    return generateMockContributions();
  }
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
