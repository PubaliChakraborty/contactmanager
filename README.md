# Contact Management Web App

A production-quality MERN stack application for managing contacts. Built with React, Node.js, Express, and MongoDB.

## Features

- ✅ Add new contacts with validation
- ✅ View all contacts in a responsive grid
- ✅ Delete contacts
- ✅ Real-time updates without page reload
- ✅ Client-side form validation
- ✅ Clean, modern UI

## Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Styling**: CSS3 with responsive design

## Project Structure

```
contact-manager/
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── models/Contact.js
│   ├── routes/contactRoutes.js
│   ├── controllers/contactController.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ContactForm.jsx
    │   │   ├── ContactList.jsx
    │   │   └── ContactItem.jsx
    │   ├── App.jsx
    │   ├── api.js
    │   └── main.jsx
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/contactmanager
PORT=5000
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `POST /api/contacts` - Create a new contact
- `GET /api/contacts` - Get all contacts
- `DELETE /api/contacts/:id` - Delete a contact

## Contact Schema

```javascript
{
  name: String (required),
  email: String (required, validated),
  phone: String (required),
  message: String (optional),
  createdAt: Date (auto-generated)
}
```

## Usage

1. Start MongoDB (if running locally)
2. Start the backend server
3. Start the frontend development server
4. Open `http://localhost:3000` in your browser
5. Fill out the contact form and submit
6. View all contacts in the list below
7. Delete contacts using the delete button

## Notes

- Make sure MongoDB is running before starting the backend
- The form validates email format and required fields
- Contacts are sorted by creation date (newest first)
- All operations update the UI without page reload

