export interface Log {
    log: string;
  }
  
  // DB Schema Expectation (for INSERT)
  // - id         : auto increment (no need to pass manually)
  // - log        : string (required)
  // - timestamp  : auto (default to datetime('now'))
  // - key        : string (passed from Authorization header, not from body)
  
  // No `source` needed anymore based on final design.