import Section from "@/components/Section";

export default function Solution() {
  return (
    <Section
      id="how"
      eyebrow="Solution"
      title="한 사람의 시작 → 주변 확산 → 거미줄 연결"
      desc="Hero에서 보이는 그대로, Pay4World는 ‘시작 노드’가 ‘다음 노드’를 부르는 구조를 만듭니다. 참여가 관계가 되고, 관계가 지속을 만듭니다."
    >
      <div className="rounded-3xl border border-slate-200 bg-brand-bgTint p-6">
        <ol className="space-y-3 text-sm text-brand-slate">
          <li><span className="font-semibold text-brand-ink">1.</span> 내 위치 기반으로 ‘근처’에서 시작</li>
          <li><span className="font-semibold text-brand-ink">2.</span> 참여가 공유되고, 주변이 반응</li>
          <li><span className="font-semibold text-brand-ink">3.</span> 연결이 쌓이며 네트워크가 성장</li>
          <li><span className="font-semibold text-brand-ink">4.</span> 배지/미션으로 반복 참여가 자연스러움</li>
        </ol>
      </div>
    </Section>
  );
}
