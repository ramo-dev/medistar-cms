import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  allergies: {
    type: [String],
    default: [],
  },
  chronicConditions: {
    type: [String],
    default: [],
  },
  visits: [
    {
      date: {
        type: Date,
        required: true,
      },
      reason: {
        type: String,
        required: true,
      },
      doctor: {
        type: String,
        required: true,
      },
      medications: {
        type: String,
        required: true,
      },
    }
  ],
  medications: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      frequency: {
        type: String,
        required: true,
      },
    }
  ]
});

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
