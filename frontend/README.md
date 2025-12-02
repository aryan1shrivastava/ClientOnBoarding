# Client Onboarding Portal - Frontend

A clean, minimal React frontend for the Client Onboarding Portal with a purple-white gradient theme.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Zustand** for state management
- **Axios** for API requests

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, Footer, ProjectCard, FileUpload)
├── pages/           # Page components (Landing, Dashboard, etc.)
├── services/        # API service configuration
├── store/           # Zustand stores (auth)
└── styles/          # Global styles and theme
```

## Features

- ✅ Authentication (Signup/Login)
- ✅ Project Management Dashboard
- ✅ Create Projects with Shareable Links
- ✅ Client Onboarding Form (Public)
- ✅ File Upload Support
- ✅ Project Status Tracking
- ✅ View Client Submissions

## Design

- Purple gradient theme (#6A38F5 to #A867F8)
- Clean, minimal UI
- Responsive design
- Smooth transitions and hover effects
