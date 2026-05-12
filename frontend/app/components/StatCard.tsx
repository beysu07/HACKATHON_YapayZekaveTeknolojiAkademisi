interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: "indigo" | "amber" | "red" | "emerald" | "blue";
  icon: React.ReactNode;
}

const COLOR_MAP = {
  indigo:  { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.22)", glow: "rgba(59,130,246,0.14)", text: "#93c5fd" },
  amber:   { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)", glow: "rgba(245,158,11,0.15)", text: "#fbbf24" },
  red:     { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.25)",  glow: "rgba(239,68,68,0.15)",  text: "#f87171" },
  emerald: { bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.22)", glow: "rgba(20,184,166,0.14)", text: "#2dd4bf" },
  blue:    { bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.24)", glow: "rgba(96,165,250,0.14)", text: "#60a5fa" },
};

export function StatCard({ label, value, sub, color = "indigo", icon }: StatCardProps) {
  const c = COLOR_MAP[color];
  return (
    <div style={{ background: "rgba(255,255,255,0.82)", border: `1px solid ${c.border}`, borderRadius: 16, padding: "22px 24px", backdropFilter: "blur(8px)", boxShadow: "0 10px 24px rgba(15,23,42,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: "#64748b", fontFamily: "Fira Code", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "Fira Code", color: c.text, lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: "#64748b", marginTop: 7, lineHeight: 1.5 }}>{sub}</div>}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: c.text }}>
          {icon}
        </div>
      </div>
    </div>
  );
}
