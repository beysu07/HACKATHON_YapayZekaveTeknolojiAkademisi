interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  variant?: "primary" | "danger" | "success" | "ghost";
  disabled?: boolean;
  fullWidth?: boolean;
}

const VARIANTS = {
  primary: { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)", color: "#1d4ed8" },
  danger:  { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",   color: "#f87171" },
  success: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.28)", color: "#059669" },
  ghost:   { bg: "rgba(255,255,255,0.72)", border: "rgba(148,163,184,0.22)", color: "#475569" },
};

export function GlassButton({ children, onClick, variant = "primary", disabled, fullWidth }: GlassButtonProps) {
  const v = VARIANTS[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "8px 16px", borderRadius: 10,
        background: disabled ? "rgba(148,163,184,0.12)" : v.bg,
        border: `1px solid ${disabled ? "rgba(148,163,184,0.2)" : v.border}`,
        color: disabled ? "#475569" : v.color,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 13, fontFamily: "Fira Code",
        transition: "all 0.15s ease",
        width: fullWidth ? "100%" : undefined,
        justifyContent: fullWidth ? "center" : undefined,
      }}
    >
      {children}
    </button>
  );
}
