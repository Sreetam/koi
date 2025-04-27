#!/bin/bash

# Create dump folder if it doesn't exist
DUMP_FOLDER="./dump"
mkdir -p "$DUMP_FOLDER"

# Timestamp
TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')

# Output file
OUTPUT_FILE="$DUMP_FOLDER/koi_logs_dump_$TIMESTAMP.json"

# Dump the database into the file
npx wrangler d1 execute koi --remote --command "SELECT * FROM logs;" --json > "$OUTPUT_FILE"

echo "✅ Dump cleaned and saved to $OUTPUT_FILE"