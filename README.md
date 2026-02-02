# Hospital Management System

A modern, full-stack hospital management platform built with Next.js 16, TypeScript, Prisma, and PostgreSQL. Features role-based access control for patients, doctors, and administrators with real-time appointment scheduling and management.

## 🌟 Features

### Authentication & Authorization
- JWT-based authentication with 7-day token expiry
- Role-based access control (PATIENT, DOCTOR, ADMIN)
- Secure password hashing with bcrypt
- Protected routes with automatic role-based redirects
- Session persistence with localStorage

### Patient Features
- 📋 Complete patient profile management
- 📅 Book appointments with any available doctor
- 📱 View all scheduled appointments
- 📊 Track appointment status (Pending, Confirmed, Completed, Cancelled)
- 🔍 Search and filter functionality

### Doctor Features
- 👥 View today's or all upcoming appointments
- ✅ Confirm pending appointments
- ✔️ Mark appointments as completed
- ❌ Cancel appointments
- 📈 Manage patient queue

### Admin Features
- 📊 Dashboard with key statistics
  - Total patients count
  - Total doctors count
  - Pending appointments count
- 👀 View all patients and doctors
- 📋 Monitor all system appointments
- 🔧 System-wide management capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM v7.3.0
- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Notifications**: react-hot-toast
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Date Handling**: date-fns

## 📁 Project Structure

```
hospital-system/
├── app/
│   ├── api/                      # API routes
│   │   ├── appointments/         # Appointment CRUD endpoints
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── doctors/              # Doctor management endpoints
│   │   └── patients/             # Patient management endpoints
│   ├── auth/                     # Authentication pages
│   │   ├── login/                # Login page
│   │   └── register/             # Registration page
│   ├── appointments/             # Appointment booking page
│   ├── dashboard/                # Role-specific dashboards
│   │   ├── admin/                # Admin dashboard
│   │   ├── doctor/               # Doctor dashboard
│   │   └── patient/              # Patient dashboard
│   ├── doctors/                  # Doctor directory
│   ├── patients/                 # Patient management
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── ...
│   └── ProtectedRoute.tsx        # Role-based route wrapper
├── lib/
│   ├── api.ts                    # Centralized API client
│   ├── auth.ts                   # JWT verification
│   ├── auth-context.tsx          # Auth state management
│   ├── prisma.ts                 # Prisma client
│   ├── utils.ts                  # Utility functions
│   └── validators.ts             # Zod validation schemas
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Database seeding script
│   └── migrations/               # Database migrations
├── public/                       # Static assets
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (create `.env.local`):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/hospital_db"
   AUTH_SECRET="your-secret-key-min-32-characters"
   ```

3. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

4. **Seed demo data** (optional):
   ```bash
   npm run seed
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Linting & Formatting
npm run lint             # Run ESLint
npm run lint -- --fix    # Auto-fix linting issues

# Database
npm run seed             # Seed demo data
npx prisma studio       # Open Prisma Studio
npx prisma migrate dev   # Create and apply migrations
npx prisma migrate reset # Reset database
```

## 🔐 Authentication Flow

1. **Registration**: User creates account with name, email, password, and role (PATIENT or DOCTOR)
2. **Password Hashing**: Password hashed with bcrypt (10 rounds)
3. **JWT Token**: Server generates JWT token with userId and role (7-day expiry)
4. **Storage**: Token and user data stored in localStorage
5. **Protected Routes**: All API endpoints verify JWT and check user authorization
6. **Auto-Redirect**: Logged-in users automatically redirected to their role-specific dashboard

## 🗄️ Database Schema

### User
- id, name, email, password (hashed), role (PATIENT/DOCTOR/ADMIN)

### Patient
- id, userId (FK), age, gender, phone

### Doctor
- id, userId (FK), specialization, department

### Appointment
- id, patientId (FK), doctorId (FK), date, status (PENDING/CONFIRMED/COMPLETED/CANCELLED)

## 🧪 Demo Credentials

All demo accounts have password: `password123`

**Admin**:
- admin@hospital.com

**Doctors**:
- john.smith@hospital.com (Cardiology)
- emily.chen@hospital.com (Pediatrics)

**Patients**:
- alice.johnson@email.com
- bob.smith@email.com

Run `npm run seed` to populate the database with all demo data.

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ Role-based authorization checks on all API endpoints
- ✅ Protected routes with ProtectedRoute component
- ✅ Environment variable for AUTH_SECRET
- ✅ Input validation with Zod schemas
- ✅ CORS-safe API endpoints
- ✅ XSS protection through React
- ✅ Secure session management with localStorage

## 🎨 UI Components

All components built with Tailwind CSS and shadcn/ui patterns:
- Button - Primary, outline, and destructive variants
- Card - Content container with shadow and hover effects
- Input - Text input with validation
- Label - Form labels
- Select - Dropdown selection
- Table - Data table with headers and rows
- ProtectedRoute - Wrapper for role-based route access

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly buttons and forms
- Optimized for desktop, tablet, and mobile screens

## 🐛 Error Handling

- Comprehensive try-catch blocks in API routes
- User-friendly error messages with toast notifications
- Proper HTTP status codes (400, 401, 403, 404, 500)
- Validation error feedback in forms
- Safe date handling with error fallbacks

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Appointments
- `GET /api/appointments` - List appointments (with filters)
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments` - Update appointment status

### Patients
- `GET /api/patients` - List all patients
- `GET /api/patients?me=true` - Get current user's profile
- `POST /api/patients` - Create patient profile

### Doctors
- `GET /api/doctors` - List all doctors
- `POST /api/doctors` - Create doctor profile

## 📦 Dependencies

Key npm packages:
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `prisma` - ORM
- `react-hook-form` - Form management
- `zod` - Schema validation
- `react-hot-toast` - Notifications
- `date-fns` - Date utilities
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT tokens
- `tailwindcss` - Styling

## 🔄 Development Workflow

1. Create feature branch from main
2. Make changes and test locally
3. Run linter: `npm run lint -- --fix`
4. Build: `npm run build`
5. Commit with descriptive message
6. Push and create pull request
7. Merge after code review

## 📝 Conventions

- **TypeScript**: All components and utilities use TypeScript
- **Naming**: camelCase for variables, PascalCase for components
- **Files**: Pages in `/app`, components in `/components`, utilities in `/lib`
- **Imports**: Use `@/` for absolute imports
- **Comments**: Add comments for complex logic

## 🤝 Contributing

This is a demonstration project showcasing modern full-stack development practices with Next.js 16, TypeScript, and PostgreSQL.

## 📄 License

MIT

---

**Built with ❤️ using Next.js 16, TypeScript, and PostgreSQL**
