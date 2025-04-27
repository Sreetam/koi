-- Drop the logs table if it exists
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS keys;

-- Create the logs table
CREATE TABLE logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  log TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  key TEXT NOT NULL
);

-- Drop the keys table if it exists
DROP TABLE IF EXISTS keys;

-- Create the keys table
CREATE TABLE keys (
  key TEXT PRIMARY KEY,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);