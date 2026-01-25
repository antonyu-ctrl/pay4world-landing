import Section from "./Section";
import { ASSETS } from "@/lib/constants";
import GalleryStrip from "./GalleryStrip";
import { Reveal } from "@/components/motion";

export default function Roadmap() {
  const steps = [
    { year: "Year 1", title: "초기 진입", desc: "MAU 5만" },
    { year: "Year 2", title: "트랙션 확보", desc: "MAU 30만" },
    { year: "Year 3", title: "고성장", desc: "MAU 100만" }
  ];

  return (
    <Section
      id="roadmap"
      eyebrow="Roadmap"
      title="목표는 간단합니다. 참여자를 늘리는 기부."
      description="‘트래픽’이 아니라 ‘참여 습관’을 만드는 성장 전략으로 확장합니다."
      tone="soft"
    >
      <Reveal>
        <GalleryStrip
          src={ASSETS.sectionBanners6}
          alt="Roadmap banners"
          tiles={[
            { x: "16%", y: "92%" },
            { x: "50%", y: "92%" },
            { x: "84%", y: "92%" }
          ]}
          height={160}
        />
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.year} delay={i * 0.06}>
            <div className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition">
              <span className="inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">
                {s.year}
              </span>
              <h3 className="mt-3 text-lg font-black">{s.title}</h3>
              <p className="mt-2 text-sm text-brand-slate">{s.desc}</p>
              <div className="mt-6 h-1 w-full rounded-full bg-slate-100">
                <div className="h-1 w-1/2 rounded-full bg-brand-teal" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div id="contact" className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-black">지금, Pay4World와 같이 만들어보세요.</h3>
          <p className="mt-2 text-sm leading-6 text-brand-slate">
            데모/제휴 또는 NPO 등록을 원하시면 아래 연락처를 연결하세요.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm hover:bg-slate-100"
              href="mailto:hello@pay4world.example"
            >
              <p className="font-semibold">이메일</p>
              <p className="text-brand-slate">hello@pay4world.example</p>
            </a>
            <a
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm hover:bg-slate-100"
              href="#"
            >
              <p className="font-semibold">캘린들리/문의폼</p>
              <p className="text-brand-slate">링크 연결 예정</p>
            </a>
          </div>

          <div className="mt-6">
            <GalleryStrip
              src={ASSETS.stickers20}
              alt="Stickers"
              tiles={[
                { x: "10%", y: "20%" },
                { x: "35%", y: "25%" },
                { x: "60%", y: "20%" },
                { x: "85%", y: "25%" },
                { x: "20%", y: "80%" },
                { x: "75%", y: "80%" }
              ]}
              height={120}
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}