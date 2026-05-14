# hospital-management-system
Mongodb based Hospital Management System

# MediCare HMS — MongoDB Edition
### Hospital Management System | Mini Project

---

## Project Structure

```
hms-mongodb/
├── backend/
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   └── Bill.js
│   ├── routes/
│   │   └── api.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── frontend/
    └── index.html
```

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | HTML, CSS, JavaScript             |
| Charts    | Chart.js                          |
| PDF       | jsPDF                             |
| Backend   | Node.js + Express.js              |
| Database  | MongoDB (NoSQL) + Mongoose ODM    |

---

## Prerequisites

Install these before starting:

1. **Node.js** — https://nodejs.org (v18 or higher)
2. **MongoDB Community Server** — https://www.mongodb.com/try/download/community
   - Install and start MongoDB service
   - Default runs on `mongodb://localhost:27017`

---

## Setup Instructions

### Step 1 — Start MongoDB
Make sure MongoDB is running on your machine.

**Windows:**
```
net start MongoDB
```
**Mac/Linux:**
```
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### Step 2 — Install backend dependencies
```bash
cd backend
npm install
```

### Step 3 — Start the backend server
```bash
npm start
```
You should see:
```
✅  MongoDB connected: mongodb://localhost:27017/hms_db
🚀  Server running at http://localhost:5000
```

### Step 4 — Open the frontend
Open `frontend/index.html` directly in your browser (no server needed).

---

## Login Credentials

| Role          | Username      | Password  |
|---------------|---------------|-----------|
| Admin         | admin         | admin123  |
| Doctor        | doctor        | doc123    |
| Receptionist  | receptionist  | rec123    |

---

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/patients         | Get all patients         |
| POST   | /api/patients         | Add new patient          |
| PUT    | /api/patients/:id     | Update patient           |
| DELETE | /api/patients/:id     | Delete patient           |
| GET    | /api/doctors          | Get all doctors          |
| POST   | /api/doctors          | Add new doctor           |
| PUT    | /api/doctors/:id      | Update doctor            |
| DELETE | /api/doctors/:id      | Delete doctor            |
| GET    | /api/appointments     | Get all appointments     |
| POST   | /api/appointments     | Add appointment          |
| PUT    | /api/appointments/:id | Update appointment       |
| DELETE | /api/appointments/:id | Delete appointment       |
| GET    | /api/bills            | Get all bills            |
| POST   | /api/bills            | Create invoice           |
| PUT    | /api/bills/:id        | Update bill              |
| DELETE | /api/bills/:id        | Delete bill              |
| GET    | /api/stats            | Dashboard summary stats  |
| POST   | /api/seed             | Load sample data         |

---

## Features

- Role-based login (Admin / Doctor / Receptionist)
- Full CRUD — Patients, Doctors, Appointments, Billing
- PDF invoice generation (client-side, no server needed)
- Form validation with error messages
- 5 analytics charts (Chart.js)
- MongoDB `.populate()` for relational data (patient name in appointments)
- Seed button to load sample data in one click
- Live MongoDB connection status in top bar

---

## Screenshots

### Dashboard
![Dashboard](screenshots/Dashboard.png)

### Login
![Login](screenshots/Login.png)

### Analytics
![Analytics](screenshots/Analytics.png)

### Billing
![Billing](screenshots/Billing.png)

### Appointments
![Appointments](screenshots/appointments.png)

## For Viva / Presentation

**Why NoSQL (MongoDB)?**
- Patient records are schema-flexible — different patients may have different fields
- JSON document model maps directly to JavaScript objects
- Mongoose `populate()` handles relations like SQL joins
- MongoDB scales horizontally — important for hospital data growth
- No rigid schema means faster development and easier changes

**MongoDB concepts used:**
- Documents & Collections (patients, doctors, appointments, bills)
- ObjectId references with `populate()` (like foreign keys)
- Aggregation pipeline in `/api/stats` (`$group`, `$sum`)
- Schema validation via Mongoose (required fields, enums, regex)
- Timestamps (`createdAt`, `updatedAt`) auto-managed by Mongoose
