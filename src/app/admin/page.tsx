"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_CONFIG,
  type SiteConfig,
} from "@/lib/siteConfig";
import AnimationTab from "./components/AnimationTab";
import ContentTab from "./components/ContentTab";
import PasswordTab from "./components/PasswordTab";

type Tab = "animation" | "content" | "password";

const TAB_LABELS: Record<Tab, string> = {
  animation: "Animation",
  content: "Content",
  password: "Password",
};

function TabBar({
  tab,
  setTab,
  className,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  className?: string;
}) {
  return (
    <div className={`flex gap-1 rounded-lg bg-slate-100 p-1 ${className ?? ""}`}>
      {(["animation", "content", "password"] as Tab[]).map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
            tab === t
              ? "bg-white text-brand-ink shadow-sm"
              : "text-brand-slate hover:text-brand-ink"
          }`}
        >
          {TAB_LABELS[t]}
        </button>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("animation");
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load current config
  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.animation) setConfig(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    try {
      const pw = sessionStorage.getItem("admin-pw") ?? "";
      const res = await fetch("/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": pw,
        },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else if (res.status === 401) {
        sessionStorage.removeItem("admin-pw");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.reload();
      } else {
        alert("저장 실패: 오류가 발생했습니다.");
      }
    } catch {
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  }, [config]);

  const handleResetAnimation = useCallback(() => {
    setConfig((prev) => ({ ...prev, animation: DEFAULT_CONFIG.animation }));
  }, []);

  const handleResetContent = useCallback(() => {
    setConfig((prev) => ({ ...prev, content: DEFAULT_CONFIG.content }));
  }, []);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-brand-slate">Loading config...</p>
      </div>
    );
  }

  const showActionButtons = tab !== "password";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        {/* Row 1: Admin + Home + [Desktop tabs] + Reset/Save */}
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Home button */}
            <a
              href="/"
              className="flex items-center justify-center rounded-full border border-slate-200 p-2 text-brand-slate hover:bg-slate-50 hover:text-brand-ink"
              title="Back to homepage"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <h1 className="text-base font-bold text-brand-ink sm:text-lg">
              Admin
            </h1>

            {/* Desktop-only tab bar */}
            <TabBar tab={tab} setTab={setTab} className="hidden lg:flex" />
          </div>

          {showActionButtons && (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={
                  tab === "animation"
                    ? handleResetAnimation
                    : handleResetContent
                }
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-brand-slate hover:bg-slate-50 sm:px-4 sm:py-2"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-full bg-brand-ink px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-ink/90 disabled:opacity-50 sm:px-6 sm:py-2 sm:text-sm"
              >
                {saving ? "Saving..." : saved ? "Saved!" : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* Row 2: Mobile-only tab bar */}
        <div className="border-t border-slate-100 px-4 py-2 lg:hidden">
          <TabBar tab={tab} setTab={setTab} />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1600px] p-3 sm:p-6">
        {tab === "animation" && (
          <AnimationTab
            config={config.animation}
            onChange={(animation) =>
              setConfig((prev) => ({ ...prev, animation }))
            }
          />
        )}
        {tab === "content" && (
          <ContentTab
            config={config.content}
            onChange={(content) =>
              setConfig((prev) => ({ ...prev, content }))
            }
          />
        )}
        {tab === "password" && <PasswordTab />}
      </div>
    </div>
  );
}
