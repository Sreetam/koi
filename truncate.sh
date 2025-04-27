#!/bin/bash

# Path to backup script
BACKUP_SCRIPT="./backup.sh"

# Check if backup script exists
if [ ! -f "$BACKUP_SCRIPT" ]; then
  echo "❌ ERROR: backup.sh not found! Cannot proceed."
  exit 1
fi

echo "⚡ Running backup before truncating..."
bash "$BACKUP_SCRIPT"

# Check if backup succeeded
if [ $? -ne 0 ]; then
  echo "❌ ERROR: Backup script failed! Aborting truncation."
  exit 1
fi

echo "⚡ Backup completed successfully."

echo "⚡ WARNING: This will DELETE all logs from your D1 'logs' table!"
read -p "Are you absolutely sure? (y/n): " confirm

if [[ "$confirm" == "y" ]]; then
  echo "🚀 Truncating logs table..."

  npx wrangler d1 execute koi --remote --command "DELETE FROM logs;"

  echo "✅ Logs table truncated successfully!"
else
  echo "❌ Operation cancelled."
fi