# SkillPath

SkillPath is a React + Vite web app for exploring career learning paths and tracking progress locally in the browser.

## Overview

This project lets users register local profiles, browse career roadmaps, open roadmap topics, and mark learning milestones as completed. All profile and progress data is saved in `localStorage`, so each user can keep a separate saved path on the same device.

## Features

- Local sign in / registration flow
- Career roadmap discovery and search
- Track progress for each career path
- Resume last selected career and continue saved progress
- Light / dark theme toggle
- No backend required; data is stored in the browser

## Tech Stack

- React
- Vite
- JavaScript
- `localStorage` for profile persistence

## Getting Started

### Prerequisites

- Node.js 18+ or compatible version
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the development URL shown by Vite to use the app.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

- `src/App.jsx` - main app component and route state
- `src/AuthPanel.jsx` - login/register UI
- `src/Home.jsx` - career selection and resume experience
- `src/Roadmap.jsx` - career roadmap and progress view
- `src/userStorage.js` - localStorage persistence and user profile helpers
- `src/roadmap.json` - career roadmap data
- `src/careers.js` - career metadata and labels

## Notes

- User accounts and passwords are stored locally in the browser only.
- This is a front-end demo app; there is no server or database.

## License

Add your preferred license here.
