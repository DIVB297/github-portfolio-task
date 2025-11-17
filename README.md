# GitHub Portfolio Task

A modern, responsive GitHub profile page clone built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✨ **Responsive Design** - Mobile-first design that works on all devices
- 🎨 **GitHub-style UI** - Pixel-perfect recreation of GitHub's dark theme
- 📊 **Contribution Graph** - Interactive heatmap showing contribution activity
- 🔗 **API Integration** - Real user data from GitHub API
- 🚀 **Modern Stack** - Built with Next.js 14, TypeScript, and Tailwind CSS
- ♻️ **Reusable Components** - Clean component architecture for maintainability

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charting**: ECharts (echarts-for-react)
- **APIs**: 
  - GitHub REST API (user profile - no auth required)
  - GitHub GraphQL API (contribution graph - requires token)

## Project Structure

```
github-portfolio-task/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── ProfileSidebar.tsx # User profile sidebar
│   ├── ProfileContent.tsx # Main content area
│   ├── ContributionGraph.tsx # Contribution heatmap
│   └── RepositoryList.tsx # Repository listings
├── lib/                   # Utility functions
│   ├── github.ts          # GitHub API functions
│   └── mockData.ts        # Mock data for repositories
├── types/                 # TypeScript definitions
│   └── github.ts          # GitHub API types
└── public/                # Static assets
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables (Optional)

To fetch real contribution data, you need a GitHub Personal Access Token:

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Get a GitHub token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "GitHub Profile App")
   - No scopes needed for public data
   - Copy the token

3. Add your token to `.env.local`:
```
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
```

**Note**: Without a token, the app will use mock contribution data. All other features work without authentication.

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

The app supports dynamic GitHub usernames via URL:

- **Default Profile**: Visit `http://localhost:3000` (auto-redirects to `/shreeramk`)
- **Custom Profile**: Visit `http://localhost:3000/{username}` (e.g., `http://localhost:3000/octocat`)
- **Any GitHub user**: Replace `{username}` with any valid GitHub username

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## API Integration

The app uses the following GitHub APIs:

1. **User Profile API** - `https://api.github.com/users/{username}`
   - Fetches user information (name, bio, avatar, followers, etc.)
   - No authentication required for public profiles

2. **Contribution Graph** - Mock data (GitHub doesn't provide public API)
   - Generates realistic contribution patterns
   - Shows activity for the last year

## Features Implementation

### ✅ Implemented

- Responsive design (mobile, tablet, desktop)
- User profile sidebar with GitHub API integration
- Contribution graph with color-coded activity levels
- Repository list with mock data
- Functional tabs (Repositories, Projects, Packages, Stars)
- GitHub-style UI components
- Loading states

### 📝 Using Mock Data

- Repositories
- Projects
- Packages
- Stars

## Customization

To change the default GitHub user, modify the redirect in `app/page.tsx`:

```typescript
export default function Home() {
  redirect('/shreeramk'); // Change 'shreeramk' to your preferred username
}
```

## Design Decisions

1. **Component-based Architecture**: Small, reusable components for better maintainability
2. **Tailwind Utility Classes**: For rapid development and responsive design
3. **TypeScript**: For type safety and better developer experience
4. **Client Components**: Used where needed (state management, effects)
5. **Server Components**: Default for better performance
6. **Mock Data**: Used where GitHub API doesn't provide public endpoints

