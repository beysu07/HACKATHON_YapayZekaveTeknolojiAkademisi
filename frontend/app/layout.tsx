import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SupplyShield — Tedarik Zinciri Risk Yönetimi",
  description: "Yapay zeka destekli tedarik zinciri risk ve stok yönetimi platformu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-theme="corporate-light" style={{ background: "#f3f7fb" }}>
      <body style={{ margin: 0, minHeight: "100vh", background: "transparent" }}>{children}</body>
    </html>
  );
}
