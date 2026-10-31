"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isPasswordValid) {
      setError("Please satisfy all password criteria before continuing.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/portal/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
            BL
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-4 tracking-tight">
            Create Customer Account
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Join Brightloop to manage your software subscriptions and invoices
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name or Company Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Acme Corp / Jane Doe"
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address (Unique Account ID)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@acmecorp.com"
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Strict Policy Checklist */}
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs">
              <div className="font-semibold text-slate-700">
                Security Password Criteria:
              </div>
              <div
                className={`flex items-center gap-1.5 ${
                  passwordChecks.length ? "text-emerald-600 font-medium" : "text-slate-400"
                }`}
              >
                {passwordChecks.length ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>At least 8 characters long</span>
              </div>
              <div
                className={`flex items-center gap-1.5 ${
                  passwordChecks.upper ? "text-emerald-600 font-medium" : "text-slate-400"
                }`}
              >
                {passwordChecks.upper ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>At least one uppercase letter (A-Z)</span>
              </div>
              <div
                className={`flex items-center gap-1.5 ${
                  passwordChecks.lower ? "text-emerald-600 font-medium" : "text-slate-400"
                }`}
              >
                {passwordChecks.lower ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>At least one lowercase letter (a-z)</span>
              </div>
              <div
                className={`flex items-center gap-1.5 ${
                  passwordChecks.special ? "text-emerald-600 font-medium" : "text-slate-400"
                }`}
              >
                {passwordChecks.special ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>At least one special character (!@#$%^&*...)</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isPasswordValid}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm rounded-lg shadow-sm transition flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? "Creating Account..." : "Create Account"}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
