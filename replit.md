# Chef Amélie Dupont Quiz App

## Overview

This application is a food quiz/questionnaire web app built with React on the frontend and Express on the backend. It follows a modern web architecture with a single-page application (SPA) frontend and a RESTful API backend. The app appears to be a quiz that helps users discover their "food profile" and then offers them Chef Amélie Dupont's collection of recipes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a client-server architecture:

1. **Frontend**: React-based SPA using modern React patterns and hooks for state management.
   - Built with Vite for fast development and optimized builds
   - Uses Tailwind CSS for styling with a customized theme
   - Component library based on shadcn/ui (which uses Radix UI primitives)

2. **Backend**: Express.js server that serves both the API and the frontend.
   - Uses TypeScript for type safety
   - Handles API requests through defined routes
   - Serves static frontend assets in production

3. **Database**: Uses Drizzle ORM with PostgreSQL (intended)
   - Schema defined in shared/schema.ts
   - Currently using in-memory storage implementation (MemStorage class), but set up for PostgreSQL integration

4. **State Management**: 
   - React's built-in state hooks for local component state
   - TanStack Query (React Query) for API data fetching and caching

## Key Components

### Frontend

1. **Component Structure**:
   - UI components from shadcn/ui (based on Radix UI)
   - Custom components for the quiz flow (QuizApp, QuizStep, RadioOption)
   - Results and sales-oriented components (ProfileResult, SalesPage)

2. **Routing**: Uses Wouter for lightweight client-side routing

3. **Styling**: 
   - Tailwind CSS with custom design tokens
   - CSS variables for theming (light/dark mode support)

4. **User Flow**:
   - Quiz with multiple steps
   - Profile result page
   - Sales page for Chef Amélie's recipe collection

### Backend

1. **API Routes**: Express routes defined in server/routes.ts
   - Basic health check endpoint (/api/health)
   - Structured for adding additional API endpoints

2. **Storage Layer**: Abstracted through an interface (IStorage)
   - Currently uses in-memory implementation (MemStorage)
   - Ready for database integration (PostgreSQL with Drizzle ORM)

3. **Server Configuration**:
   - Development mode with Vite integration
   - Production mode serving static assets

### Database

1. **Schema**: Defined with Drizzle ORM
   - Users table with id, username, and password fields
   - Zod validation schemas for type safety

2. **Connections**: 
   - Uses @neondatabase/serverless for PostgreSQL connections
   - Database URL configured via environment variable

## Data Flow

1. **User Interactions**:
   - User navigates through quiz steps
   - Answers are collected and stored in component state
   - Upon completion, user is shown their profile result
   - User can then proceed to the sales page

2. **API Requests**:
   - Client makes requests to the API endpoints
   - Server processes requests, interacts with storage
   - Responses are returned to the client

3. **Data Storage**:
   - User data will be stored in PostgreSQL (when implemented)
   - Currently using in-memory storage for development

## External Dependencies

### Frontend
- React ecosystem (React, React DOM)
- TanStack Query for data fetching
- Radix UI components via shadcn/ui
- Tailwind CSS for styling
- Framer Motion for animations
- Vite for build/development

### Backend
- Express.js for API and server
- Drizzle ORM for database interactions
- Zod for validation

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Development**: `npm run dev` starts both server and client in development mode
   - Vite provides fast HMR for frontend
   - Server restarts on changes

2. **Production Build**: `npm run build`
   - Vite builds the frontend assets
   - esbuild bundles the server code
   - Assets are placed in the dist directory

3. **Production Start**: `npm run start`
   - Runs the bundled server which serves both the API and static frontend assets

4. **Database**: 
   - PostgreSQL database (via Replit's PostgreSQL module)
   - Connected via environment variables
   - Schema migrations via Drizzle ORM

## Future Considerations

1. **Authentication**: Implement user authentication for personalized experiences

2. **Database Integration**: Complete the PostgreSQL integration using the Drizzle ORM setup

3. **Additional Quiz Features**: Expand quiz capabilities with more question types and dynamic content

4. **Content Management**: Add an admin interface for managing quiz questions and results

5. **Analytics**: Implement tracking to understand user behavior and quiz completion rates