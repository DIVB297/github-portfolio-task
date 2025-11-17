# GitHub Contribution Graph - Setup Guide

## Overview

This application can fetch **real contribution data** from GitHub using their GraphQL API. However, this requires a GitHub Personal Access Token.

## Two Modes of Operation

### 1. With GitHub Token (Real Data)
- Fetches actual contribution calendar from GitHub
- Shows real contribution counts and dates
- Uses GitHub GraphQL API

### 2. Without Token (Mock Data)
- Generates random contribution data
- Still displays beautiful heatmap visualization
- No setup required - works out of the box

## Setting Up Real Data (Optional)

### Step 1: Create a GitHub Token

1. Go to your GitHub Settings: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Fill in the form:
   - **Note**: Give it a descriptive name (e.g., "Portfolio App")
   - **Expiration**: Choose your preferred duration
   - **Scopes**: No scopes needed (leave all unchecked) for public data
4. Click **"Generate token"**
5. **Copy the token immediately** (you won't be able to see it again!)

### Step 2: Add Token to Your Project

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_GITHUB_TOKEN=ghp_YourTokenHere
```

**Important**: 
- Never commit `.env.local` to git (it's in .gitignore by default)
- Keep your token secret
- For public repositories, use a token with minimal scopes

### Step 3: Restart Development Server

```bash
npm run dev
```

The app will now fetch real contribution data!

## GraphQL Query Used

```graphql
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
```

## API Details

- **Endpoint**: `https://api.github.com/graphql`
- **Method**: POST
- **Authorization**: Bearer token required
- **Data Range**: Last 1 year from current date
- **Rate Limit**: 5,000 points/hour with token

## Troubleshooting

### "No GitHub token found" Warning
- This is normal if you haven't set up a token
- The app will use mock data automatically
- No functionality is lost, just different data

### GraphQL Errors
- Check if your token is valid
- Ensure the username exists on GitHub
- Verify network connectivity
- Check browser console for detailed error messages

### Token Scope Issues
- For public profiles, no scopes are needed
- If accessing private data, add appropriate scopes

## Benefits of Real Data

- ✅ Accurate contribution counts
- ✅ Real dates and activity patterns
- ✅ GitHub's official color coding
- ✅ Matches actual GitHub profile
- ✅ Up-to-date information

## Security Notes

- Tokens are stored locally (not committed to git)
- `NEXT_PUBLIC_` prefix makes it client-accessible
- Consider using environment variables for production
- Rotate tokens regularly
- Use minimal required scopes

## References

- [GitHub GraphQL API Docs](https://docs.github.com/en/graphql)
- [Creating Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub Contributions Collection](https://docs.github.com/en/graphql/reference/objects#contributionscollection)
