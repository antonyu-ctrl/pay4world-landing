import { ReactNode } from "react";

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "default"
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: "default" | "soft";
}) {
  return (
    <section id={id} className={tone === "soft" ? "bg-slate-50/60" : ""}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold tracking-wide text-brand-blue">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base leading-7 text-brand-slate">
              {description}
            </p>
          ) : null}
        </div>

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}