"use client";

import { useRouter } from "next/navigation";
import { LogOut, UserCircle } from "lucide-react";

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
          BL
        </div>
        <span className="font-bold text-lg text-slate-800 tracking-tight">
          Brightloop
        </span>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <UserCircle className="w-6 h-6 text-slate-400" />
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-slate-800 leading-tight">
                  {user.name}
                </div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
              <span
                className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  user.role === "ADMIN"
                    ? "bg-purple-100 text-purple-700"
                    : user.role === "STAFF"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md border border-slate-200 transition"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="text-xs font-medium text-indigo-600 hover:underline"
          >
            Sign in
          </a>
        )}
      </div>
    </header>
  );
}
