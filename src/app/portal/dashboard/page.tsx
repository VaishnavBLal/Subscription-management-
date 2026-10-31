import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Package, FileText, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerPortalDashboard() {
  const session = await getSessionUser();

  const subscriptions = session
    ? await prisma.subscription.findMany({
        where: { customerId: session.userId },
        include: { plan: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const invoices = session
    ? await prisma.invoice.findMany({
        where: { customerId: session.userId },
        orderBy: { issueDate: "desc" },
      })
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Welcome, {session?.name}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your active subscriptions, review billing history, and download official invoices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">
                Your Subscriptions ({subscriptions.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400">Part 2: Vaishnav</span>
          </div>

          {subscriptions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              You currently have no active subscriptions. A sales quotation or plan will appear here once activated.
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptions.map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-lg border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-sm text-slate-800">
                      {s.subscriptionNumber}
                    </div>
                    <div className="text-xs text-slate-500">{s.plan?.name}</div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h2 className="font-semibold text-slate-900">
                Invoices & Receipts ({invoices.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400">Part 3 & 4: Harry & Rose</span>
          </div>

          {invoices.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No invoices generated yet. Invoices generated on Billing Day will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-3.5 rounded-lg border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-sm text-slate-800">
                      {inv.invoiceNumber}
                    </div>
                    <div className="text-xs text-slate-500">
                      Due: {new Date(inv.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-slate-900">
                      ${inv.totalAmount.toFixed(2)}
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase">
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
