-- Drop the logs table if it exists
-- DROP TABLE IF EXISTS logs;

-- Create the logs table
CREATE TABLE logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  log TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  key TEXT NOT NULL
);