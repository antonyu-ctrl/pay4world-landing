"use client";

import { useCallback, useState } from "react";
import type { ContentConfig, SceneSectionContent } from "@/lib/siteConfig";
import { SCENE_SECTION_ORDER } from "@/lib/sceneSections";
import SectionPreview from "./SectionPreview";

type Props = {
  config: ContentConfig;
  onChange: (config: ContentConfig) => void;
};

type SectionKey = keyof ContentConfig;

const SECTION_LABELS: Record<SectionKey, string> = {
  hero: "Hero",
  problem: "Problem",
  solution: "Solution",
  product: "Product",
  transparency: "Transparency",
  partners: "Partners (B2B·NPO)",
  impact: "Impact",
  roadmap: "Roadmap",
  contact: "Contact",
  footer: "Footer",
};

// ─── Input helpers ──────────────────────────────────────────────────

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-brand-slate">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none focus:ring-1 focus:ring-brand-mint"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-brand-slate">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none focus:ring-1 focus:ring-brand-mint"
      />
    </div>
  );
}

// ─── Section editors ────────────────────────────────────────────────

function HeroEditor({
  config,
  onChange,
}: {
  config: ContentConfig;
  onChange: (c: ContentConfig) => void;
}) {
  const h = config.hero;
  const set = (key: string, value: string) =>
    onChange({
      ...config,
      hero: { ...h, [key]: value },
    });

  return (
    <div className="space-y-3">
      <TextInput label="Badge" value={h.badge} onChange={(v) => set("badge", v)} />
      <TextInput label="Title Line 1" value={h.titleLine1} onChange={(v) => set("titleLine1", v)} />
      <TextInput label="Title Line 2" value={h.titleLine2} onChange={(v) => set("titleLine2", v)} />
      <TextArea label="Description" value={h.description} onChange={(v) => set("description", v)} />
      <TextInput label="CTA Primary" value={h.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} />
      <TextInput label="CTA Secondary" value={h.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} />
      <div className="border-t border-slate-100 pt-3">
        <p className="mb-2 text-xs font-semibold text-brand-slate">Stats</p>
        {h.stats.map((s, i) => (
          <div key={i} className="mb-2 grid grid-cols-2 gap-2">
            <TextInput
              label={`Label ${i + 1}`}
              value={s.label}
              onChange={(v) => {
                const stats = [...h.stats];
                stats[i] = { ...stats[i], label: v };
                onChange({ ...config, hero: { ...h, stats } });
              }}
            />
            <TextInput
              label={`Value ${i + 1}`}
              value={s.value}
              onChange={(v) => {
                const stats = [...h.stats];
                stats[i] = { ...stats[i], value: v };
                onChange({ ...config, hero: { ...h, stats } });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const SCENE_KEYS = new Set<string>(SCENE_SECTION_ORDER);

function SceneSectionEditor({
  sectionKey,
  config,
  onChange,
}: {
  sectionKey: string;
  config: ContentConfig;
  onChange: (c: ContentConfig) => void;
}) {
  const sec = config[sectionKey as keyof ContentConfig] as SceneSectionContent;

  const set = (key: keyof SceneSectionContent, value: string | string[]) =>
    onChange({ ...config, [sectionKey]: { ...sec, [key]: value } });

  return (
    <div className="space-y-3">
      <TextInput label="Eyebrow" value={sec.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <TextInput label="Title" value={sec.title} onChange={(v) => set("title", v)} />
      <TextArea label="Description" value={sec.description} onChange={(v) => set("description", v)} />
      <div className="border-t border-slate-100 pt-3">
        <p className="mb-2 text-xs font-semibold text-brand-slate">Bullet Points</p>
        {sec.details.map((item, i) => (
          <div key={i} className="mb-2">
            <TextInput
              label={`Item ${i + 1}`}
              value={item}
              onChange={(v) => {
                const arr = [...sec.details];
                arr[i] = v;
                set("details", arr);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactEditor({
  config,
  onChange,
}: {
  config: ContentConfig;
  onChange: (c: ContentConfig) => void;
}) {
  const sec = config.contact;
  const set = (key: string, value: string) =>
    onChange({ ...config, contact: { ...sec, [key]: value } });

  return (
    <div className="space-y-3">
      <TextInput label="Eyebrow" value={sec.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <TextInput label="Title" value={sec.title} onChange={(v) => set("title", v)} />
      <TextArea label="Description" value={sec.description} onChange={(v) => set("description", v)} />
      <TextInput label="Notice title" value={sec.noticeTitle} onChange={(v) => set("noticeTitle", v)} />
      <TextArea label="Notice text" value={sec.noticeText} onChange={(v) => set("noticeText", v)} />
      <div className="border-t border-slate-100 pt-3">
        <p className="mb-2 text-xs font-semibold text-brand-slate">Form Labels</p>
        <TextInput label="Name placeholder" value={sec.formName} onChange={(v) => set("formName", v)} />
        <div className="mt-2"><TextInput label="Email placeholder" value={sec.formEmail} onChange={(v) => set("formEmail", v)} /></div>
        <div className="mt-2"><TextInput label="Org placeholder" value={sec.formOrg} onChange={(v) => set("formOrg", v)} /></div>
        <div className="mt-2"><TextInput label="Message placeholder" value={sec.formMessage} onChange={(v) => set("formMessage", v)} /></div>
        <div className="mt-2"><TextInput label="Submit label" value={sec.submitLabel} onChange={(v) => set("submitLabel", v)} /></div>
        <div className="mt-2"><TextInput label="Footer text" value={sec.formFooter} onChange={(v) => set("formFooter", v)} /></div>
      </div>
    </div>
  );
}

function FooterEditor({
  config,
  onChange,
}: {
  config: ContentConfig;
  onChange: (c: ContentConfig) => void;
}) {
  const sec = config.footer;
  return (
    <div className="space-y-3">
      <TextInput label="Company Name" value={sec.companyName} onChange={(v) => onChange({ ...config, footer: { ...sec, companyName: v } })} />
      <TextInput label="Copyright (use {year} for dynamic year)" value={sec.copyright} onChange={(v) => onChange({ ...config, footer: { ...sec, copyright: v } })} />
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────

type MobileView = "sections" | "editor" | "preview";

export default function ContentTab({ config, onChange }: Props) {
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [mobileView, setMobileView] = useState<MobileView>("editor");

  const renderEditor = useCallback(() => {
    if (activeSection === "hero") {
      return <HeroEditor config={config} onChange={onChange} />;
    }
    if (SCENE_KEYS.has(activeSection)) {
      return <SceneSectionEditor sectionKey={activeSection} config={config} onChange={onChange} />;
    }
    if (activeSection === "contact") {
      return <ContactEditor config={config} onChange={onChange} />;
    }
    if (activeSection === "footer") {
      return <FooterEditor config={config} onChange={onChange} />;
    }
    return null;
  }, [activeSection, config, onChange]);

  return (
    <>
      {/* ── Desktop: 3-column grid (lg+) ── */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-[280px_350px_1fr]">
        {/* Left: Section picker */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-brand-slate">
            Sections
          </p>
          {(Object.keys(SECTION_LABELS) as SectionKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                activeSection === key
                  ? "bg-brand-mint/10 font-semibold text-brand-ink"
                  : "text-brand-slate hover:bg-slate-50"
              }`}
            >
              {SECTION_LABELS[key]}
            </button>
          ))}
        </div>

        {/* Middle: Editor */}
        <div className="max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-brand-ink">
            {SECTION_LABELS[activeSection]}
          </h3>
          {renderEditor()}
        </div>

        {/* Right: Preview */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-100 px-4 py-2">
            <p className="text-xs font-semibold text-brand-slate">
              Live Preview — {SECTION_LABELS[activeSection]}
            </p>
          </div>
          <div className="max-h-[calc(100vh-160px)] overflow-y-auto">
            <SectionPreview
              sectionKey={activeSection}
              config={config}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet: tabbed view (<lg) ── */}
      <div className="space-y-3 lg:hidden">
        {/* Mobile tab bar */}
        <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
          {(
            [
              { key: "sections", label: "Sections" },
              { key: "editor", label: "Editor" },
              { key: "preview", label: "Preview" },
            ] as { key: MobileView; label: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setMobileView(t.key)}
              className={`flex-1 rounded-lg py-2 text-xs font-medium transition ${
                mobileView === t.key
                  ? "bg-white text-brand-ink shadow-sm"
                  : "text-brand-slate"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Sections list */}
        {mobileView === "sections" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-brand-slate">
              Sections
            </p>
            {(Object.keys(SECTION_LABELS) as SectionKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSection(key);
                  setMobileView("editor");
                }}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activeSection === key
                    ? "bg-brand-mint/10 font-semibold text-brand-ink"
                    : "text-brand-slate hover:bg-slate-50"
                }`}
              >
                {SECTION_LABELS[key]}
              </button>
            ))}
          </div>
        )}

        {/* Editor */}
        {mobileView === "editor" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-sm font-bold text-brand-ink">
              {SECTION_LABELS[activeSection]}
            </h3>
            {renderEditor()}
          </div>
        )}

        {/* Preview */}
        {mobileView === "preview" && (
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-100 px-4 py-2">
              <p className="text-xs font-semibold text-brand-slate">
                Live Preview — {SECTION_LABELS[activeSection]}
              </p>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              <SectionPreview
                sectionKey={activeSection}
                config={config}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
