import Link from "next/link";
import Image from "next/image";

type Section = {
  id: string;
  title: string;
  body?: string;
};

type Props = {
  title: string;
  summary: string;
  heroImageSrc?: string;
  /** 페이지 하단 CTA */
  cta?: { label: string; href: string };
  /** 목차 대상 섹션들 */
  sections: Section[];
};

export default function DetailsTemplate({
  title,
  summary,
  heroImageSrc,
  cta,
  sections,
}: Props) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-14 pt-5">
      {/* Title/Summary */}
      <div className="space-y-3">
        <h1 className="text-2xl font-black tracking-tight text-brand-ink">{title}</h1>
        <p className="text-sm leading-6 text-brand-slate">{summary}</p>
      </div>

      {/* Image / Hero */}
      {heroImageSrc ? (
        <div className="mt-5 overflow-hidden rounded-2xl border border-brand-line/60 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={heroImageSrc}
              alt={`${title} hero`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-brand-line/60 bg-white/60 p-6 text-sm text-brand-slate">
          이미지/미디어 영역(추후 삽입)
        </div>
      )}

      {/* TOC */}
      <section className="mt-6 rounded-2xl border border-brand-line/60 bg-white/70 p-4 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-brand-slate">목차</div>
        <ul className="mt-3 grid gap-2 text-sm font-semibold text-brand-ink">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Content Sections */}
      <div className="mt-8 space-y-10">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-20">
            <h2 className="text-lg font-extrabold text-brand-ink">{s.title}</h2>
            <div className="mt-2 rounded-2xl border border-brand-line/60 bg-white/70 p-4 text-sm leading-6 text-brand-slate shadow-sm">
              {s.body ?? "콘텐츠는 나중에 채워질 예정입니다."}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      {cta ? (
        <div className="mt-10">
          <Link
            href={cta.href}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-ink px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-ink/90"
          >
            {cta.label}
          </Link>
        </div>
      ) : null}
    </main>
  );
}