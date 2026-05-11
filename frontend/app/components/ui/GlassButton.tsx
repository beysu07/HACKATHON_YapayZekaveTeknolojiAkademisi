interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  variant?: "primary" | "danger" | "success" | "ghost";
  disabled?: boolean;
  fullWidth?: boolean;
}

const VARIANTS = {
  primary: { bg: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.35)", color: "#a5b4fc" },
  danger:  { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",   color: "#f87171" },
  success: { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)",  color: "#34d399" },
  ghost:   { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", color: "#94a3b8" },
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
        background: disabled ? "rgba(255,255,255,0.03)" : v.bg,
        border: `1px solid ${disabled ? "rgba(255,255,255,0.08)" : v.border}`,
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
