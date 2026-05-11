import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SupplyShield — AI Supply Chain Risk Management",
  description: "AI-powered supply chain risk intelligence platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ background: "#020817" }}>
      <body style={{ margin: 0, minHeight: "100vh", background: "#020817" }}>{children}</body>
    </html>
  );
}
