# 🚀 Quick Start Guide

## Start the Application

1. **Make sure your database is running and migrated:**
   ```bash
   npx prisma migrate dev
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to http://localhost:3000

## 🎯 Quick Test Workflow

### 1. Register Users

**Register a Patient:**
- Go to http://localhost:3000/auth/register
- Name: John Doe
- Email: patient@test.com
- Password: password123
- Role: PATIENT

**Register a Doctor:**
- Go to http://localhost:3000/auth/register  
- Name: Dr. Smith
- Email: doctor@test.com
- Password: password123
- Role: DOCTOR

**Register an Admin:**
- Go to http://localhost:3000/auth/register
- Name: Admin User
- Email: admin@test.com
- Password: password123
- Role: ADMIN

### 2. Test Patient Flow

1. **Login as Patient** (patient@test.com)
2. **Complete Profile:**
   - Age: 30
   - Gender: Male
   - Phone: +1234567890
3. **Book Appointment:**
   - Click "Book Appointment" button
   - Select a doctor from dropdown
   - Choose date and time
   - Click "Book Appointment"
4. **View Dashboard:**
   - See your profile details
   - See your appointments list

### 3. Test Doctor Flow

1. **First, create doctor profile via API:**
   ```bash
   # Login as doctor to get token
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"doctor@test.com","password":"password123"}'
   
   # Use the token to create doctor profile
   curl -X POST http://localhost:3000/api/doctors \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -d '{"specialization":"Cardiology","department":"Cardiology"}'
   ```

2. **Login as Doctor** (doctor@test.com)
3. **View Today's Appointments:**
   - See pending appointments
   - Click "Confirm" to confirm
   - Click "Complete" to complete
   - Click "Cancel" to cancel

### 4. Test Admin Flow

1. **Login as Admin** (admin@test.com)
2. **View Dashboard:**
   - See total patients, doctors, pending appointments
   - View recent patients table
   - View recent appointments table
3. **Manage Patients:**
   - Click "Manage Patients"
   - Search for patients
4. **Manage Doctors:**
   - Click "Manage Doctors"
   - View all doctors
   - Search by specialization

## 📱 Pages to Test

- ✅ `/` - Landing page
- ✅ `/auth/login` - Login page
- ✅ `/auth/register` - Registration page  
- ✅ `/dashboard/patient` - Patient dashboard
- ✅ `/dashboard/doctor` - Doctor dashboard
- ✅ `/dashboard/admin` - Admin dashboard
- ✅ `/appointments` - Book appointment (Patient only)
- ✅ `/patients` - Patients list (Admin only)
- ✅ `/doctors` - Doctors directory

## 🔐 Environment Setup

Make sure you have `.env` file with:

```env
AUTH_SECRET=your-super-secret-jwt-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/hospital_db
```

## 🐛 Common Issues

**"Patient profile not found"**
- Complete your patient profile in the dashboard first

**"Only Patients can create appointments"**
- Make sure you're logged in as a PATIENT role

**"Session expired"**
- Token expires after 7 days, login again

**Can't see appointments in doctor dashboard**
- Make sure appointments have today's date
- Doctor profile must be created

## 🎨 Features Highlights

### Authentication
- JWT tokens stored in localStorage
- Auto-redirect based on role
- Protected routes

### Patient Features
- Profile management
- Appointment booking
- View appointment history
- Appointment status tracking

### Doctor Features
- Today's appointments queue
- Patient details view
- Appointment status management
- Confirm/Complete/Cancel actions

### Admin Features
- System statistics
- Patient management with search
- Doctor management with search
- All appointments overview

## 📖 API Endpoints Reference

### Auth
- POST `/api/auth/login` - Returns `{ user, token }`
- POST `/api/auth/register` - Returns `{ user, token }`

### Patients
- GET `/api/patients` - All patients
- GET `/api/patients?me=true` - Own profile
- POST `/api/patients` - Create profile

### Doctors
- GET `/api/doctors` - All doctors
- POST `/api/doctors` - Create profile

### Appointments
- GET `/api/appointments` - All appointments
- GET `/api/appointments?me=patient` - Patient's appointments
- GET `/api/appointments?me=doctor&date=today` - Doctor's today appointments
- POST `/api/appointments` - Create appointment
- PUT `/api/appointments` - Update status

## 🎉 You're Ready!

Everything is set up and ready to use. Start by registering users with different roles and testing the complete workflow.

For detailed documentation, see [FRONTEND_README.md](FRONTEND_README.md)
