interface GlassCardProps {
  children: React.ReactNode;
  padding?: number;
  glow?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function GlassCard({ children, padding = 20, glow, onClick, selected }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255, 255, 255, 0.88)",
        border: selected ? `1px solid ${glow ?? "rgba(59, 130, 246, 0.34)"}` : "1px solid rgba(148,163,184,0.22)",
        borderRadius: 16, padding,
        backdropFilter: "blur(8px)",
        boxShadow: selected
          ? `0 10px 26px rgba(15,23,42,0.10), 0 0 0 1px ${glow ?? "rgba(59,130,246,0.08)"}`
          : "0 10px 26px rgba(15,23,42,0.08)",
        cursor: onClick ? "pointer" : undefined,
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </div>
  );
}
