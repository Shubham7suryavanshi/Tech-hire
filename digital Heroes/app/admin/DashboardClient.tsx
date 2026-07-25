"use client";

import { useState, useMemo } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  LogOut, 
  Search, 
  User, 
  Mail, 
  Briefcase, 
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Inbox,
  CheckCircle,
  Clock,
  Sparkles
} from "lucide-react";

interface LeadData {
  id: string;
  name: string;
  email: string;
  budgetRange: string;
  message: string;
  status: "New" | "Contacted" | "Closed";
  createdAt: string;
}

interface DashboardClientProps {
  initialLeads: LeadData[];
}

export default function DashboardClient({ initialLeads }: DashboardClientProps) {
  const [leads, setLeads] = useState<LeadData[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLeads, setExpandedLeads] = useState<Record<string, boolean>>({});

  // Client-side search matching name and email
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const query = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query)
      );
    });
  }, [leads, searchQuery]);

  // Compute live metrics based on state
  const metrics = useMemo(() => {
    const stats = { new: 0, contacted: 0, closed: 0 };
    leads.forEach((l) => {
      if (l.status === "New") stats.new++;
      if (l.status === "Contacted") stats.contacted++;
      if (l.status === "Closed") stats.closed++;
    });
    return stats;
  }, [leads]);

  const toggleExpand = (id: string) => {
    setExpandedLeads((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Optimistic status update handler
  const handleStatusChange = async (leadId: string, newStatus: "New" | "Contacted" | "Closed") => {
    const previousLeads = [...leads];
    
    // Update local state optimistically
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status on server");
      }
    } catch (error) {
      console.error("Status update failed:", error);
      // Revert state on error
      setLeads(previousLeads);
      alert("Failed to update lead status. Reverting changes.");
    }
  };

  return (
    <div className="flex-1 bg-black bg-[url('/background.png')] bg-fixed bg-cover bg-center text-slate-100 flex flex-col min-h-screen relative">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-900/20 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
              Tech<span className="text-indigo-400">Hire</span><span className="text-indigo-500 font-medium text-xs ml-1">Dashboard</span>
            </span>
          </div>

          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="outline"
            className="border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl flex items-center gap-2 h-9 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-10 space-y-8 relative z-10 flex-1">
        {/* Page title & stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leads Intake</h1>
            <p className="text-sm text-slate-400 mt-1">Monitor, review, and progress client leads</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-1.5 px-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs text-slate-400 font-medium">{metrics.new} New</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-1.5 px-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs text-slate-400 font-medium">{metrics.contacted} Contacted</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-1.5 px-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-400 font-medium">{metrics.closed} Closed</span>
            </div>
          </div>
        </div>

        {/* Search controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search leads by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900/50 border-slate-800 text-slate-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-xl"
            />
          </div>
          <div className="text-xs text-slate-500 font-medium self-end md:self-center">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </div>

        {/* Lead Table / List Card */}
        <div className="bg-slate-900/35 border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
          {filteredLeads.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-500">
                <Inbox className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-200">No leads found</h3>
                <p className="text-sm text-slate-500 max-w-[280px]">
                  {searchQuery ? "Try searching for a different name or email address." : "Incoming client leads will appear here."}
                </p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-900/60 border-b border-slate-800">
                <TableRow className="border-b border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400 font-semibold py-4 pl-6">Client Info</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Budget</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Status</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Submitted Date</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-right pr-6">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => {
                  const isExpanded = !!expandedLeads[lead.id];
                  return (
                    <>
                      <TableRow 
                        key={lead.id}
                        className="border-b border-slate-900 hover:bg-slate-900/20 transition-colors"
                      >
                        {/* Client Info */}
                        <TableCell className="py-4 pl-6">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-100 flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-slate-500" />
                              {lead.name}
                            </span>
                            <span className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-600" />
                              {lead.email}
                            </span>
                          </div>
                        </TableCell>

                        {/* Budget */}
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md font-medium text-xs py-0.5"
                          >
                            {lead.budgetRange === "<1k" ? "< $1,000" : 
                             lead.budgetRange === "1k-5k" ? "$1,000 - $5,000" :
                             lead.budgetRange === "5k-20k" ? "$5,000 - $20,000" : "$20,000+"}
                          </Badge>
                        </TableCell>

                        {/* Status Select */}
                        <TableCell>
                          <div className="w-36">
                            <Select
                              value={lead.status}
                              onValueChange={(val) => handleStatusChange(lead.id, val as any)}
                            >
                              <SelectTrigger className="h-8 border-slate-800 bg-slate-950/60 text-xs rounded-lg focus:ring-indigo-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                                <SelectItem value="New">
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    New
                                  </div>
                                </SelectItem>
                                <SelectItem value="Contacted">
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    Contacted
                                  </div>
                                </SelectItem>
                                <SelectItem value="Closed">
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Closed
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>

                        {/* Date */}
                        <TableCell className="text-xs text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-600" />
                            {new Date(lead.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </TableCell>

                        {/* Expand Action */}
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpand(lead.id)}
                            className="text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg p-1.5 h-8 w-8"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                        </TableCell>
                      </TableRow>

                      {/* Expandable Message Box */}
                      {isExpanded && (
                        <TableRow key={`${lead.id}-details`} className="bg-slate-950/40 border-b border-slate-900">
                          <TableCell colSpan={5} className="py-4 px-8">
                            <div className="space-y-2 max-w-3xl">
                              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Project Description / Message
                              </div>
                              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap pl-5 border-l border-slate-800">
                                {lead.message || <span className="text-slate-600 italic">No description provided.</span>}
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
