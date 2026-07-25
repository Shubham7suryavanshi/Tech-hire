import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { leadSchema } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    await connectDB();
    const lead = await Lead.create(parsed.data);
    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: error.message || "Failed to submit lead" }, { status: 500 });
  }
}
