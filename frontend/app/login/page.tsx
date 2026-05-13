"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi, authStorage } from "../lib/auth";

const IconShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconEyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginApi(username, password);
      authStorage.setToken(data.access_token);
      authStorage.setUser(data.user);
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Giriş başarısız");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "11px 12px 11px 40px",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(148,163,184,0.28)",
    borderRadius: 10,
    color: "#0f172a",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s ease",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fbff 0%, #edf4fb 55%, #f8fbff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.16) 0%, transparent 72%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.11) 0%, transparent 72%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "40%", right: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 72%)", pointerEvents: "none" }} />

      <div style={{
        width: "100%",
        maxWidth: 440,
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(148,163,184,0.24)",
        borderRadius: 20,
        padding: "40px 36px",
        boxShadow: "0 20px 48px rgba(15,23,42,0.14), 0 0 0 1px rgba(59,130,246,0.08)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: "linear-gradient(135deg,#3b82f6,#14b8a6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 32px rgba(59,130,246,0.42)",
            color: "white", marginBottom: 16,
          }}>
            <IconShield />
          </div>
          <div style={{ fontFamily: "Fira Code", fontWeight: 700, fontSize: 22, color: "#0f172a", letterSpacing: "-0.5px" }}>
            SupplyShield
          </div>
          <div style={{ fontSize: 12, color: "#475569", marginTop: 4, fontFamily: "Fira Code" }}>
            AI Destekli Tedarik Zinciri Platformu
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
            borderRadius: 10, padding: "10px 14px", marginBottom: 20,
            color: "#f59e0b", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Username */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b", pointerEvents: "none" }}>
              <IconUser />
            </div>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "rgba(59,130,246,0.45)")}
              onBlur={e => (e.target.style.borderColor = "rgba(148,163,184,0.28)")}
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b", pointerEvents: "none" }}>
              <IconLock />
            </div>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Şifre"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ ...inputStyle, paddingRight: 44 }}
              onFocus={e => (e.target.style.borderColor = "rgba(59,130,246,0.45)")}
              onBlur={e => (e.target.style.borderColor = "rgba(148,163,184,0.28)")}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
            >
              {showPw ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "13px",
              background: loading ? "rgba(59,130,246,0.42)" : "linear-gradient(135deg,#3b82f6,#14b8a6)",
              border: "none", borderRadius: 12, color: "white",
              fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
              boxShadow: loading ? "none" : "0 4px 20px rgba(59,130,246,0.35)",
              marginTop: 4,
            }}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Register link */}
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#475569" }}>
          Hesabınız yok mu?{" "}
          <a href="/register" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
            Kayıt olun
          </a>
        </div>

        {/* Demo credentials */}
        <div style={{
          marginTop: 24,
          padding: "14px 16px",
          background: "rgba(59,130,246,0.06)",
          border: "1px solid rgba(59,130,246,0.12)",
          borderRadius: 12,
        }}>
          <div style={{ fontSize: 10, color: "#3b82f6", fontFamily: "Fira Code", marginBottom: 8, letterSpacing: 1 }}>
            DEMO HESAPLARI
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 12, color: "#475569", fontFamily: "Fira Code" }}>
              <span style={{ color: "#93c5fd" }}>Admin:</span> admin / admin123
            </div>
            <div style={{ fontSize: 12, color: "#475569", fontFamily: "Fira Code" }}>
              <span style={{ color: "#2dd4bf" }}>KOBİ:</span> kobi1 / kobi123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
