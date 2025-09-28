# Task Module — Multiple Appending with Validation (Laravel)

## Overview
A Task Module that accepts many tasks from a repeater form in one request and inserts them into the database with validation and optimized bulk insertion.

## Tech stack
- Backend: Laravel (>=10)
- DB: MySQL / MariaDB (works with Postgres)
- Frontend: Plain HTML + vanilla JS . Easily replaceable with Vue/React/Livewire.
- API docs: Postman collection included.

## Setup
1. Clone repository.
2. Copy `.env.example` to `.env` and configure DB credentials.
3. Install dependencies: `composer install ` , `php artisan key:generate` , `php artisan migrate`
4. Serve backend: `php artisan serve` (default port 8000)
5. Open `frontend/index.html` in a browser (adjust API URL if backend is on a different port).
6. Use the form to add multiple tasks and submit.


## API Endpoints
- `POST /api/tasks` — Insert multiple tasks (validated array of tasks)

- `GET /api/tasks` — List tasks with pagination

## Architecture

- The core is the `Task` Eloquent model and the `tasks` database table.
- The `TaskController::store` method receives an array of tasks, validates each entry, and performs a bulk insert within a database transaction for atomicity.
- The frontend uses a repeater form to collect multiple tasks and sends them as a JSON array to the API endpoint.
- Validation is handled server-side using Laravel Form Requests to ensure data integrity before insertion.
- All database operations are optimized for batch processing to minimize query count and maximize throughput.
- API responses are standardized for easy integration with any frontend framework.
- Error handling and feedback are provided for both validation and server-side issues.
- `Task` model + `tasks` table for persistence.
- `TaskController::store` accepts the array, validates, transforms, and performs bulk `insert` in a DB transaction.
- Frontend collects repeater rows and sends JSON to API endpoint.

## Scalability & Performance
- Use bulk inserts instead of saving per record (avoid N queries).
- Chunk large payloads and insert in batches (e.g., 500 rows per chunk).
- Wrap inserts in transactions to reduce commit overhead.
- Offload heavy computations/notifications to queues.
- Add DB indexes on filterable columns (status, user_id, due_date).
- For extremely high write throughput use sharding or partitioning.

## Execution time optimization highlights
- Use `Model::insert()` for bulk inserts.
- Disable model events if not required during bulk insert.
- For very large payloads, process via a queue worker and return 202 Accepted.

## Deliverables included
- README (this)
- Migration, Model, Request, Controller code
- Frontend repeater + script
- OpenAPI YAML
- Suggestions for the video demo
