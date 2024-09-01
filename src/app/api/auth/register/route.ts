import { hashPass } from "../../helpers/crypt";
import { connect } from "../../lib/db/connect";
import Doctor from "../../lib/db/schemas/Doctor";
import { NextResponse } from "next/server";


export async function POST(request: any) {
  try {
    const form = await request.json();
    const { firstName, secondName, email, password } = form;

    //connect to db
    await connect();
    const userExists = Doctor.findOne({ email: email });

    if (!!userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    const hashedPass = await hashPass(password);

    const newDoctor = new Doctor({
      firstName: firstName,
      secondName: secondName,
      email: email,
      password: hashedPass
    })

    await newDoctor.save();

    return NextResponse.json({ message: "User registered succefully" }, { status: 200 })

  } catch (err) {
    console.log("Error during user Registrations", err);
    return NextResponse.json({ message: "Internal Server error" }, { status: 500 })
  }
}
