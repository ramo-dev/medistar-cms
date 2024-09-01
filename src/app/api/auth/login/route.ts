import { NextResponse } from "next/server";
import { connect } from "../../lib/db/connect";
import Doctor from "../../lib/db/schemas/Doctor";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: any) {
  try {
    await connect();

    const form = await request.json();
    console.log(form);

    const email = form.email

    // check if user exists
    const user = await Doctor.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ message: "email or password is invalid" }, { status: 401 });
    }

    //validate users pass
    const validUser = await bcrypt.compare(form.password, user.password);

    if (!validUser) {
      return NextResponse.json({ message: "email or password is invalid" }, { status: 401 });
    }

    //generate jwt in the response
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

    return NextResponse.json({ token: token, message: "Login successful", user: user }, { status: 200 })

  } catch (err) {
    return NextResponse.json({ message: "Internal server Error" }, { status: 500 })
  }

}

