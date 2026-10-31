import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Layers, FileText, User } from "lucide-react";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar user={session} />
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/portal/dashboard"
            className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>Customer Portal</span>
          </Link>
        </div>
        <div className="text-xs text-slate-500">
          Logged in as <span className="font-semibold text-slate-800">{session.name}</span>
        </div>
      </div>
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
