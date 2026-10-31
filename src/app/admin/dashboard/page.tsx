import Link from "next/link";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import {
  Users,
  Package,
  Layers,
  FileText,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getSessionUser();

  const [staffCount, customerCount, productCount, planCount, subCount, invoiceCount] =
    await Promise.all([
      prisma.user.count({ where: { role: { in: ["ADMIN", "STAFF"] } } }),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.product.count(),
      prisma.plan.count(),
      prisma.subscription.count(),
      prisma.invoice.count(),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          System Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Welcome back, <span className="font-semibold text-slate-800">{session?.name}</span> ({session?.role}). Brightloop core operational metrics.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Customers
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {customerCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Staff Members
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {staffCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Products & Plans
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {productCount} / {planCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Subscriptions & Invoices
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {subCount} / {invoiceCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Module Overview Cards */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Team Implementation Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                Part 1: Abhinav
              </span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Active & Deployed
              </span>
            </div>
            <h3 className="font-semibold text-slate-900">
              Foundation, Authentication & Staff Management
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unified SQLite Prisma schema, strict password policy enforcement, RBAC middleware, secure session cookie handling, and staff creation.
            </p>
            {session?.role === "ADMIN" && (
              <Link
                href="/admin/staff"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Manage Internal Staff &rarr;
              </Link>
            )}
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                Part 2: Vaishnav
              </span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Assigned
              </span>
            </div>
            <h3 className="font-semibold text-slate-900">
              Product Catalog, Variants & Subscriptions
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Product CRUD with brand price adjustments (+560), subscription plans (Daily/Weekly/Monthly/Yearly), quotation templates, and subscription state machine.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Part 3: Harry
              </span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Assigned
              </span>
            </div>
            <h3 className="font-semibold text-slate-900">
              Billing Day Engine, Taxes & Discounts
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Idempotent batch billing runner, admin tax rules, discount engine (scopes, usage caps, date windows), and invoice generation.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                Part 4: Rose
              </span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Assigned
              </span>
            </div>
            <h3 className="font-semibold text-slate-900">
              Payments, AR Aging & Finance Dashboard
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Payment recording (multiple methods, partial payments), accounts receivable aging alerts, sub-2s query finance analytics (MRR/ARR), and customer portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
