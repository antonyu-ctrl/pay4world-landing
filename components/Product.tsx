import Section from "./Section";
import { ASSETS } from "@/lib/constants";
import GalleryStrip from "./GalleryStrip";
import { Reveal } from "@/components/motion";

export default function Product() {
  return (
    <Section
      id="product"
      eyebrow="Product"
      title="기부를 ‘플레이’로 바꾸는 기능들"
      description="‘한 번 하고 끝’이 아니라, 다음도 하고 싶게 만드는 반복 참여 장치."
      tone="soft"
    >
      <Reveal>
        <GalleryStrip
          src={ASSETS.uiCards12}
          alt="UI cards 12"
          tiles={[
            { x: "12%", y: "18%" },
            { x: "44%", y: "18%" },
            { x: "76%", y: "18%" },
            { x: "12%", y: "75%" },
            { x: "44%", y: "75%" }
          ]}
          height={160}
        />
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[
          { title: "마이크로 펀딩", desc: "1,000원부터. 각 잡지 말고 가볍게 시작." },
          { title: "Society Funding", desc: "팀/팬덤으로 같이 모으고 같이 이기는 구조." },
          { title: "Sweat Match", desc: "뛰면 포인트가 되고, 포인트가 임팩트가 됩니다." },
          { title: "Scavenger Hunt", desc: "우리 동네에서 미션 깨고 기부까지 연결." }
        ].map((f, i) => (
          <Reveal key={f.title} delay={i * 0.06}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-bold">{f.title}</h3>
                <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                  Play
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-brand-slate">{f.desc}</p>

              <div className="mt-4">
                <GalleryStrip
                  src={ASSETS.badgeSet}
                  alt="Badge preview"
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