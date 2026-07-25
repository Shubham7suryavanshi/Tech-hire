import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import DashboardClient from "./DashboardClient";

// Opt out of static generation/rendering cache so it always queries the latest data on request
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await connectDB();
  
  // Fetch leads and sort by creation timestamp descending
  const rawLeads = await Lead.find({}).sort({ createdAt: -1 }).lean();
  
  // Serialize Mongo documents to pass to client component safely (avoid ObjectId/Date serialization errors)
  const leads = rawLeads.map((lead: any) => ({
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    budgetRange: lead.budgetRange,
    message: lead.message || "",
    status: lead.status || "New",
    createdAt: lead.createdAt ? lead.createdAt.toISOString() : new Date().toISOString(),
  }));

  return <DashboardClient initialLeads={leads} />;
}
