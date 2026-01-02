# Step-by-Step Execution Guide

## ✅ Prerequisites Check (Already Done)
- ✅ Node.js v20.9.0 installed
- ✅ npm v10.9.2 installed
- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed
- ✅ Backend .env file created

---

## 🚀 Step-by-Step Execution

### **STEP 1: Start MongoDB**

**Option A: Local MongoDB**
- If you have MongoDB installed locally, make sure it's running
- MongoDB typically runs on `mongodb://localhost:27017`
- If not running, start MongoDB service:
  ```powershell
  # Windows - Start MongoDB service
  net start MongoDB
  ```

**Option B: MongoDB Atlas (Cloud)**
- If using MongoDB Atlas, update `backend/.env`:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contactmanager
  ```

---

### **STEP 2: Start Backend Server**

Open **Terminal 1** (PowerShell or Command Prompt):

```powershell
# Navigate to backend directory
cd C:\Users\pubal\OneDrive\Desktop\DEVELOP\backend

# Start the server
npm start
```

**Expected Output:**
```
MongoDB Connected: localhost:27017
Server running on port 5000
```

✅ **Backend is running on:** `http://localhost:5000`

**Keep this terminal open!**

---

### **STEP 3: Start Frontend Server**

Open **Terminal 2** (New PowerShell or Command Prompt window):

```powershell
# Navigate to frontend directory
cd C:\Users\pubal\OneDrive\Desktop\DEVELOP\frontend

# Start the development server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

✅ **Frontend is running on:** `http://localhost:3000`

**Keep this terminal open!**

---

### **STEP 4: Open the Application**

1. Open your web browser
2. Navigate to: **http://localhost:3000**
3. You should see the Contact Manager interface

---

### **STEP 5: Test the Application**

1. **Fill out the contact form:**
   - Name: (required)
   - Email: (required, must be valid format)
   - Phone: (required)
   - Message: (optional)

2. **Click "Add Contact"**
   - Form should clear
   - Success message should appear
   - Contact should appear in the list below

3. **View contacts:**
   - All contacts display in a grid below the form
   - Newest contacts appear first

4. **Delete a contact:**
   - Click "Delete" button on any contact
   - Confirm deletion
   - Contact should be removed from the list

---

## 🛑 How to Stop the Servers

**To stop the servers:**
- Go to each terminal window
- Press `Ctrl + C` to stop the server
- Stop backend first, then frontend

---

## 🔧 Troubleshooting

### **Backend won't start:**
```
Error: MongoDB connection failed
```
**Solution:**
- Make sure MongoDB is running
- Check `.env` file has correct MONGODB_URI
- Verify MongoDB is accessible

### **Frontend can't connect to backend:**
```
Failed to fetch contacts
```
**Solution:**
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify CORS is enabled in backend

### **Port already in use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Close any other application using port 5000
- Or change PORT in `backend/.env`

---

## 📋 Quick Command Reference

### Backend:
```powershell
cd C:\Users\pubal\OneDrive\Desktop\DEVELOP\backend
npm start
```

### Frontend:
```powershell
cd C:\Users\pubal\OneDrive\Desktop\DEVELOP\frontend
npm run dev
```

---

## ✅ Success Indicators

You'll know everything is working when:
- ✅ Backend shows "MongoDB Connected" and "Server running on port 5000"
- ✅ Frontend shows "VITE ready" with localhost:3000
- ✅ Browser loads the Contact Manager page
- ✅ You can submit a contact form successfully
- ✅ Contacts appear in the list immediately
- ✅ You can delete contacts

---

**🎉 You're all set! The application is ready to use.**

