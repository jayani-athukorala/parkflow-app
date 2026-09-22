# ParkFlow — React + Spring Boot + PostgreSQL

A production-style rewrite of the original Java console parking project. The console UI and in-memory repositories have been replaced with a React/Vite frontend, a Spring Boot REST API, PostgreSQL persistence, Flyway migrations, Docker, and a Render Blueprint.

## Architecture

- **Frontend:** React 19 + Vite, responsive operations dashboard
- **Backend:** Java 21, Spring Boot, Spring Web, Validation, Spring Data JPA
- **Database:** PostgreSQL; schema/versioning with Flyway
- **Deployment:** Docker backend + Render Static Site frontend + Render Postgres
- **Concurrency:** parking-space booking uses a pessimistic database lock to prevent double booking

## Features

Register customers and vehicle plates, view live parking-space availability, create 0.5–24 hour reservations, list reservation history, checkout/cancel active reservations, persist all state in PostgreSQL, and expose an application health endpoint.

## Run locally — easiest option (Docker)

Prerequisite: Docker Desktop.

```bash
docker compose up --build
```

Open the frontend at `http://localhost:3000`. The API is at `http://localhost:8080`, and health is at `http://localhost:8080/actuator/health`.

To stop:

```bash
docker compose down
```

To also delete the local database volume and start fresh:

```bash
docker compose down -v
```

## Run locally — development mode

Prerequisites: Java 21, Maven 3.9+, Node 20/22+, npm, and PostgreSQL 16/17 (or just run the database with Docker).

Start PostgreSQL only:

```bash
docker compose up -d db
```

Start the backend from the repository root:

```bash
mvn spring-boot:run
```

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite calls the backend at `http://localhost:8080` by default.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/spots` | List parking spaces |
| GET/POST | `/api/customers` | List/register customers |
| GET/POST | `/api/reservations` | List/create reservations |
| GET | `/api/reservations/{id}` | Get one reservation |
| POST | `/api/reservations/{id}/checkout` | Complete reservation |
| POST | `/api/reservations/{id}/cancel` | Cancel reservation |
| GET | `/actuator/health` | Health check |
