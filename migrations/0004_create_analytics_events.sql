CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  event_name TEXT NOT NULL,
  path TEXT NOT NULL,
  label TEXT,
  href TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  step INTEGER
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at
  ON analytics_events(created_at);

CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name
  ON analytics_events(event_name);

CREATE INDEX IF NOT EXISTS idx_analytics_events_path
  ON analytics_events(path);
