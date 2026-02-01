
# Hospital System (WIP)

Minimal hospital management system with authentication, patient/doctor roles, and appointment booking.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Prisma ORM + PostgreSQL
- Tailwind CSS
- JWT Auth

## Features (Current Level)

- User authentication (JWT)
- Role-based access: Patient, Doctor, Admin
- Patients can book appointments with doctors
- Doctors and patients are linked to user accounts
- Basic REST API for appointments

## Setup

1. Install dependencies:
	```bash
	npm install
	# or yarn, pnpm, bun
	```
2. Set up your PostgreSQL database and configure the connection in `.env`.
3. Run Prisma migrations:
	```bash
	npx prisma migrate dev
	```
4. Start the development server:
	```bash
	npm run dev
	```

## Notes
- This is an early-stage project. Many features are basic or incomplete.
- No production deployment or advanced validation yet.

