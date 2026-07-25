import mongoose, { Schema } from "mongoose";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true },
    budgetRange: {
      type: String,
      required: true,
      enum: ["<1k", "1k-5k", "5k-20k", "20k+"],
    },
    message: { type: String, maxlength: 1000 },
    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
