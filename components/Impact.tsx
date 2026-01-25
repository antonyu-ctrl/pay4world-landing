import Section from "./Section";
import { ASSETS } from "@/lib/constants";
import GalleryStrip from "./GalleryStrip";
import { Reveal } from "@/components/motion";

export default function Impact() {
  return (
    <Section
      id="impact"
      eyebrow="Impact"
      title="착한 일도, 숫자로 말해야 오래 갑니다."
      description="‘얼마 모았다’에서 끝나지 않고, 참여/반복/임팩트를 지표로 설계합니다."
    >
      <Reveal>
        <GalleryStrip
          src={ASSETS.uiCards12}
          alt="Impact UI"
          tiles={[
            { x: "12%", y: "75%" },
            { x: "44%", y: "75%" },
            { x: "76%", y: "75%" }
          ]}
          height={160}
        />
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { kpi: "SROI", value: "1원 → 4.5원", note: "사회적 가치 창출 지표" },
          { kpi: "First-time Donors", value: "40%+", note: "생애 첫 기부자 비율 목표" },
          { kpi: "Frequency", value: "3.5×", note: "기부 빈도 상승(지표/목표)" }
        ].map((c, i) => (
          <Reveal key={c.kpi} delay={i * 0.06}>
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition">
              <p className="text-xs font-semibold text-brand-slate">{c.kpi}</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-brand-blue">
                {c.value}
              </p>
              <p className="mt-2 text-sm text-brand-slate">{c.note}</p>

              <div className="mt-4">
                <GalleryStrip
                  src={ASSETS.badgeSet}
                  alt="Impact badges"
                  tiles={[
                    { x: "12%", y: "18%" },
                    { x: "40%", y: "30%" },
                    { x: "72%", y: "26%" }
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