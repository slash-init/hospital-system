import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        const currentUser = await prisma.user.findUnique({
            where: { email },
        })

        if (!currentUser?.password) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(body.password, currentUser.password)

        if (isMatch) {
            const secret = process.env.AUTH_SECRET;
            if (!secret) {
                return NextResponse.json(
                    { error: "Server configuration error" },
                    { status: 500 }
                );
            }

            const token = jwt.sign(
                { userId: currentUser.id, role: currentUser.role },
                secret,
                { expiresIn: "7d" }
            );

            return NextResponse.json(
                { 
                    user: { 
                        id: currentUser.id, 
                        email: currentUser.email, 
                        name: currentUser.name, 
                        role: currentUser.role 
                    }, 
                    token 
                }, 
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            )
        }
    } catch {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}