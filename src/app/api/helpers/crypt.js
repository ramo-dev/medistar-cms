import bcrypt from "bcrypt";

export async function hashPass(password) {
  const SALT_ROUNDS = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (err) {
    console.log("Error hashing password", err)
    throw new Error("Failed hashing password")
  }
}

