# Market Leaders Memo System

A web app to help team members choose the right memo type and fill it out, then download a PDF to share with the team.

## Features

- **Question-based flow**: Answer a few questions to determine which memo type you need
- **Three memo types**:
  - **Quick Memo** (15 min) - For small tests, content ideas, minor improvements
  - **Project Memo** (30-60 min) - For campaigns, new offers, system builds
  - **Initiative Memo** (2-4 hrs) - For major launches, strategic pivots, requires founder approval
- **PDF Download**: Generate a professional PDF that matches the Word templates exactly
- **Priority & Team Sections**: Every memo includes priority levels and RACI responsibility matrix

## Tech Stack

- Next.js 16
- React 18
- Tailwind CSS
- @react-pdf/renderer for PDF generation
- Lucide React for icons

## Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/market-leaders-memo)

### Option 2: Manual Deploy

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Vercel will automatically detect Next.js and configure the build settings.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
memo-app/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (questionnaire)
│   └── memo/
│       ├── quick/page.tsx   # Quick memo form
│       ├── project/page.tsx # Project memo form
│       └── initiative/page.tsx # Initiative memo form
├── components/
│   ├── FormComponents.tsx   # Reusable form inputs
│   ├── QuickMemoPDF.tsx     # Quick memo PDF template
│   ├── ProjectMemoPDF.tsx   # Project memo PDF template
│   └── InitiativeMemoPDF.tsx # Initiative memo PDF template
├── lib/
│   └── memoTypes.ts         # Type definitions and constants
└── ...config files
```

## Based on WAFM System

This app is based on the "Write A Freaking Memo" (WAFM) system inspired by Shiron Sher (Acquisition.com):

> "Most people just don't have the ability to organize their thoughts. When you put all your thoughts down, you get to organize your thoughts around it. Then you can see the holes."

## License

Private - Market Leaders internal use only.
