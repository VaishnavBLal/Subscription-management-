"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  Layers,
  FileText,
  CalendarCheck,
  Receipt,
  Percent,
  CreditCard,
  TrendingUp,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const isAdmin = role === "ADMIN";

  const navSections = [
    {
      title: "Core (Abhinav)",
      items: [
        { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        ...(isAdmin
          ? [{ href: "/admin/staff", label: "Staff Management", icon: ShieldCheck }]
          : []),
      ],
    },
    {
      title: "Catalog & Plans (Vaishnav)",
      items: [
        { href: "/admin/products", label: "Products & Variants", icon: Package },
        { href: "/admin/plans", label: "Subscription Plans", icon: Layers },
        { href: "/admin/subscriptions", label: "Subscriptions", icon: FileText },
      ],
    },
    {
      title: "Billing & Invoices (Harry)",
      items: [
        { href: "/admin/billing", label: "Billing Day Engine", icon: CalendarCheck },
        { href: "/admin/invoices", label: "Invoices", icon: Receipt },
        { href: "/admin/taxes", label: "Tax & Discounts", icon: Percent },
      ],
    },
    {
      title: "Finance & Reports (Rose)",
      items: [
        { href: "/admin/payments", label: "Payments", icon: CreditCard },
        { href: "/admin/ar-aging", label: "AR Aging & Overdue", icon: Clock },
        { href: "/admin/analytics", label: "Finance Analytics", icon: TrendingUp },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between border-r border-slate-800">
      <div className="space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx}>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              {section.title}
            </div>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 px-3">
        Brightloop v1.0.0
      </div>
    </aside>
  );
}
