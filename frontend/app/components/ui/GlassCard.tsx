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
        background: "rgba(255,255,255,0.04)",
        border: selected ? `1px solid ${glow ?? "rgba(99,102,241,0.4)"}` : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16, padding,
        backdropFilter: "blur(20px)",
        boxShadow: selected
          ? `0 4px 32px rgba(0,0,0,0.4), 0 0 20px ${glow ?? "rgba(99,102,241,0.15)"}`
          : "0 4px 32px rgba(0,0,0,0.4)",
        cursor: onClick ? "pointer" : undefined,
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </div>
  );
}
