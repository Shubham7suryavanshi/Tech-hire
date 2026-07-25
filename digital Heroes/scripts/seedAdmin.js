require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI not found in environment variables");
  process.exit(1);
}

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function seed() {
  const email = "shubhamsuryavanshi7643@gmail.com";
  const password = "Rits@7643";
  
  console.log("Connecting to MongoDB database...");
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB");

    console.log("Checking if admin account already exists...");
    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log(`✓ Admin with email ${email} already exists!`);
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
    console.log("✓ Seeding process completed successfully!");
    console.log(`Admin Login Email   : ${email}`);
    console.log(`Admin Login Password: ${password}`);
    console.log("-----------------------------------------");
    process.exit(0);
  } catch (err) {
    console.error("✗ Seeding failed with error:", err.message);
    process.exit(1);
  }
}

seed();
