import Section from "@/components/Section";

export default function Roadmap() {
  return (
    <Section
      id="roadmap"
      eyebrow="Roadmap"
      title="작게 시작해서, 기능과 파트너를 확장"
      desc="MVP → 지역/캠페인 확장 → 파트너 도구(SaaS)까지 단계적으로 성장합니다."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <ol className="space-y-3 text-sm text-brand-slate">
          <li><span className="font-semibold text-brand-ink">Phase 1</span> 시작 노드·확산 UX 고도화</li>
          <li><span className="font-semibold text-brand-ink">Phase 2</span> 캠페인/챌린지 + 파트너 협업</li>
          <li><span className="font-semibold text-brand-ink">Phase 3</span> 대시보드·리포트·SaaS 패키지</li>
        </ol>
      </div>
    </Section>
  );
}
