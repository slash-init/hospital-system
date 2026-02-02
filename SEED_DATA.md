# 🌱 Demo Data Seed Information

## Successfully Seeded!

The database has been populated with realistic demo data for testing and demonstration purposes.

## 📊 Data Summary

- **Admins**: 2 users
- **Doctors**: 6 users with profiles
- **Patients**: 8 users with profiles  
- **Appointments**: 10 appointments (past, today, and upcoming)

## 🔑 Login Credentials

**All users have the same password: `password123`**

### Admin Accounts
- **Email**: `admin@hospital.com`
  - Name: Admin User
  
- **Email**: `sarah.admin@hospital.com`
  - Name: Sarah Johnson

### Doctor Accounts

| Email | Name | Specialization | Department |
|-------|------|----------------|------------|
| john.smith@hospital.com | Dr. John Smith | Cardiology | Cardiology |
| emily.chen@hospital.com | Dr. Emily Chen | Pediatrics | Pediatrics |
| michael.rodriguez@hospital.com | Dr. Michael Rodriguez | Orthopedics | Orthopedics |
| sarah.williams@hospital.com | Dr. Sarah Williams | Neurology | Neurology |
| david.lee@hospital.com | Dr. David Lee | General Medicine | General Medicine |
| maria.garcia@hospital.com | Dr. Maria Garcia | Dermatology | Dermatology |

### Patient Accounts

| Email | Name | Age | Gender | Phone |
|-------|------|-----|--------|-------|
| alice.johnson@email.com | Alice Johnson | 28 | Female | +1-555-0101 |
| bob.smith@email.com | Bob Smith | 35 | Male | +1-555-0102 |
| charlie.brown@email.com | Charlie Brown | 42 | Male | +1-555-0103 |
| diana.wilson@email.com | Diana Wilson | 31 | Female | +1-555-0104 |
| ethan.davis@email.com | Ethan Davis | 25 | Male | +1-555-0105 |
| fiona.martinez@email.com | Fiona Martinez | 38 | Female | +1-555-0106 |
| george.taylor@email.com | George Taylor | 55 | Male | +1-555-0107 |
| hannah.anderson@email.com | Hannah Anderson | 29 | Female | +1-555-0108 |

## 📅 Appointments

### Today's Appointments
- Alice Johnson → Dr. John Smith (Cardiology) at 9:00 AM - **PENDING**
- Bob Smith → Dr. John Smith (Cardiology) at 10:30 AM - **CONFIRMED**
- Charlie Brown → Dr. Emily Chen (Pediatrics) at 11:00 AM - **PENDING**
- Diana Wilson → Dr. Michael Rodriguez (Orthopedics) at 2:00 PM - **CONFIRMED**

### Upcoming Appointments
- Tomorrow: Ethan Davis → Dr. John Smith, Fiona Martinez → Dr. Emily Chen
- Next Week: George Taylor → Dr. Sarah Williams, Hannah Anderson → Dr. David Lee

### Past Appointments (Completed)
- Yesterday: Alice Johnson and Bob Smith had completed appointments

## 🧪 Testing Scenarios

### Test Patient Flow
1. Login as: `alice.johnson@email.com` / `password123`
2. View profile and appointments
3. Book a new appointment
4. Check appointment status

### Test Doctor Flow
1. Login as: `john.smith@hospital.com` / `password123`
2. View today's appointments (should see 2 appointments)
3. Confirm pending appointments
4. Complete confirmed appointments

### Test Admin Flow
1. Login as: `admin@hospital.com` / `password123`
2. View dashboard statistics
3. Browse all patients (8 total)
4. Browse all doctors (6 total)
5. View all appointments (10 total)
6. Use search functionality

## 🔄 Re-seeding

To clear and re-seed the database:

```bash
npm run seed
```

**Note**: This will delete all existing data and create fresh demo data.

## 📝 Notes

- All appointments are scheduled with realistic times
- Today's appointments are perfect for testing the doctor dashboard
- Patient profiles include diverse demographics
- Doctor specializations cover major departments
- Mix of PENDING, CONFIRMED, and COMPLETED appointment statuses

## 🎯 Quick Test Workflow

1. **Patient Dashboard**: Login as Alice → See profile + 2 appointments
2. **Doctor Dashboard**: Login as Dr. John Smith → See 2 today's appointments → Confirm/Complete them
3. **Admin Dashboard**: Login as Admin → See stats (2 admins, 6 doctors, 8 patients)
4. **Book Appointment**: Login as any patient → Book with any doctor
5. **Search**: Test search in patients/doctors pages

Enjoy testing with realistic demo data! 🎉
