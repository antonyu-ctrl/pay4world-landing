import Section from "@/components/Section";

export default function Impact() {
  return (
    <Section
      id="impact"
      eyebrow="Impact"
      title="연결될수록 커지는 임팩트"
      desc="SROI 같은 정량 지표뿐 아니라, ‘첫 기부자’와 ‘반복 기부’가 늘어나는 구조를 만듭니다."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["첫 기부자", "처음 참여가 쉽게"],
            ["기부 빈도", "반복 참여가 자연스럽게"],
            ["확산", "연결이 다음 참여를 유도"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-slate-200 bg-brand-bgTint p-5">
              <p className="text-sm font-semibold text-brand-ink">{t}</p>
              <p className="mt-2 text-sm text-brand-slate">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
