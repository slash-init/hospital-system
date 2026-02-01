import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
export async function GET(req: Request) {
    try {
        const appointments = await prisma.appointment.findMany();
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
                { error: "Missing required fields: date, doctorID" },
                { status: 400 }
            );
        }

        const appointment = await prisma.appointment.create({
            data: {
                patientId: user.userId,
                date,
                doctorId
            },
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