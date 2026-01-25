import Section from "./Section";
import { ASSETS } from "@/lib/constants";
import GalleryStrip from "./GalleryStrip";
import { Reveal } from "@/components/motion";

export default function Partners() {
  return (
    <Section
      id="partners"
      eyebrow="For Business & NPO"
      title="기업은 참여를 만들고, 단체는 운영을 줄인다."
      description="B2B 캠페인부터 NPO 운영 SaaS까지—임팩트 생태계를 굴립니다."
      tone="soft"
    >
      <Reveal>
        <GalleryStrip
          src={ASSETS.sectionBanners6}
          alt="Partners banners"
          tiles={[
            { x: "16%", y: "48%" },
            { x: "50%", y: "48%" },
            { x: "84%", y: "48%" }
          ]}
          height={160}
        />
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-bold text-brand-blue">기업/브랜드</p>
            <h3 className="mt-2 text-xl font-black">CSR Challenge</h3>
            <p className="mt-2 text-sm leading-6 text-brand-slate">
              이벤트가 아니라 게임판을 깔아드립니다. 참여가 생기고 데이터가 남고,
              브랜드는 임팩트와 리치를 같이 가져갑니다.
            </p>

            <div className="mt-5">
              <GalleryStrip
                src={ASSETS.uiCards12}
                alt="B2B UI"
                tiles={[
                  { x: "12%", y: "18%" },
                  { x: "44%", y: "18%" },
                  { x: "76%", y: "18%" }
                ]}
                height={140}
              />
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue/90"
            >
              CSR 캠페인 상담
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-bold text-brand-teal">NPO/단체</p>
            <h3 className="mt-2 text-xl font-black">NPO Enterprise (SaaS)</h3>
            <p className="mt-2 text-sm leading-6 text-brand-slate">
              모금/정산/공시까지 툴로 정리하고, 단체는 현장 임팩트에 집중하세요.
            </p>

            <div className="mt-5">
              <GalleryStrip
                src={ASSETS.uiCards4}
                alt="NPO UI"
                tiles={[
                  { x: "18%", y: "70%" },
                  { x: "52%", y: "70%" },
                  { x: "86%", y: "70%" }
                ]}
                height={140}
              />
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold hover:bg-slate-50"
            >
              단체 온보딩 요청
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}