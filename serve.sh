#!/bin/bash

# Kill any processes running on port 8002
echo "Stopping any existing servers on port 8002..."
kill $(lsof -ti:8002) 2>/dev/null || true

# Start the HTTP server
echo "Starting server at http://localhost:8002"
python3 -m http.server 8002 