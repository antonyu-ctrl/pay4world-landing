import Section from "./Section";
import { ASSETS } from "@/lib/constants";
import GalleryStrip from "./GalleryStrip";
import { Reveal } from "@/components/motion";

export default function Transparency() {
  return (
    <Section
      id="transparency"
      eyebrow="Transparency"
      title="기부금, 어디로 갔는지 끝까지 보여드림."
      description="‘믿어달라’가 아니라, Donation Journey로 보여주고 증명합니다."
    >
      <Reveal>
        <GalleryStrip
          src={ASSETS.sectionBanners6}
          alt="Transparency banners"
          tiles={[
            { x: "16%", y: "72%" },
            { x: "50%", y: "72%" },
            { x: "84%", y: "72%" }
          ]}
          height={160}
        />
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { title: "위변조 어려운 이력", desc: "기록은 남기고, 신뢰는 쌓고." },
          { title: "흐름 추적", desc: "모금 → 집행까지 한눈에." },
          { title: "임팩트 카드", desc: "결과를 숫자/스토리로 공유 가능." }
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-base font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-slate">{c.desc}</p>

              <div className="mt-4">
                <GalleryStrip
                  src={ASSETS.uiCards4}
                  alt="UI cards"
                  tiles={[
                    { x: "18%", y: "25%" },
                    { x: "52%", y: "25%" },
                    { x: "86%", y: "25%" }
                  ]}
                  height={120}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}