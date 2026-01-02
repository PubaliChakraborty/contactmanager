# Quick Start Guide

## Prerequisites
- Node.js installed (v14+)
- MongoDB running locally OR MongoDB Atlas connection string

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy the content below)
# Windows: type nul > .env
# Mac/Linux: touch .env
```

**Create `.env` file in `backend/` directory with:**
```
MONGODB_URI=mongodb://localhost:27017/contactmanager
PORT=5000
```

**For MongoDB Atlas, use:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contactmanager
PORT=5000
```

```bash
# Start backend server
npm start

# Or for development (with auto-reload)
npm run dev
```

Backend will run on: `http://localhost:5000`

### 2. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

### 3. Verify Setup

1. Open browser to `http://localhost:3000`
2. You should see the Contact Manager interface
3. Fill out the form and submit
4. Contact should appear in the list below

## Troubleshooting

**Backend won't start:**
- Check if MongoDB is running
- Verify `.env` file exists and has correct MONGODB_URI
- Check if port 5000 is available

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API URL in `frontend/src/api.js`

**MongoDB connection error:**
- For local MongoDB: Ensure MongoDB service is running
- For Atlas: Check connection string and network access settings

## Production Build

### Frontend
```bash
cd frontend
npm run build
```
Output will be in `frontend/dist/`

### Backend
```bash
cd backend
npm start
```

