
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  //check if there is token
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    //verifying if token is valid
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // Attaching user to request is not directly supported in middleware,
    // For now, i'll allow request to proceed if token is valid.
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}

// middleware to apply to specific routes
export const config = {
  matcher: ["/api/medistar/:path*"]
}

