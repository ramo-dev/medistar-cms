import { NextResponse } from "next/server";
import { connect } from "../../lib/db/connect";
import Doctors from "../../lib/db/schemas/Doctor"

export async function GET() {
  await connect();
  try {
    const doctors = await Doctors.find({})
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Failed to fetch docotors");
    return NextResponse.json({ message: "Failed to fetch Doctors" }, { status: 500 });
  }
}

export async function POST(request) {
  //await connect();
  try {
    const form = await request.json();
    const doctors = await Doctors.find({})
    return NextResponse.json(form);
  } catch (error) {
    console.error("Failed to fetch doctors", error);
    return NextResponse.json({ message: "Failed to fetch Doctors" }, { status: 500 });
  }
}

