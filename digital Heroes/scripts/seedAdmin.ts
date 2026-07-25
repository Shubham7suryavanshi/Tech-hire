import { connectDB } from "../lib/mongodb";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";

async function seed() {
  const email = "admin@leaddesk.com";
  const password = "SuperSecretPassword123!";
  
  console.log("Connecting to MongoDB database...");
  await connectDB();

  console.log("Checking if admin account already exists...");
  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`Admin with email ${email} already exists! Skipping creation.`);
    process.exit(0);
  }

  console.log("Hashing the password...");
  const passwordHash = await bcrypt.hash(password, 12);

  console.log("Creating the admin user account...");
  await Admin.create({
    email: email.toLowerCase(),
    passwordHash,
  });

  console.log("-----------------------------------------");
  console.log("Seeding process completed successfully!");
  console.log(`Admin Login Email   : ${email}`);
  console.log(`Admin Login Password: ${password}`);
  console.log("-----------------------------------------");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed with error:", err);
  process.exit(1);
});
