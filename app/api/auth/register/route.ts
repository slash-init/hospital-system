import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const secret = process.env.AUTH_SECRET;
        if (!secret) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        // Normalize and validate role
        const normalizedRole = typeof role === 'string' ? role.toUpperCase() : '';
        const ALLOWED_SELF_REGISTER_ROLES = ['PATIENT', 'DOCTOR'];

        // Prevent ADMIN self-registration and validate against allowlist
        if (normalizedRole === 'ADMIN' || !ALLOWED_SELF_REGISTER_ROLES.includes(normalizedRole)) {
            return NextResponse.json(
                { error: "Cannot self-register as ADMIN" },
                { status: 403 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: normalizedRole,
            },
        });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            secret,
            { expiresIn: "7d" }
        );

        return NextResponse.json(
            { 
                user: { 
                    id: user.id, 
                    email: user.email, 
                    name: user.name, 
                    role: user.role 
                }, 
                token 
            }, 
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}