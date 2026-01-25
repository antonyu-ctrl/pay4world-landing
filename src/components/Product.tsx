import Section from "@/components/Section";

export default function Product() {
  return (
    <Section
      id="product"
      eyebrow="Product"
      title="참여를 ‘게임처럼’ 이어주는 기능"
      desc="과한 장식 대신, 행동을 바꾸는 장치만 남깁니다. 작은 참여가 계속되도록 설계된 핵심 기능을 제공합니다."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["배지/스트릭", "작은 성취를 시각화해 지속성을 만듭니다."],
          ["미션/챌린지", "참여 진입장벽을 낮추고 행동을 유도합니다."],
          ["피드/확산", "내 시작이 주변 참여로 이어지도록 설계합니다."],
          ["개인화", "내 관심/위치 기반으로 다음 행동을 제안합니다."],
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
