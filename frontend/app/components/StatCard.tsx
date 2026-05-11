interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: "indigo" | "amber" | "red" | "emerald" | "blue";
  icon: React.ReactNode;
}

const COLOR_MAP = {
  indigo:  { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.25)", glow: "rgba(99,102,241,0.15)", text: "#a5b4fc" },
  amber:   { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)", glow: "rgba(245,158,11,0.15)", text: "#fbbf24" },
  red:     { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.25)",  glow: "rgba(239,68,68,0.15)",  text: "#f87171" },
  emerald: { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.15)", text: "#34d399" },
  blue:    { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.15)", text: "#60a5fa" },
};

export function StatCard({ label, value, sub, color = "indigo", icon }: StatCardProps) {
  const c = COLOR_MAP[color];
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 24px", backdropFilter: "blur(20px)", boxShadow: `0 4px 32px rgba(0,0,0,0.4), 0 0 20px ${c.glow}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: "#64748b", fontFamily: "Fira Code", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "Fira Code", color: c.text, lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>{sub}</div>}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: c.text }}>
          {icon}
        </div>
      </div>
    </div>
  );
}
