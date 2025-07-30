#!/bin/bash

echo "🔄 Restarting Flask Backend..."

# Kill existing Flask process
pkill -f "python app.py" 2>/dev/null || echo "No existing Flask process found"

# Wait a moment
sleep 2

# Start Flask backend
echo "📡 Starting Flask Backend..."
cd server
/Library/Frameworks/Python.framework/Versions/3.12/bin/python3.12 /Users/nonbangkok/Documents/VS_code/ECG-Arrhythmia-Classification/server/app.py &
FLASK_PID=$!

echo "✅ Flask Backend started with PID: $FLASK_PID"
echo "🌐 Flask Backend: http://localhost:5000"

# Wait for Flask to start
sleep 3

# Test Flask backend
echo "🧪 Testing Flask Backend..."
curl -s http://localhost:5000/ > /dev/null && echo "✅ Flask Backend is running!" || echo "❌ Flask Backend failed to start"

echo ""
echo "Press Ctrl+C to stop Flask Backend"
wait $FLASK_PID 