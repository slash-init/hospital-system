import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const user = await verifyToken(req);

    if (!user?.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const me = searchParams.get("me");

    // If requesting own profile
    if (me === "true") {
      const patient = await prisma.patient.findUnique({
        where: { userId: user.userId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              role: true
            }
          }
        }
      });

      if (!patient) {
        return NextResponse.json(
          { error: "Patient profile not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(patient);
    }

    // Only ADMIN and DOCTOR can view all patients
    if (user.role !== "ADMIN" && user.role !== "DOCTOR") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Otherwise return all patients
    const patients = await prisma.patient.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
    return NextResponse.json(patients);
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const decoded = await verifyToken(req);
    
    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (decoded.role !== "PATIENT") {
      return NextResponse.json(
        { error: "Only users with PATIENT role can create a patient profile." },
        { status: 403 }
      );
    }

    const { age, gender, phone } = await req.json();

    // Input validation
    if (age === undefined || !gender || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: age, gender, phone" },
        { status: 400 }
      );
    }

    // Check if patient profile already exists
    const existingPatient = await prisma.patient.findUnique({
      where: { userId: decoded.userId }
    });

    if (existingPatient) {
      return NextResponse.json(
        { error: "Patient profile already exists" },
        { status: 409 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        userId: decoded.userId,
        age,
        gender,
        phone,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error("Failed to create patient:", error);
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}