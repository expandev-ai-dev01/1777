# Valida Senha - Backend API

Backend API for password validation system.

## Description

Um validador de senhas onde o usuário fornece a senha e o sistema classifica ela.

## Features

- Password strength validation
- Security level classification
- Detailed validation feedback

## Technology Stack

- Node.js
- TypeScript
- Express.js

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

### Development

Run the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

### Production

Start production server:
```bash
npm start
```

## API Documentation

### Health Check

```
GET /health
```

Returns server health status.

### API Endpoints

All API endpoints are prefixed with `/api/v1`

## Project Structure

```
src/
├── api/                 # API controllers
│   └── v1/
│       ├── external/    # Public endpoints
│       └── internal/    # Authenticated endpoints
├── routes/              # Route definitions
├── middleware/          # Express middleware
├── services/            # Business logic
├── utils/               # Utility functions
└── server.ts            # Application entry point
```

## License

ISC
