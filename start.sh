#!/bin/bash
set -e

echo "=== SupplyShield — Starting Backend ==="
cd "$(dirname "$0")/backend"

if [ ! -d "venv" ]; then
  python3 -m venv venv
  source venv/bin/activate
  pip install -q -r requirements.txt
else
  source venv/bin/activate
fi

uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
echo "Backend running at http://localhost:8000 (PID: $BACKEND_PID)"

echo ""
echo "=== SupplyShield — Starting Frontend ==="
cd "$(dirname "$0")/frontend"
npm run dev -- --port 3000 &
FRONTEND_PID=$!
echo "Frontend running at http://localhost:3000 (PID: $FRONTEND_PID)"

echo ""
echo "Dashboard: http://localhost:3000"
echo "API Docs:  http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
