import Section from "@/components/Section";

export default function Partners() {
  return (
    <Section
      id="partners"
      eyebrow="B2B · NPO"
      title="기업/기관과 함께 더 크게 확산"
      desc="캠페인, CSR, 지역 연계까지. Pay4World의 네트워크 구조는 파트너와 연결될수록 확장됩니다."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["기업 CSR", "참여율을 높이는 게임화 캠페인"],
          ["NPO", "스토리·결과가 연결되는 후원 경험"],
          ["지역", "위치 기반으로 가까운 곳에서 시작"],
          ["SaaS", "운영 도구/대시보드로 확장"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-slate-200 bg-brand-bgTint p-5">
            <p className="text-sm font-semibold text-brand-ink">{t}</p>
            <p className="mt-2 text-sm leading-6 text-brand-slate">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
