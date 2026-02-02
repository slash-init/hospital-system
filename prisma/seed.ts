import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Clearing existing data...');
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany();

  // Hash password for all demo users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin Users
  console.log('👤 Creating admin users...');
  const admin1 = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@hospital.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      name: 'Sarah Johnson',
      email: 'sarah.admin@hospital.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create Doctors
  console.log('👨‍⚕️ Creating doctors...');
  const doctorUsers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Dr. John Smith',
        email: 'john.smith@hospital.com',
        password: hashedPassword,
        role: 'DOCTOR',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dr. Emily Chen',
        email: 'emily.chen@hospital.com',
        password: hashedPassword,
        role: 'DOCTOR',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dr. Michael Rodriguez',
        email: 'michael.rodriguez@hospital.com',
        password: hashedPassword,
        role: 'DOCTOR',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dr. Sarah Williams',
        email: 'sarah.williams@hospital.com',
        password: hashedPassword,
        role: 'DOCTOR',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dr. David Lee',
        email: 'david.lee@hospital.com',
        password: hashedPassword,
        role: 'DOCTOR',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dr. Maria Garcia',
        email: 'maria.garcia@hospital.com',
        password: hashedPassword,
        role: 'DOCTOR',
      },
    }),
  ]);

  // Create Doctor Profiles
  console.log('🏥 Creating doctor profiles...');
  const doctors = await Promise.all([
    prisma.doctor.create({
      data: {
        userId: doctorUsers[0].id,
        specialization: 'Cardiology',
        department: 'Cardiology',
      },
    }),
    prisma.doctor.create({
      data: {
        userId: doctorUsers[1].id,
        specialization: 'Pediatrics',
        department: 'Pediatrics',
      },
    }),
    prisma.doctor.create({
      data: {
        userId: doctorUsers[2].id,
        specialization: 'Orthopedics',
        department: 'Orthopedics',
      },
    }),
    prisma.doctor.create({
      data: {
        userId: doctorUsers[3].id,
        specialization: 'Neurology',
        department: 'Neurology',
      },
    }),
    prisma.doctor.create({
      data: {
        userId: doctorUsers[4].id,
        specialization: 'General Medicine',
        department: 'General Medicine',
      },
    }),
    prisma.doctor.create({
      data: {
        userId: doctorUsers[5].id,
        specialization: 'Dermatology',
        department: 'Dermatology',
      },
    }),
  ]);

  // Create Patients
  console.log('🤒 Creating patients...');
  const patientUsers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        password: hashedPassword,
        role: 'PATIENT',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob Smith',
        email: 'bob.smith@email.com',
        password: hashedPassword,
        role: 'PATIENT',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Charlie Brown',
        email: 'charlie.brown@email.com',
        password: hashedPassword,
        role: 'PATIENT',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Diana Wilson',
        email: 'diana.wilson@email.com',
        password: hashedPassword,
        role: 'PATIENT',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Ethan Davis',
        email: 'ethan.davis@email.com',
        password: hashedPassword,
        role: 'PATIENT',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Fiona Martinez',
        email: 'fiona.martinez@email.com',
        password: hashedPassword,
        role: 'PATIENT',
      },
    }),
    prisma.user.create({
      data: {
        name: 'George Taylor',
        email: 'george.taylor@email.com',
        password: hashedPassword,
        role: 'PATIENT',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Hannah Anderson',
        email: 'hannah.anderson@email.com',
        password: hashedPassword,
        role: 'PATIENT',
      },
    }),
  ]);

  // Create Patient Profiles
  console.log('📋 Creating patient profiles...');
  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        userId: patientUsers[0].id,
        age: 28,
        gender: 'Female',
        phone: '+1-555-0101',
      },
    }),
    prisma.patient.create({
      data: {
        userId: patientUsers[1].id,
        age: 35,
        gender: 'Male',
        phone: '+1-555-0102',
      },
    }),
    prisma.patient.create({
      data: {
        userId: patientUsers[2].id,
        age: 42,
        gender: 'Male',
        phone: '+1-555-0103',
      },
    }),
    prisma.patient.create({
      data: {
        userId: patientUsers[3].id,
        age: 31,
        gender: 'Female',
        phone: '+1-555-0104',
      },
    }),
    prisma.patient.create({
      data: {
        userId: patientUsers[4].id,
        age: 25,
        gender: 'Male',
        phone: '+1-555-0105',
      },
    }),
    prisma.patient.create({
      data: {
        userId: patientUsers[5].id,
        age: 38,
        gender: 'Female',
        phone: '+1-555-0106',
      },
    }),
    prisma.patient.create({
      data: {
        userId: patientUsers[6].id,
        age: 55,
        gender: 'Male',
        phone: '+1-555-0107',
      },
    }),
    prisma.patient.create({
      data: {
        userId: patientUsers[7].id,
        age: 29,
        gender: 'Female',
        phone: '+1-555-0108',
      },
    }),
  ]);

  // Create Appointments
  console.log('📅 Creating appointments...');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  await Promise.all([
    // Today's appointments (for doctor dashboard)
    prisma.appointment.create({
      data: {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        date: new Date(new Date().setHours(9, 0, 0, 0)),
        status: 'PENDING',
      },
    }),
    prisma.appointment.create({
      data: {
        patientId: patients[1].id,
        doctorId: doctors[0].id,
        date: new Date(new Date().setHours(10, 30, 0, 0)),
        status: 'CONFIRMED',
      },
    }),
    prisma.appointment.create({
      data: {
        patientId: patients[2].id,
        doctorId: doctors[1].id,
        date: new Date(new Date().setHours(11, 0, 0, 0)),
        status: 'PENDING',
      },
    }),
    prisma.appointment.create({
      data: {
        patientId: patients[3].id,
        doctorId: doctors[2].id,
        date: new Date(new Date().setHours(14, 0, 0, 0)),
        status: 'CONFIRMED',
      },
    }),
    
    // Tomorrow's appointments
    prisma.appointment.create({
      data: {
        patientId: patients[4].id,
        doctorId: doctors[0].id,
        date: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          d.setHours(9, 0, 0, 0);
          return d;
        })(),
        status: 'PENDING',
      },
    }),
    prisma.appointment.create({
      data: {
        patientId: patients[5].id,
        doctorId: doctors[1].id,
        date: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          d.setHours(10, 0, 0, 0);
          return d;
        })(),
        status: 'CONFIRMED',
      },
    }),
    
    // Next week appointments
    prisma.appointment.create({
      data: {
        patientId: patients[6].id,
        doctorId: doctors[3].id,
        date: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 7);
          d.setHours(13, 0, 0, 0);
          return d;
        })(),
        status: 'PENDING',
      },
    }),
    prisma.appointment.create({
      data: {
        patientId: patients[7].id,
        doctorId: doctors[4].id,
        date: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 7);
          d.setHours(15, 30, 0, 0);
          return d;
        })(),
        status: 'CONFIRMED',
      },
    }),
    
    // Past appointments (completed)
    prisma.appointment.create({
      data: {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        date: (() => {
          const d = new Date();
          d.setDate(d.getDate() - 1);
          d.setHours(10, 0, 0, 0);
          return d;
        })(),
        status: 'COMPLETED',
      },
    }),
    prisma.appointment.create({
      data: {
        patientId: patients[1].id,
        doctorId: doctors[2].id,
        date: (() => {
          const d = new Date();
          d.setDate(d.getDate() - 1);
          d.setHours(14, 0, 0, 0);
          return d;
        })(),
        status: 'COMPLETED',
      },
    }),
  ]);

  console.log('✅ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   👤 Admins: 2`);
  console.log(`   👨‍⚕️ Doctors: 6`);
  console.log(`   🤒 Patients: 8`);
  console.log(`   📅 Appointments: 10`);
  console.log('\n🔑 Login Credentials:');
  console.log('   All users have password: password123');
  console.log('\n   Admin: admin@hospital.com');
  console.log('   Doctor: john.smith@hospital.com (Cardiology)');
  console.log('   Patient: alice.johnson@email.com');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
