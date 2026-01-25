import Section from "./Section";
import { ASSETS } from "@/lib/constants";
import GalleryStrip from "./GalleryStrip";
import { Reveal } from "@/components/motion";

export default function Problem() {
  return (
    <Section
      id="service"
      eyebrow="Problem"
      title="기부 시장은 커졌는데, 사람은 빠지고 있어요."
      description="총액은 느는데 참여율은 하락. 특히 2030에게 기존 모금 방식은 ‘스팸/피로’로 인식됩니다. 결국 답은 참여율."
      tone="soft"
    >
      <Reveal>
        <GalleryStrip
          src={ASSETS.sectionBanners6}
          alt="Section banners"
          tiles={[
            { x: "16%", y: "22%" },
            { x: "50%", y: "22%" },
            { x: "84%", y: "22%" }
          ]}
          height={160}
        />
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { title: "참여율 하락", desc: "돈은 모이는데, 새로 들어오는 사람은 줄어듦." },
          { title: "MZ 이탈", desc: "전화/오프라인 모금은 피곤함·스팸으로 인식." },
          { title: "재미·투명성 부족", desc: "좋은 일도 재미 없고 믿기 어렵면 안 함." }
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-base font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-slate">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="mt-8">
          <GalleryStrip
            src={ASSETS.uiCards12}
            alt="Problem UI cards"
            tiles={[
              { x: "12%", y: "18%" },
              { x: "44%", y: "18%" },
              { x: "76%", y: "18%" },
              { x: "12%", y: "75%" }
            ]}
            height={140}
          />
        </div>
      </Reveal>
    </Section>
  );
}