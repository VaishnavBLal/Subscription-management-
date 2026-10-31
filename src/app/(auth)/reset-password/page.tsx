"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { KeyRound, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

    if (!token) {
      setError("Reset token is missing from URL.");
      return;
    }

    if (!isPasswordValid) {
      setError("Please fulfill all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          Invalid or missing reset token. Please request a new password reset link.
        </div>
        <Link
          href="/forgot-password"
          className="text-sm font-semibold text-indigo-600 hover:underline block"
        >
          Request new reset link &rarr;
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Password Reset Successfully!
        </h2>
        <p className="text-sm text-slate-500">
          Redirecting you to the login screen...
        </p>
        <Link
          href="/login"
          className="inline-block py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm font-semibold"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          New Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-xs">
          <div className="font-semibold text-slate-700 mb-1">
            Required Password Criteria:
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
            <span>Min. 8 characters</span>
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
            <span>Uppercase letter (A-Z)</span>
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
            <span>Lowercase letter (a-z)</span>
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
            <span>Special symbol (!@#$%...)</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Confirm New Password
        </label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••••••"
          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !isPasswordValid || password !== confirmPassword}
        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm rounded-lg shadow-sm transition flex items-center justify-center gap-2"
      >
        <KeyRound className="w-4 h-4" />
        <span>{loading ? "Updating..." : "Set New Password"}</span>
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
            BL
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-4 tracking-tight">
            Choose New Password
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create a secure password following Brightloop safety policies
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-sm text-slate-400">Loading form...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
