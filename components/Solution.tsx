import Section from "./Section";
import { ASSETS } from "@/lib/constants";
import GalleryStrip from "./GalleryStrip";
import { Reveal } from "@/components/motion";

export default function Solution() {
  return (
    <Section
      id="how"
      eyebrow="Solution"
      title="기부를 ‘해야 하는 일’에서 ‘하고 싶은 놀이’로."
      description="소셜(SNS) + 게임화(성취/경쟁/협력) + 투명성(흐름 추적)으로 ‘반복 참여’를 설계합니다."
    >
      <Reveal>
        <GalleryStrip
          src={ASSETS.iconSet}
          alt="Icon set"
          tiles={[
            { x: "18%", y: "24%" },
            { x: "52%", y: "24%" },
            { x: "86%", y: "24%" }
          ]}
          height={160}
        />
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { tag: "Social", title: "같이 하면 더 재밌게", desc: "피드로 공유하고 친구를 지목하면 참여가 퍼집니다." },
          { tag: "Game", title: "계속 하고 싶게", desc: "배지·스트릭·미션으로 ‘다음 판’이 생깁니다." },
          { tag: "Trust", title: "보여주고 증명", desc: "Donation Journey로 흐름을 투명하게 공개합니다." }
        ].map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.06}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <span className="inline-flex rounded-full bg-brand-teal/20 px-3 py-1 text-xs font-bold">
                {c.tag}
              </span>
              <h3 className="mt-3 text-base font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-slate">{c.desc}</p>

              <div className="mt-4">
                <GalleryStrip
                  src={ASSETS.uiCards12}
                  alt="Solution UI"
                  tiles={[
                    { x: "12%", y: "18%" },
                    { x: "44%", y: "18%" },
                    { x: "76%", y: "18%" }
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