interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", fontFamily: "Fira Sans", margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0", fontFamily: "Fira Code" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
