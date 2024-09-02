import { hashPass } from "../../helpers/crypt";
import connect from "../../lib/db/connect";
import Doctor from "../../lib/db/schemas/Doctor";
import { NextResponse } from "next/server";


export async function POST(request: any) {
  try {
    //connect to db
    await connect();

    //get response
    const form = await request.json();
    console.log(form)
    const { firstName, secondName, email, password } = form;


    //check if user exists
    const userExists = await Doctor.findOne({ email: email });
    console.log(userExists)

    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }


    //hash password
    const hashedPass = await hashPass(password);

    //new doctor registration
    const newDoctor = new Doctor({
      firstName: firstName,
      secondName: secondName,
      email: email,
      password: hashedPass
    })

    //save to db
    const isSaved = await newDoctor.save();
    console.log(isSaved)

    return NextResponse.json({ message: "User registered succefully" }, { status: 200 })

  } catch (err) {
    console.log("Error during user Registrations", err);
    return NextResponse.json({ message: "Internal Server error" }, { status: 500 })
  }
}
