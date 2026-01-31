import jwt from "jsonwebtoken";

// Define the JWT payload structure
interface JwtPayload {
  userId: string;
  role: string;
  // add other fields from your token if needed
}

export async function verifyToken(req: Request): Promise<JwtPayload | null> {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7);
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    console.error("AUTH_SECRET missing");
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded; // Extract the actual userId
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}