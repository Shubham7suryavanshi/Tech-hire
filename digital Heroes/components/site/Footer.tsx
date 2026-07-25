import Image from "next/image";
import { Mail } from "lucide-react";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2h3.1l-6.77 7.73L23.2 22h-6.24l-4.89-6.4L6.4 22H3.3l7.24-8.27L2 2h6.4l4.42 5.85L18.9 2zm-1.09 18.2h1.72L7.28 3.7H5.43l12.38 16.5z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.61-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z"
      />
    </svg>
  );
}

const footerLinks = {
  Product: [
    { label: "Overview", href: "#overview" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Get Started", href: "#get-started" },
  ],
  Company: [
    { label: "Admin Portal", href: "/admin" },
    { label: "Contact", href: "mailto:hello@techhire.com" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-900 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/20">
                <Image src="/logo.svg" alt="Tech Hire logo" fill />
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                Tech<span className="text-indigo-400">Hire</span>
              </span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              The fastest way to capture, qualify, and manage high-value tech
              hiring leads from a single, modern dashboard.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
                { icon: TwitterIcon, href: "#", label: "Twitter" },
                { icon: GithubIcon, href: "#", label: "GitHub" },
                { icon: Mail, href: "mailto:hello@techhire.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Tech Hire. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built for modern hiring teams
          </p>
        </div>
      </div>
    </footer>
  );
}
