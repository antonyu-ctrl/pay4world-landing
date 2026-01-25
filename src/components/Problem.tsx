import Section from "@/components/Section";

export default function Problem() {
  return (
    <Section
      id="service"
      eyebrow="Problem"
      title="기부가 ‘한 번’에서 멈추는 이유"
      desc="좋은 마음은 있어도, 기부는 습관이 되기 어렵습니다. Pay4World는 ‘참여 → 연결 → 반복’이 자연스럽게 이어지도록 UX를 설계합니다."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["단발성", "일회성 캠페인 중심이라 관계/지속이 약해요."],
          ["동기 부족", "성과를 체감하기 어렵고 재미가 부족해요."],
          ["확산 한계", "공유는 되지만 실제 참여 전환이 낮아요."],
          ["신뢰", "투명성과 스토리 연결이 끊기기 쉬워요."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-brand-ink">{t}</p>
            <p className="mt-2 text-sm leading-6 text-brand-slate">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
