interface LoadingSpinnerProps {
  size?: number;
  label?: string;
}

export function LoadingSpinner({ size = 40, label = "Yükleniyor..." }: LoadingSpinnerProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 40 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        border: "3px solid rgba(99,102,241,0.2)",
        borderTop: "3px solid #6366f1",
        animation: "spin 0.9s linear infinite",
      }} />
      <span style={{ fontSize: 12, color: "#64748b", fontFamily: "Fira Code" }}>{label}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
