"use client";
import { useRouter } from "next/navigation";
import { authStorage } from "../lib/auth";
import type { NavPage } from "../lib/types";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconShield   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconGrid     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
const IconAlert    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IconBox      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>;
const IconTruck    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const IconBot      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>;

// ─── Nav Config (OCP — yeni sayfa = yeni obje) ────────────────────────────────
const NAV_ITEMS: { id: NavPage; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: "dashboard",  label: "Dashboard",    icon: <IconGrid /> },
  { id: "risks",      label: "Risk Analizi", icon: <IconAlert />, badge: "AI" },
  { id: "inventory",  label: "Envanter",     icon: <IconBox /> },
  { id: "logistics",  label: "Lojistik",     icon: <IconTruck />, badge: "AI" },
  { id: "agents",     label: "AI Agents",    icon: <IconBot />, badge: "7" },
];

interface SidebarProps {
  active: NavPage;
  onNavigate: (page: NavPage) => void;
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  const router = useRouter();
  const user = authStorage.getUser();

  function handleLogout() {
    authStorage.clear();
    router.push("/login");
  }

  return (
    <aside style={{
      width: 240, minHeight: "100vh",
      background: "rgba(10,15,30,0.95)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column",
      padding: "24px 16px",
      position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, paddingLeft: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(99,102,241,0.4)", color: "white" }}>
          <IconShield />
        </div>
        <div>
          <div style={{ fontFamily: "Fira Code", fontWeight: 700, fontSize: 15, color: "#e2e8f0" }}>SupplyShield</div>
          <div style={{ fontSize: 10, color: "#64748b", fontFamily: "Fira Code" }}>AI Risk Platform</div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {NAV_ITEMS.map(({ id, label, icon, badge }) => {
          const isActive = active === id;
          return (
            <button key={id} onClick={() => onNavigate(id)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 12px", borderRadius: 10, width: "100%", textAlign: "left",
              background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
              border: isActive ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
              color: isActive ? "#a5b4fc" : "#94a3b8",
              cursor: "pointer", transition: "all 0.15s ease", fontSize: 14, fontFamily: "Fira Sans",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ opacity: isActive ? 1 : 0.7 }}>{icon}</span>
                {label}
              </div>
              {badge && (
                <span style={{ fontSize: 9, fontFamily: "Fira Code", background: isActive ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.08)", color: isActive ? "#a5b4fc" : "#64748b", padding: "1px 5px", borderRadius: 4 }}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Status Footer */}
      <div style={{ padding: "12px", borderRadius: 10, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "#6366f1", fontFamily: "Fira Code", marginBottom: 6 }}>SİSTEM DURUMU</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399" }} />
          <span style={{ fontSize: 11, color: "#94a3b8" }}>Tüm ajanlar aktif</span>
        </div>
        <div style={{ marginTop: 6, fontSize: 10, color: "#475569", fontFamily: "Fira Code" }}>
          v1.0 · 7 ajan · FastAPI
        </div>
      </div>

      {/* User Info + Logout */}
      <div style={{ padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user?.company_name || "—"}
          </div>
          <div style={{ fontSize: 10, color: "#64748b", fontFamily: "Fira Code", marginTop: 2 }}>
            @{user?.username || "—"}
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: "100%", padding: "7px 10px",
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)",
            borderRadius: 8, color: "#f87171", cursor: "pointer", fontSize: 12,
            fontFamily: "Fira Code", transition: "all 0.15s", textAlign: "center",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.15)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"; }}
        >
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
