CREATE TABLE IF NOT EXISTS travel_requests (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),

  trip TEXT NOT NULL,
  travellers TEXT NOT NULL,
  dates TEXT NOT NULL,
  budget TEXT NOT NULL,
  budget_flights TEXT NOT NULL,
  experience TEXT NOT NULL,
  avoid TEXT NOT NULL,
  style TEXT NOT NULL,
  pace TEXT NOT NULL,
  anything TEXT,

  name TEXT NOT NULL,
  email TEXT NOT NULL,

  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_travel_requests_created_at
  ON travel_requests(created_at);

CREATE INDEX IF NOT EXISTS idx_travel_requests_email
  ON travel_requests(email);

CREATE INDEX IF NOT EXISTS idx_travel_requests_status
  ON travel_requests(status);



