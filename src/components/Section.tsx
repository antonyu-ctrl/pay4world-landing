import { Reveal } from "@/components/motion";

export default function Section({
  id,
  eyebrow,
  title,
  desc,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[84px] border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-sm font-semibold text-brand-mint">{eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-ink">{title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-base leading-7 text-brand-slate">{desc}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">{children}</div>
        </div>
      </div>
    </section>
  );
}
