import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brightloop Subscription Management System",
  description: "End-to-end recurring revenue, subscription lifecycle, and billing management platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
