# Hospital Management System - Frontend Documentation

## 🎉 Complete Next.js 16 Frontend

A modern, responsive hospital management system built with Next.js 16 (App Router), TypeScript, and Tailwind CSS.

## 📋 Features Implemented

### Authentication
- ✅ Login page with JWT authentication
- ✅ Registration with role selection (Patient, Doctor, Admin)
- ✅ Token storage in localStorage
- ✅ Protected routes with role-based access
- ✅ Auto-redirect based on user role

### Patient Dashboard (`/dashboard/patient`)
- ✅ View and create patient profile
- ✅ View personal information
- ✅ View all appointments
- ✅ Quick link to book appointments
- ✅ Appointment status indicators

### Doctor Dashboard (`/dashboard/doctor`)
- ✅ Today's appointments queue
- ✅ Patient details (name, age, gender, phone)
- ✅ Appointment management buttons:
  - Confirm pending appointments
  - Complete confirmed appointments
  - Cancel appointments

### Admin Dashboard (`/dashboard/admin`)
- ✅ Statistics cards:
  - Total Patients
  - Total Doctors
  - Pending Appointments
- ✅ Recent patients table
- ✅ Recent appointments table
- ✅ Quick access to patient/doctor management

### Appointments Page (`/appointments`)
- ✅ Doctor selection dropdown
- ✅ Date and time picker
- ✅ Form validation
- ✅ Display available doctors
- ✅ Success notifications

### Patients Page (`/patients`)
- ✅ Complete patient list
- ✅ Search/filter functionality
- ✅ View patient details
- ✅ Admin-only access

### Doctors Page (`/doctors`)
- ✅ Complete doctors directory
- ✅ Search by name, specialization, or department
- ✅ Department overview
- ✅ Quick access to book appointments

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Notifications**: react-hot-toast
- **Date Handling**: date-fns
- **Authentication**: Custom JWT (localStorage)

## 📁 Project Structure

```
app/
  ├── auth/
  │   ├── login/page.tsx           # Login page
  │   └── register/page.tsx        # Registration page
  ├── dashboard/
  │   ├── page.tsx                 # Dashboard redirect
  │   ├── patient/page.tsx         # Patient dashboard
  │   ├── doctor/page.tsx          # Doctor dashboard
  │   └── admin/page.tsx           # Admin dashboard
  ├── appointments/page.tsx        # Book appointments
  ├── patients/page.tsx            # Patient management
  ├── doctors/page.tsx             # Doctors directory
  ├── layout.tsx                   # Root layout with AuthProvider
  └── page.tsx                     # Landing page

components/
  ├── ui/                          # shadcn/ui components
  │   ├── button.tsx
  │   ├── card.tsx
  │   ├── input.tsx
  │   ├── label.tsx
  │   ├── select.tsx
  │   └── table.tsx
  └── ProtectedRoute.tsx          # Route protection HOC

lib/
  ├── api.ts                       # API client functions
  ├── auth-context.tsx             # Auth context provider
  ├── auth.ts                      # JWT verification (backend)
  └── utils.ts                     # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- `.env` file with `AUTH_SECRET` set

### Installation

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file if not exists:
   ```env
   AUTH_SECRET=your-secret-key-here
   DATABASE_URL=your-postgresql-connection-string
   ```

3. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000`

## 🔑 Usage Flow

### For Patients:
1. Register with role "PATIENT"
2. Complete profile (age, gender, phone)
3. Browse doctors at `/doctors`
4. Book appointment at `/appointments`
5. View appointments in dashboard

### For Doctors:
1. Register with role "DOCTOR"
2. Create doctor profile (specialization, department)
3. View today's appointments
4. Confirm/Complete/Cancel appointments

### For Admins:
1. Register with role "ADMIN"
2. View system statistics
3. Manage patients at `/patients`
4. Manage doctors at `/doctors`
5. Monitor all appointments

## 🎨 UI Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: Toast notifications for all errors
- **Form Validation**: Real-time validation with helpful error messages
- **Search/Filter**: Quick search across tables
- **Status Badges**: Color-coded appointment statuses
- **Protected Routes**: Automatic redirect for unauthorized access

## 🔒 Security Features

- JWT token authentication
- Role-based access control
- Token expiration (7 days)
- Protected API routes
- Secure password hashing (bcrypt)
- XSS protection via React

## 📝 API Endpoints Used

### Auth
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new user

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients?me=true` - Get own profile
- `POST /api/patients` - Create patient profile

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create doctor profile

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments?me=patient` - Get patient's appointments
- `GET /api/appointments?me=doctor&date=today` - Get doctor's today appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments` - Update appointment status

## 🐛 Troubleshooting

### Common Issues:

1. **"Session expired" errors**:
   - Token may have expired (7 days)
   - Clear localStorage and login again

2. **"Patient profile not found"**:
   - Complete patient profile first in dashboard

3. **Can't create appointment**:
   - Ensure you're logged in as PATIENT
   - Patient profile must exist

4. **API errors**:
   - Check if backend server is running
   - Verify `AUTH_SECRET` in `.env`
   - Check database connection

## 🎯 Backend Changes Made

To support the frontend, these minimal backend changes were made:

1. **JWT Token Generation**:
   - Updated `/api/auth/login` to return JWT token
   - Updated `/api/auth/register` to return JWT token

2. **Appointments API Enhancement**:
   - Added query parameter filtering (`?me=patient`, `?me=doctor`, `?date=today`)
   - Fixed patient ID resolution in POST endpoint
   - Added PUT endpoint for updating appointment status
   - Added patient/doctor user details in responses

3. **Patients API Enhancement**:
   - Added `?me=true` query for own profile
   - Included user details in responses

4. **Doctors API Enhancement**:
   - Included user details in responses

All changes are backward-compatible and don't break existing functionality.

## 📱 Screenshots Guide

Test the following flows:

1. **Landing Page** → `/`
2. **Register** → `/auth/register`
3. **Login** → `/auth/login`
4. **Patient Dashboard** → `/dashboard/patient`
5. **Book Appointment** → `/appointments`
6. **Doctor Dashboard** → `/dashboard/doctor`
7. **Admin Dashboard** → `/dashboard/admin`

## 🚦 Testing Checklist

- [ ] Register as PATIENT
- [ ] Complete patient profile
- [ ] Book an appointment
- [ ] Register as DOCTOR
- [ ] View today's appointments
- [ ] Confirm/Complete appointment
- [ ] Register as ADMIN
- [ ] View all statistics
- [ ] Browse patients and doctors
- [ ] Test search/filter functionality
- [ ] Test logout and re-login
- [ ] Test protected routes (try accessing wrong role pages)

## 🎉 Success!

Your hospital management system is now fully functional with:
- ✅ Complete authentication system
- ✅ Role-based dashboards
- ✅ Appointment booking and management
- ✅ Patient and doctor management
- ✅ Responsive design
- ✅ Error handling and validation
- ✅ Toast notifications

Happy coding! 🏥💻
