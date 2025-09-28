
## API Endpoints
- `POST /api/tasks` — Insert multiple tasks (validated array of tasks)

See `docs/openapi.yaml` for OpenAPI/Swagger.

## Architecture
- `Task` model + `tasks` table for persistence.
- `TaskRequest` for validation (validates array items).
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
- Use `Model::insert()` or raw `DB::table()->insert()` for bulk inserts.
- Disable model events if not required during bulk insert.
- Consider `upsert()` if you need to avoid duplicates.
- For very large payloads, process via a queue worker and return 202 Accepted.

## Deliverables included
- README (this)
- Migration, Model, Request, Controller code
- Frontend repeater + script
- OpenAPI YAML
- Suggestions for the video demo
