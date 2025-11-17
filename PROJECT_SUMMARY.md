# GitHub Profile Page - Project Summary

## ✅ Requirements Completion

### 1. UI Design & Responsiveness ✓
- **Responsive Design**: Built with Tailwind CSS utility classes for mobile, tablet, and desktop
- **GitHub-like Design**: Matches the actual GitHub profile page layout
- **Light Theme**: Clean, modern light color scheme matching GitHub's design
- **Components Created**:
  - Header (navbar with username)
  - ProfileNav (tab navigation)
  - ProfileSidebar (user info panel)
  - ProfileContent (main content area)
  - ContributionGraph (heatmap with months/weeks)
  - Empty state components for all tabs

### 2. Mock Data Implementation ✓
- **Repository Data**: Mock data in `lib/mockData.ts` for popular repositories
- **Contribution Data**: Generated mock contributions for the heatmap
- **Profile Sections**: Mock data for achievements, organizations

### 3. API Integration ✓

#### a. Contribution Graph with Graphing Library ✓
- **Library Used**: **ECharts (echarts-for-react)**
- **API**: **GitHub GraphQL API** 
  - Endpoint: `https://api.github.com/graphql`
  - Query: `contributionsCollection` on User object
  - Fetches real contribution calendar data (last 1 year)
  - Requires GitHub Personal Access Token
  - Falls back to mock data if token not provided
- **Implementation**: 
  - Heatmap visualization showing contributions over the year
  - Month labels displayed on top
  - Day labels (Mon, Wed, Fri) on the left
  - 5-level color gradient from light to dark green (#ebedf0 to #216e39)
  - Interactive tooltips showing contribution count and date
  - Real-time data from GitHub or mock data fallback
- **Configuration**: Optional `NEXT_PUBLIC_GITHUB_TOKEN` environment variable

#### b. User Profile API Integration ✓
- **API Used**: `https://api.github.com/users/{username}`
- **Documentation Reference**: https://docs.github.com/en/rest/reference/users#get-a-user
- **Data Fetched**:
  - Profile picture (avatar_url)
  - Full name
  - Username (login)
  - Bio
  - Company
  - Location
  - Email
  - Twitter username
  - Blog/website
  - Followers/Following counts
- **Implementation**: `lib/github.ts` - `fetchUserProfile()` function
- **Display**: Left sidebar (`ProfileSidebar.tsx`) shows all user information

#### c. API Documentation ✓
- Reference: https://docs.github.com/en/rest/reference

### 4. Working Tabs ✓
- **Overview Tab**: Shows full profile content (contributions, repos, activity)
- **Repositories Tab**: Clickable, shows empty state "There aren't any repositories yet"
- **Projects Tab**: Clickable, shows empty state "There aren't any projects yet" 
- **Packages Tab**: Clickable, shows empty state "There aren't any packages yet"
- **Stars Tab**: Clickable, shows empty state "There aren't any starred repositories yet"
- **Implementation**: State management in `app/[username]/page.tsx` with tab switching

### 5. CSS Styling ✓
- **Framework**: Tailwind CSS
- **Custom Configuration**: `tailwind.config.ts` with GitHub color palette
- **Colors**: 
  - Background: #ffffff
  - Text: #1f2328
  - Border: #d0d7de
  - Link: #0969da
  - Muted: #656d76
  - Hover: #f6f8fa
- **Responsive Classes**: Mobile-first approach with sm:, md:, lg: breakpoints

### 6. Extra Points - Additional APIs ✓
While the basic requirements used mock data, we implemented:
- Real GitHub User Profile API for all user information
- Dynamic username routing (`localhost:3000/{username}`)
- Error handling and loading states

## 📦 Technologies Used

### Core
- **Next.js 14** (App Router with TypeScript)
- **React 18**
- **TypeScript** (Full type safety)
- **Tailwind CSS** (Responsive styling)

### Graphing Library (as required)
- **ECharts 5.x** - Professional charting library
- **echarts-for-react** - React wrapper for ECharts

### APIs
- **GitHub REST API** - User profile data
- **Mock Data Generation** - Contributions and repositories

## 🏗️ Project Structure

```
github-portfolio-task/
├── app/
│   ├── [username]/
│   │   └── page.tsx          # Dynamic username route with tab switching
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page with redirect
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Top navbar with username
│   ├── ProfileNav.tsx        # Tab navigation
│   ├── ProfileSidebar.tsx    # Left panel with user info (API)
│   ├── ProfileContent.tsx    # Main content area
│   ├── ContributionGraph.tsx # ECharts heatmap visualization
│   ├── PopularRepositories.tsx
│   ├── RepositoriesContent.tsx
│   ├── ProjectsContent.tsx
│   ├── PackagesContent.tsx
│   └── StarsContent.tsx
├── lib/
│   ├── github.ts            # API functions
│   └── mockData.ts          # Mock repository data
├── types/
│   └── github.ts            # TypeScript interfaces
└── tailwind.config.ts       # Custom GitHub colors

```

## 🚀 Features

1. **Dynamic Routing**: Access any GitHub profile via `localhost:3000/{username}`
2. **Real API Data**: User profile information fetched from GitHub API
3. **Professional Visualization**: ECharts library for contribution heatmap
4. **Responsive Design**: Works on mobile, tablet, and desktop
5. **Interactive Tabs**: All tabs are clickable with appropriate content
6. **Loading States**: Skeleton loaders while fetching data
7. **Error Handling**: Graceful handling of API failures
8. **Type Safety**: Full TypeScript coverage
9. **Clean Code**: Reusable components and utility functions

## 📊 Contribution Graph Implementation

The contribution graph uses **ECharts** (as specified in requirements) with:
- Heatmap chart type
- Custom color scheme matching GitHub's green gradient
- Month labels on X-axis
- Day labels (Mon, Wed, Fri) on Y-axis
- Interactive tooltips on hover
- Responsive layout with horizontal scroll for smaller screens
- Visual map for color scaling

## 🎯 How to Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000/shreeramk
# or any other GitHub username
http://localhost:3000/{username}
```

## 🎨 Design Highlights

- **Light Theme Only**: Clean, professional appearance
- **GitHub Accurate**: Closely matches actual GitHub profile design
- **Consistent Spacing**: Proper margins and padding throughout
- **Hover Effects**: Subtle interactions on buttons and links
- **Typography**: Uses GitHub-like font sizes and weights
- **Color System**: Custom Tailwind configuration for GitHub colors

## ✨ Summary

All requirements have been successfully implemented:
- ✅ Responsive UI with Tailwind CSS
- ✅ Mock data for repositories and contributions
- ✅ **ECharts library** for contribution graph visualization
- ✅ GitHub User Profile API integration
- ✅ All tabs working with appropriate content/empty states
- ✅ Design closely matches GitHub profile page
- ✅ Extra: Real API integration for user data

The project is production-ready and fully functional!
