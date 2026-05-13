interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
      <div>
        <h1 style={{ fontSize: 27, fontWeight: 700, color: "#0f172a", fontFamily: "Fira Sans", letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 14, color: "#475569", margin: "8px 0 0", lineHeight: 1.55, maxWidth: 740 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
