# GitHub Repositories App

## Overview
This project is a web application that lists private GitHub repositories from both personal accounts and organizations using the GitHub App API. It consists of a Golang backend API and a React frontend to display the data.

## Project Structure
```
- backend/
  - handlers/           # API request handlers
  - models/            # Data models
  - services/          # Business logic (GitHub API integration)
  - tests/             # Unit tests
  - .env               # Environment variables
  - Dockerfile         # Docker configuration
  - go.mod / go.sum    # Go module dependencies
  - main.go            # Main entry point of the backend

- frontend/
  - public/            # Static assets
  - src/
    - components/      # UI components
    - pages/          # Page-level components
    - services/       # API communication
    - hooks/          # Custom React hooks
    - styles/         # CSS styles
    - types.ts        # TypeScript types
    - tests/          # Unit tests
  - .env               # Environment variables
  - Dockerfile         # Docker configuration
  - package.json       # Dependencies and scripts
  - tsconfig.json      # TypeScript configuration

- docker-compose.yml   # Docker configuration for backend & frontend
- README.md            # Documentation
```

## Backend (Golang)
### Features
- REST API built with Gin framework
- Fetches private repositories from GitHub
- Lists repos from both personal accounts and organizations
- Implements error handling and logging
- Uses environment variables for security
- Includes unit tests

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/isacustodio/challenge-go-react
   cd backend
   ```
2. Install dependencies:
   ```sh
   go mod tidy
   ```
3. Configure environment variables:
   Create a `.env` file with:
   ```sh
   GITHUB_ACCESS_TOKEN=your_github_access_token
   PORT=8080
   ```
4. Run the backend server:
   ```sh
   go run main.go
   ```
5. Test the API:
   ```sh
   curl -X GET http://localhost:8080/repositories
   ```

## Frontend (React + TypeScript)
### Features
- Simple UI for displaying repositories
- Implements loading states
- Filtering by repository name or organization
- Responsive design
- Uses TypeScript for type safety

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/isacustodio/challenge-go-react
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file with:
   ```sh
   REACT_APP_BACKEND_URL=http://localhost:8080
   ```
4. Run the frontend application:
   ```sh
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running with Docker
You can run both backend and frontend using Docker Compose.

1. Ensure `docker-compose.yml` contains:
   ```yaml
   services:
     backend:
       build: ./backend
       ports:
         - "8080:8080"
       env_file:
         - ./backend/.env

     frontend:
       build: ./frontend
       ports:
         - "3000:3000"
       env_file:
         - ./frontend/.env
       depends_on:
         - backend
   ```
2. Build and start both services:
   ```sh
   docker-compose up --build
   ```
3. Access the applications:
   - Backend: [http://localhost:8080/repositories](http://localhost:8080/repositories)
   - Frontend: [http://localhost:3000](http://localhost:3000)

## Testing
- Backend: Run `go test ./tests/...`
- Frontend: Run `npm test`

## License
This project is licensed under the MIT License and was developed by Isabella Bertini.

