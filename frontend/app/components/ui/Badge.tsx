import type { RiskLevel, InventoryStatus } from "../../lib/types";

interface BadgeProps {
  level: RiskLevel | InventoryStatus | string;
  children?: React.ReactNode;
}

const STYLES: Record<string, { bg: string; color: string; border: string }> = {
  critical: { bg: "rgba(239,68,68,0.15)", color: "#f87171", border: "rgba(239,68,68,0.3)" },
  high:     { bg: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  medium:   { bg: "rgba(234,179,8,0.15)",  color: "#facc15", border: "rgba(234,179,8,0.3)" },
  low:      { bg: "rgba(52,211,153,0.15)", color: "#34d399", border: "rgba(52,211,153,0.3)" },
  ok:       { bg: "rgba(52,211,153,0.15)", color: "#34d399", border: "rgba(52,211,153,0.3)" },
  warning:  { bg: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  stockout: { bg: "rgba(239,68,68,0.15)", color: "#f87171", border: "rgba(239,68,68,0.3)" },
};

const LABELS: Record<string, string> = {
  critical: "Kritik",
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük",
  ok: "Sağlıklı",
  warning: "Uyarı",
  stockout: "Stok Yok",
};

export function Badge({ level, children }: BadgeProps) {
  const s = STYLES[level] ?? STYLES.low;
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      padding: "2px 8px", borderRadius: 9999,
      fontSize: 11, fontFamily: "Fira Code", fontWeight: 600,
      whiteSpace: "nowrap",
    }}>
      {children ?? LABELS[level] ?? String(level)}
    </span>
  );
}
