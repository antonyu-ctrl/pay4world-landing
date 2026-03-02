"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/config", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": password,
          },
          // Send current config to validate password without changing anything
          body: JSON.stringify(await fetch("/api/config").then((r) => r.json())),
        });

        if (res.ok) {
          sessionStorage.setItem("admin-pw", password);
          setAuthed(true);
        } else {
          setError("비밀번호가 올바르지 않습니다.");
        }
      } catch {
        setError("서버 연결에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [password]
  );

  // Check sessionStorage on mount (in useEffect to avoid hydration mismatch)
  useEffect(() => {
    const saved = sessionStorage.getItem("admin-pw");
    if (saved) {
      setAuthed(true);
      setPassword(saved);
    }
    setChecked(true);
  }, []);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-brand-slate">Loading...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <h1 className="text-xl font-bold text-brand-ink">Admin Login</h1>
          <p className="mt-2 text-sm text-brand-slate">
            관리자 비밀번호를 입력하세요.
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-mint focus:outline-none focus:ring-1 focus:ring-brand-mint"
            autoFocus
          />

          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-4 w-full rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink/90 disabled:opacity-50"
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
