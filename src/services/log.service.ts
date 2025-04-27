// src/services/log.service.ts

export class LogService {
    constructor() {
      // No dependencies yet — clean service class
    }
  
    async insertLog(db: D1Database, logText: string, key: string): Promise<void> {
      const query = `
        INSERT INTO logs (log, timestamp, key)
        VALUES (?, datetime('now'), ?)
      `;
  
      const stmt = db.prepare(query);
  
      const result = await stmt.bind(logText, key).run();
  
      if (!result.success) {
        throw new Error("Failed to insert log into database");
      }
    }
  }