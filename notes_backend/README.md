# Notes Backend (Express)

Backend API service for a notes app with CRUD operations.

## Features
- Health endpoint: `GET /health`
- Notes CRUD:
  - `GET /api/notes`
  - `GET /api/notes/:id`
  - `POST /api/notes`
  - `PUT /api/notes/:id`
  - `DELETE /api/notes/:id`
- Basic validation and JSON responses
- Simple file-backed persistence (data/notes.json)
- Swagger docs at `/docs`
- Runs on port 3001 by default

## Getting Started

1. Install dependencies:
   - Already defined in package.json; CI will handle install.

2. Run the server:
   - Production: `npm start`
   - Development (watch): `npm run dev`

3. Environment variables:
   - See `.env.example`. By default:
     - `PORT=3001`
     - `HOST=0.0.0.0`

## API

- Health: `GET /health`
- Notes:
  - List: `GET /api/notes`
  - Get by id: `GET /api/notes/:id`
  - Create: `POST /api/notes` (body: `{ "title": "string", "content": "string?" }`)
  - Update: `PUT /api/notes/:id` (body: `{ "title"?: "string", "content"?: "string" }`)
  - Delete: `DELETE /api/notes/:id`

Responses are JSON. On errors, API returns `success: false` with `error` and optionally `details`.

## Docs

- Swagger UI: `/docs`
- OpenAPI JSON (dynamic): `/openapi.json` via Swagger UI internal link

## Persistence

Data is persisted to `data/notes.json`. The file is created automatically if missing.
