interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="glass-card" style={{
      padding: "60px 40px", textAlign: "center",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: "linear-gradient(135deg, rgba(59,130,246,0.14), rgba(20,184,166,0.12))",
        border: "1px solid rgba(59,130,246,0.24)",
        display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb",
      }}>
        {icon}
      </div>
      <div style={{ color: "#0f172a", fontSize: 16, fontWeight: 600 }}>{title}</div>
      <div style={{ color: "#64748b", fontSize: 13, maxWidth: 340, lineHeight: 1.6 }}>{description}</div>
      {action}
    </div>
  );
}
