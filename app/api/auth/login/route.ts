import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";

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
            return NextResponse.json(currentUser, { status: 201 });
        } else {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}