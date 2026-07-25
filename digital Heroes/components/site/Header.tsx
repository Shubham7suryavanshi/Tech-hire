"use client";

import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Get Started", href: "#get-started" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-900 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto w-full px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
            <Image src="/logo.svg" alt="Tech Hire logo" fill priority />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
            Tech<span className="text-indigo-400">Hire</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/admin"
            className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1.5 group"
          >
            Admin Portal
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#get-started"
            className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200"
          >
            Hire Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden text-slate-300 hover:text-white transition-colors p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 flex flex-col gap-4 border-t border-slate-900 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/admin"
            className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5"
          >
            Admin Portal
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#get-started"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 rounded-xl text-center shadow-lg shadow-indigo-600/20"
          >
            Hire Now
          </a>
        </div>
      </div>
    </header>
  );
}
