"use client";

import { useCallback, useState } from "react";

export default function PasswordTab() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [status, setStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg("");

      if (newPw.length < 8) {
        setErrorMsg("New password must be at least 8 characters.");
        return;
      }
      if (newPw !== confirmPw) {
        setErrorMsg("Passwords do not match.");
        return;
      }
      if (newPw === currentPw) {
        setErrorMsg("New password must be different from current password.");
        return;
      }

      setStatus("saving");
      try {
        const res = await fetch("/api/password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword: currentPw,
            newPassword: newPw,
          }),
        });

        if (res.ok) {
          sessionStorage.setItem("admin-pw", newPw);
          setStatus("success");
          setCurrentPw("");
          setNewPw("");
          setConfirmPw("");
          setTimeout(() => setStatus("idle"), 3000);
        } else {
          const data = await res.json();
          setErrorMsg(data.error || "Failed to change password.");
          setStatus("error");
        }
      } catch {
        setErrorMsg("Network error.");
        setStatus("error");
      }
    },
    [currentPw, newPw, confirmPw]
  );

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h3 className="text-sm font-bold text-brand-ink">Change Password</h3>
        <p className="mt-1 text-xs text-brand-slate">
          Enter your current password and choose a new one.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-brand-slate mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-mint focus:outline-none focus:ring-1 focus:ring-brand-mint"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-slate mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-mint focus:outline-none focus:ring-1 focus:ring-brand-mint"
              autoComplete="new-password"
            />
            <p className="mt-1 text-[10px] text-brand-slate">
              Minimum 8 characters
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-slate mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-mint focus:outline-none focus:ring-1 focus:ring-brand-mint"
              autoComplete="new-password"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500">{errorMsg}</p>
          )}

          {status === "success" && (
            <p className="text-xs text-emerald-600 font-medium">
              Password changed successfully.
            </p>
          )}

          <button
            type="submit"
            disabled={
              status === "saving" || !currentPw || !newPw || !confirmPw
            }
            className="w-full rounded-full bg-brand-ink px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink/90 disabled:opacity-50"
          >
            {status === "saving" ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
