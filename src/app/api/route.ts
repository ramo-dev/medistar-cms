
// Import the connect function
import { connect } from "./lib/db/connect";
import { NextResponse } from "next/server";

// Define the GET handler
export async function GET() {
  try {
    await connect();
    return NextResponse.json({ message: "Hello world!" }, { status: 200 });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json({ message: "Failed accessing world" }, { status: 500 });
  }
}

