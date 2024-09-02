import { NextResponse } from "next/server";
import connect from "../../lib/db/connect";
import Doctor from "../../lib/db/schemas/Doctor";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function POST(request: any) {
  try {
    await connect();

    //check if form is empty
    const form = await request.json();
    //console.log(form)
    if (!form || !form.email || !form.password) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }


    const email = form.email;

    // Check if user exists
    const user = await Doctor.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ message: "Email or password is invalid" }, { status: 401 });
    }

    // Validate user's password
    const validUser = await bcrypt.compare(form.password, user.password);

    if (!validUser) {
      return NextResponse.json({ message: "Email or password is invalid" }, { status: 401 });
    }

    // Generate JWT in the response
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ token: token, message: "Login successful", user: user }, { status: 200 });

  } catch (err) {
    console.error(err); // Log error for debugging
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

