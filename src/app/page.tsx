import Link from "next/link";
import { ArrowRight, ShieldCheck, Layers, CalendarCheck, TrendingUp, Key } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            BL
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">
            Brightloop
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Unified Subscription Management System</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          One system to run plans, subscriptions <br className="hidden sm:inline" />
          and recurring billing in one place.
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600">
          Built for Brightloop Software to handle the end-to-end lifecycle of recurring revenue operations—replacing spreadsheets with automated billing, variant pricing, and instant financial analytics.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition"
          >
            <span>Customer Sign-Up</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-300 shadow-sm transition"
          >
            <Key className="w-4 h-4 text-slate-500" />
            <span>Staff & Admin Login</span>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left pt-12">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-slate-900">
              Role-Based Access
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Admin controls, internal staff operations, and dedicated customer self-service portal.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-slate-900">
              Catalog & Variants
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Brand variant price adjustments (+560) and full subscription state machines.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-slate-900">
              Billing Day Engine
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automated, idempotent recurring billing with taxes and dynamic discount rules.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-slate-900">
              Financial Analytics
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Live MRR/ARR, Accounts Receivable aging buckets, and sub-2s query speeds.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        Brightloop Subscription Management System &bull; Built with Next.js, Prisma & Tailwind CSS
      </footer>
    </div>
  );
}
