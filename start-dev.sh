#!/bin/bash

echo "🚀 Starting ECG Classification System..."

# Start Flask Backend
echo "📡 Starting Flask Backend..."
cd server
/Library/Frameworks/Python.framework/Versions/3.12/bin/python3.12 /Users/nonbangkok/Documents/VS_code/ECG-Arrhythmia-Classification/server/app.py  &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start Next.js Frontend
echo "🌐 Starting Next.js Frontend..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Both servers are starting..."
echo "📡 Flask Backend: http://localhost:5000"
echo "🌐 Next.js Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait

# Cleanup
echo "🛑 Stopping servers..."
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
echo "✅ Servers stopped" 