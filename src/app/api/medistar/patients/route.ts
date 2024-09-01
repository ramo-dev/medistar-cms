import { NextResponse } from "next/server";
import { connect } from "../../lib/db/connect";
import Patients from "../../lib/db/schemas/Patient"

export async function GET() {
  await connect();
  try {
    const patients = await Patients.find({})
    return NextResponse.json(patients);
  } catch (error) {
    console.error("Failed to fetch docotors");
    return NextResponse.json({ message: "Failed to fetch Doctors" }, { status: 500 });
  }
}

