"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { DashboardView }    from "./views/DashboardView";
import { RiskAnalysisView } from "./views/RiskAnalysisView";
import { InventoryView }    from "./views/InventoryView";
import { LogisticsView }    from "./views/LogisticsView";
import { AgentsView }       from "./views/AgentsView";
import type { NavPage } from "./lib/types";
import { authStorage } from "./lib/auth";

// ─── View Registry (OCP — yeni sayfa = yeni kayıt) ───────────────────────────
const VIEWS: Record<NavPage, React.ReactNode> = {
  dashboard: <DashboardView />,
  risks:     <RiskAnalysisView />,
  inventory: <InventoryView />,
  logistics: <LogisticsView />,
  agents:    <AgentsView />,
};

export default function App() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [activePage, setActivePage] = useState<NavPage>("dashboard");

  useEffect(() => {
    const user = authStorage.getUser();
    if (!user) { router.push("/login"); return; }
    if (user.role === "admin") { router.push("/admin"); return; }
    setReady(true);
  }, []);

  if (!ready) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f3f7fb", color: "#3b82f6", fontFamily: "Fira Code", fontSize: 14 }}>
      Yükleniyor...
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f7fb" }}>
      {/* Ambient background glow */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "60vh", pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 30% -10%,rgba(59,130,246,0.12),transparent)", zIndex: 0 }} />

      <Sidebar active={activePage} onNavigate={setActivePage} />

      <main style={{ marginLeft: 240, flex: 1, padding: "32px 36px", position: "relative", zIndex: 1, minHeight: "100vh" }}>
        {VIEWS[activePage]}
      </main>
    </div>
  );
}
