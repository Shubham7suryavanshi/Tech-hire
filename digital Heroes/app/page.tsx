"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { leadSchema, type LeadInput } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Sparkles,
  Send,
  CheckCircle2,
  User,
  Mail,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Zap,
  ShieldCheck,
  ClipboardList,
  Users,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Share your needs",
    description:
      "Tell us about the role, budget, and project scope in under a minute.",
  },
  {
    icon: Users,
    title: "We match you",
    description:
      "Our team reviews your application and lines up the right talent fast.",
  },
  {
    icon: Rocket,
    title: "Start building",
    description:
      "Kick off your project with a vetted hire and a clear, simple handoff.",
  },
];

const partnerCompanies = [
  { name: "Vertex Labs", src: "/logos/partner-3.png" },
  { name: "Quantum One AI", src: "/logos/vertex-labs.png" },
  { name: "Northstar AI", src: "/logos/quantum-one.png" },
  { name: "Aurelia", src: "/logos/partner-10.png" },
  { name: "Pulse Forge", src: "/logos/partner-9.png" },
  { name: "Lumen Works", src: "/logos/partner-8.png" },
  { name: "Nova Stack", src: "/logos/partner-7.png" },
  { name: "Helio Systems", src: "/logos/partner-6.png" },
  { name: "Crest Digital", src: "/logos/partner-5.png" },
  { name: "Orbit IO", src: "/logos/partner-4.png" },
];

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      budgetRange: undefined,
      message: "",
    },
  });

  const onSubmit = async (data: LeadInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error?.message || "Something went wrong. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit form. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-black">
      <Header />

      <main
        id="overview"
        className="flex-1 bg-[url('/background.png')] bg-fixed bg-cover bg-center text-slate-100 flex flex-col relative"
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] pointer-events-none" />
        {/* Subtle tech grid accent */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/grid-overlay.svg')" }}
        />

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto w-full px-6 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 flex-1">
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Next-Gen Tech Hiring
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
              Hire Top Tech Talent with{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Precision
              </span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-xl">
              Streamline your client intake, track hiring requirements, and manage high-value opportunities from a unified, modern dashboard.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-slate-900">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold text-lg text-slate-100">10x</span>
                </div>
                <p className="text-xs text-slate-500">Capture Rate Increase</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold text-lg text-slate-100">&lt; 1s</span>
                </div>
                <p className="text-xs text-slate-500">Real-Time Intake</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-lg text-slate-100">100%</span>
                </div>
                <p className="text-xs text-slate-500">Data Validation</p>
              </div>
            </div>
          </div>

          {/* Lead Capture Form Card */}
          <div id="get-started" className="lg:col-span-6 flex justify-center lg:justify-end scroll-mt-28">
            <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl shadow-black/40 relative transition-all duration-500 hover:shadow-indigo-500/20 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form-container"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 relative z-10"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Get Started</h2>
                      <p className="text-sm text-slate-500 mt-1">Tell us about your project and budget</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Full Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Your Full Name"
                          {...register("name")}
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500 rounded-xl h-11 transition-all duration-200 hover:border-slate-300"
                        />
                        {errors.name && (
                          <p className="text-xs text-rose-500 font-medium mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          Email Address
                        </label>
                        <Input
                          type="email"
                          placeholder="techHire@gmail.com"
                          {...register("email")}
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500 rounded-xl h-11 transition-all duration-200 hover:border-slate-300"
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-500 font-medium mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Budget Range */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                          Project Budget
                        </label>
                        <Controller
                          name="budgetRange"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 focus:ring-indigo-500/40 focus:border-indigo-500 rounded-xl h-11 transition-all duration-200 hover:border-slate-300">
                                <SelectValue placeholder="Select a budget range" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-slate-200 text-slate-900">
                                <SelectItem value="<1k">&lt; $1,000</SelectItem>
                                <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                                <SelectItem value="5k-20k">$5,000 - $20,000</SelectItem>
                                <SelectItem value="20k+">$20,000+</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.budgetRange && (
                          <p className="text-xs text-rose-500 font-medium mt-1">{errors.budgetRange.message}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          Project Description
                        </label>
                        <Textarea
                          placeholder="Tell us about what you want to build..."
                          {...register("message")}
                          rows={4}
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500 rounded-xl resize-none transition-all duration-200 hover:border-slate-300"
                        />
                        {errors.message && (
                          <p className="text-xs text-rose-500 font-medium mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      {submitError && (
                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium">
                          {submitError}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl h-11 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            Submit Application
                            <Send className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                    className="py-12 text-center flex flex-col items-center justify-center space-y-6 relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 150, damping: 10 }}
                      className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/5"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-slate-900">Application Received!</h3>
                      <p className="text-sm text-slate-500 max-w-[280px] mx-auto">
                        Thank you for submitting your details. Our team will review your application and contact you soon.
                      </p>
                    </div>

                    <Button
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200"
                    >
                      Submit another response
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Partner Companies */}
        <div className="w-full px-4 sm:px-6 pb-8 relative z-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-700/80 bg-[linear-gradient(135deg,rgba(241,245,249,0.98),rgba(226,232,240,0.96),rgba(203,213,225,0.95))] p-6 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
              <div className="max-w-xl space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Trusted by growth teams
                </div>
                <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  Partners building faster with Tech Hire
                </h2>
                <p className="text-sm text-slate-600 sm:text-base">
                  A curated network of product, data, and innovation partners scaling high-impact hiring programs.
                </p>
              </div>
              <div className="inline-flex items-center self-start rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-sm font-medium text-slate-700">
                10+ companies onboarded
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.4rem] border border-slate-300/70 bg-slate-100/70 p-2 sm:p-3">
              <div className="partner-marquee flex w-max py-1">
                {[...partnerCompanies, ...partnerCompanies].map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="group m-2 flex min-w-[240px] items-center gap-3 rounded-2xl border border-slate-300 bg-white/90 px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_12px_30px_rgba(15,23,42,0.14)]"
                  >
                    <img src={partner.src} alt={partner.name} className="h-9 w-9 object-contain rounded-lg flex-shrink-0" />
                    <span className="text-sm font-semibold tracking-wide text-slate-700">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div id="how-it-works" className="max-w-7xl mx-auto w-full px-6 pb-20 relative z-10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">How it works</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Three simple steps from submission to a successful hire.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 space-y-3 transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-100">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
