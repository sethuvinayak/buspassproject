# Telangana Bus Pass Application

## Overview

A modern web application for purchasing and managing bus passes for Telangana State Road Transport Corporation. Users can signup, login, browse available bus passes, and make payments online.

## Features

- **User Authentication**: Secure signup and login system
- **Bus Pass Management**: View and purchase bus passes
- **Multiple Pass Types**: Ordinary/Luxury and General/Route-specific options
- **Route Selection**: Choose specific routes across Hyderabad
- **Digital Payment**: Secure payment processing
- **Pass Management**: Download and manage digital bus passes

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI
- **Form Handling**: React Hook Form
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd telangana-bus-pass-app
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

- `/app` - Next.js app directory with routes and pages
- `/components` - Reusable React components
- `/public` - Static assets
- `/styles` - Global styles and CSS

## Features in Development

- Real-time bus tracking
- Pass renewal functionality
- QR code generation for passes
- Multi-language support (Telugu, English)
- Admin dashboard for pass management
