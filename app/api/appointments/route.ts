import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const user = await verifyToken(req);
        const { searchParams } = new URL(req.url);
        const me = searchParams.get("me");
        const date = searchParams.get("date");

        if (!user?.userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const where: Record<string, unknown> = {};

        // For non-admin users, require valid 'me' parameter
        if (user.role !== "ADMIN") {
            if (!me || (me !== "patient" && me !== "doctor")) {
                return NextResponse.json(
                    { error: "Missing or invalid 'me' parameter. Must be 'patient' or 'doctor'" },
                    { status: 400 }
                );
            }

            // Filter by user role
            if (me === "patient") {
                const patient = await prisma.patient.findUnique({
                    where: { userId: user.userId }
                });
                if (!patient) {
                    return NextResponse.json(
                        { error: "Patient profile not found" },
                        { status: 404 }
                    );
                }
                where.patientId = patient.id;
            } else if (me === "doctor") {
                const doctor = await prisma.doctor.findUnique({
                    where: { userId: user.userId }
                });
                if (!doctor) {
                    return NextResponse.json(
                        { error: "Doctor profile not found" },
                        { status: 404 }
                    );
                }
                where.doctorId = doctor.id;
            }
        } else if (me) {
            // Admin can optionally filter by 'me' parameter
            if (me === "patient") {
                const patient = await prisma.patient.findUnique({
                    where: { userId: user.userId }
                });
                if (!patient) {
                    return NextResponse.json(
                        { error: "Patient profile not found" },
                        { status: 404 }
                    );
                }
                where.patientId = patient.id;
            } else if (me === "doctor") {
                const doctor = await prisma.doctor.findUnique({
                    where: { userId: user.userId }
                });
                if (!doctor) {
                    return NextResponse.json(
                        { error: "Doctor profile not found" },
                        { status: 404 }
                    );
                }
                where.doctorId = doctor.id;
            }
        }

        // Filter by date
        if (date === "today") {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            where.date = {
                gte: today,
                lt: tomorrow
            };
        }

        const appointments = await prisma.appointment.findMany({
            where,
            include: {
                patient: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                doctor: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        });
        
        return NextResponse.json(appointments);
    } catch (error) {
        console.error("Failed to fetch appointments:", error);
        return NextResponse.json(
            { error: "Failed to fetch appointments" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const user = await verifyToken(req);

        if (!user?.userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (user?.role !== "PATIENT") {
            return NextResponse.json(
                { error: "Only Patients can create Appointments." },
                { status: 403 }
            );
        }

        const { date, doctorId } = await req.json();

        // Input validation
        if (!date || !doctorId) {
            return NextResponse.json(
                { error: "Missing required fields: date, doctorId" },
                { status: 400 }
            );
        }

        // Validate date
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return NextResponse.json(
                { error: "Invalid date format" },
                { status: 400 }
            );
        }

        // Validate doctor exists
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctor) {
            return NextResponse.json(
                { error: "Doctor not found" },
                { status: 400 }
            );
        }

        // Get patient ID from user ID
        const patient = await prisma.patient.findUnique({
            where: { userId: user.userId }
        });

        if (!patient) {
            return NextResponse.json(
                { error: "Patient profile not found. Please create a patient profile first." },
                { status: 404 }
            );
        }

        const appointment = await prisma.appointment.create({
            data: {
                patientId: patient.id,
                date: parsedDate,
                doctorId
            },
            include: {
                patient: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                doctor: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
        console.error("Failed to create appointment:", error);
        return NextResponse.json(
            { error: "Failed to create appointment" },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const user = await verifyToken(req);

        if (!user?.userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (user.role !== "DOCTOR" && user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Only Doctors and Admins can update appointments" },
                { status: 403 }
            );
        }

        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json(
                { error: "Missing required fields: id, status" },
                { status: 400 }
            );
        }

        // Validate status
        const validStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 }
            );
        }

        // Check if appointment exists (for both DOCTOR and ADMIN)
        const existingAppointment = await prisma.appointment.findUnique({
            where: { id },
            include: { doctor: true }
        });

        if (!existingAppointment) {
            return NextResponse.json(
                { error: "Appointment not found" },
                { status: 404 }
            );
        }

        // Check if doctor can only modify their own appointments
        if (user.role === "DOCTOR") {
            if (existingAppointment.doctor.userId !== user.userId) {
                return NextResponse.json(
                    { error: "Doctors can only modify their own appointments" },
                    { status: 403 }
                );
            }
        }

        const appointment = await prisma.appointment.update({
            where: { id },
            data: { status },
            include: {
                patient: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                doctor: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(appointment);
    } catch (error) {
        console.error("Failed to update appointment:", error);
        return NextResponse.json(
            { error: "Failed to update appointment" },
            { status: 500 }
        );
    }
}