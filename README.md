# WakeUp Technical Challenge Solution

This repository contains the solution to the WakeUp Technical Challenge, which involves building a restaurant management platform with a Node.js-based API and a React-based frontend.

## Project Overview

The application allows users (waiters) to view a paginated list of restaurants, browse products available at each restaurant, and create orders with multiple products.

## Technical Stack

### Backend

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Testing**: Jest

### Frontend

- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (configured by Next.js defaults)
- **Package Manager**: npm
- **Testing**: Jest, React Testing Library, Babel

## Setup Instructions

To set up and run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/wakeups-challenge.git
cd wakeups-challenge
```

### 2. Backend Setup

Navigate to the `backend` directory and install dependencies using `pnpm`:

```bash
cd backend
pnpm install
```

### 3. Frontend Setup

Navigate to the `frontend` directory and install dependencies using `npm`:

```bash
cd frontend
npm install
```

## Running the Application

### 1. Start the Backend API

From the `backend` directory, run the application in development mode:

```bash
cd backend
pnpm run start:dev
```

The backend API will typically run on `http://localhost:3000`.

### 2. Start the Frontend Application

From the `frontend` directory, run the Next.js development server:

```bash
cd frontend
npm run dev
```

The frontend application will typically run on `http://localhost:3001`.

## Running Tests

### 1. Backend Tests

From the `backend` directory:

```bash
cd backend
pnpm test
```

### 2. Frontend Tests

From the `frontend` directory:

```bash
cd frontend
npm test
```

## Deployment

This project is structured for easy deployment. The backend can be deployed to any Node.js hosting environment (e.g., Render, Heroku, AWS EC2) by building the project (`pnpm run build`) and then running `pnpm run start:prod`. The frontend, being a Next.js application, can be easily deployed to platforms like Vercel or Netlify.

## Assumptions and Future Improvements

### Assumptions Made

- **Data Persistence**: For simplicity, the backend currently uses in-memory data for restaurants and products. In a real-world scenario, this would be replaced with a database (e.g., PostgreSQL, MongoDB).
- **Authentication/Authorization**: No authentication or authorization mechanisms are implemented. This would be crucial for a production system.
- **Error Handling**: Basic error handling is present, but a more robust strategy with centralized logging and user-friendly error messages would be needed.
- **Product Management**: Products are currently hardcoded or generated. A full system would include CRUD operations for products.
- **Order Management**: Orders are simply logged to the console. A complete system would persist orders and provide an interface for managing them.
- **UI/UX Polish**: While efforts were made for an intuitive UI, further polish and responsiveness testing would be required for a production-ready application.

### Future Improvements

- **Database Integration**: Implement a proper database for data storage (e.g., TypeORM with PostgreSQL).
- **Authentication System**: Integrate JWT-based authentication for secure API access.
- **Comprehensive Error Handling**: Implement global exception filters on the backend and more sophisticated error boundaries on the frontend.
- **Real-time Updates**: Use WebSockets for real-time order updates for waiters.
- **Admin Panel**: Develop an admin interface for managing restaurants, products, and orders.
- **Advanced Filtering/Searching**: Add more options for filtering and searching restaurants and products.
- **Frontend State Management**: Consider a state management library (e.g., Redux, Zustand) for more complex frontend states.
- **More E2E Tests**: Expand end-to-end tests to cover more user flows and edge cases.
- **CI/CD Pipeline**: Set up continuous integration and deployment pipelines for automated testing and deployment.
