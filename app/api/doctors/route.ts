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

    const doctors = await prisma.doctor.findMany({
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
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
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

    if (decoded.role !== "DOCTOR") {
      return NextResponse.json(
        { error: "Only users with DOCTOR role can create a patient profile." },
        { status: 403 }
      );
    }

    const { specialization, department } = await req.json();

    // Input validation
    if (!specialization || !department) {
      return NextResponse.json(
        { error: "Missing required fields: specialization, department" },
        { status: 400 }
      );
    }

    // Check if doctor profile already exists
    const existingDoc = await prisma.doctor.findUnique({
      where: { userId: decoded.userId }
    });

    if (existingDoc) {
      return NextResponse.json(
        { error: "Doctor profile already exists" },
        { status: 409 }
      );
    }

    const doctor = await prisma.doctor.create({
      data: {
        userId: decoded.userId,
        specialization,
        department
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error("Failed to create doctor:", error);
    return NextResponse.json(
      { error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}