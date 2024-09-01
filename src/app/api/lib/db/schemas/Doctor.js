import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    //required: true,
  },
  location: {
    //type: mongoose.Schema.Types.ObjectId,
    // ref: "Location",
    type: string,
  },
  admin: {
    type: Boolean,
    //default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
