"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, Zap, Lock, Mail } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-xl font-medium flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-slate-500" />
          Admin Email
        </label>
        <Input
          type="email"
          placeholder="admin@leaddesk.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-slate-950/60 border-slate-800 text-slate-100 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-xl h-11"
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          Password
        </label>
        <Input
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-slate-950/60 border-slate-800 text-slate-100 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-xl h-11"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl h-11 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 mt-2"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Signing in...
          </div>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex-1 bg-black bg-[url('/background.png')] bg-fixed bg-cover bg-center text-slate-100 flex flex-col justify-center items-center px-6 py-12 relative min-h-screen">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 space-y-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
            <p className="text-sm text-slate-400">Sign in to manage your incoming leads</p>
          </div>
        </div>

        {/* Suspense Wrapped Login Form */}
        <Suspense fallback={
          <div className="flex flex-col justify-center items-center py-8">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-slate-500 mt-2">Loading authentication...</span>
          </div>
        }>
          <LoginForm />
        </Suspense>

        {/* Back Link */}
        <div className="text-center">
          <a
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            &larr; Back to public site
          </a>
        </div>
      </div>
    </div>
  );
}
