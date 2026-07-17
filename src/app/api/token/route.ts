import { auth } from "@/src/lib/auth";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

// This route issues a signed JWT for authenticated users.
// The JWT can then be sent to the Express backend for verification.
export async function GET(request: NextRequest) {
    try {
        // Get the session from Better Auth using the incoming request
        const session = await auth.api.getSession({
            headers: request.headers
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const secret = process.env.BETTER_AUTH_SECRET;
        if (!secret) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Encode secret as Uint8Array for jose
        const secretKey = new TextEncoder().encode(secret);

        // Sign a JWT containing the user's id and email
        const token = await new SignJWT({
            sub: session.user.id,
            email: session.user.email,
            name: session.user.name,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(secretKey);

        return NextResponse.json({ token });
    } catch (error) {
        console.error("Error generating token:", error);
        return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
    }
}
