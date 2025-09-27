# Squad Number 🔢

A fast and intuitive web application that allows you to quickly search and find any professional football player's current squad number. Built with Next.js and powered by Transfermarkt data.

## 🎯 Purpose

Ever wondered what number your favorite player wears? Squad Number solves this problem by providing instant access to current squad numbers for professional football players worldwide. Simply search for a player's name and get their current jersey number along with their club information.

## ✨ Features

- **Instant Search**: Fast, real-time player search with autocomplete
- **Current Squad Numbers**: Get the most up-to-date jersey numbers

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/squad-number.git
cd squad-number
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: [Biome](https://biomejs.dev/)
- **Data Source**: [Transfermarkt API](https://transfermarkt-api.fly.dev/)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── player/[id]/       # Dynamic player detail pages
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── search/           # Search-related components
│   └── ui/               # Base UI components
├── lib/                  # Utility functions and API clients
│   └── transfermarkt/    # Transfermarkt API integration
└── types/                # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Biome

## 🎨 Design Principles

- **Minimal & Clean**: Focus on essential functionality without clutter
- **Fast & Responsive**: Optimized for speed and mobile-first design
- **Accessible**: Built with accessibility in mind
- **Type-Safe**: Full TypeScript coverage for better developer experience

## 🔍 How It Works

1. **Search**: Users type a player's name in the search bar
2. **API Call**: The app queries the Transfermarkt API for matching players
3. **Results**: Display search results with player names and clubs
4. **Selection**: Click or navigate to a player to view their details
5. **Details**: Show the player's current squad number and club information

## 🌐 API Integration

The app integrates with the Transfermarkt API to fetch:
- Player search results
- Player profile information
- Club details and colors
- Current squad numbers


## 🙏 Acknowledgments

- [Transfermarkt](https://www.transfermarkt.com/) for providing comprehensive football data
- [Transfermarkt API](https://transfermarkt-api.fly.dev/) for the free API service
- The Next.js team for the amazing framework
- All contributors and users who help improve this project
