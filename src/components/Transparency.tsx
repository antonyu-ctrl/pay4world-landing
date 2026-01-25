import Section from "@/components/Section";

export default function Transparency() {
  return (
    <Section
      id="transparency"
      eyebrow="Trust"
      title="투명성은 기본, ‘스토리 연결’이 핵심"
      desc="기부는 숫자만으로 유지되지 않습니다. 결과가 연결되고 공유되어 다음 참여로 이어지는 흐름을 만듭니다."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <ul className="space-y-2 text-sm text-brand-slate">
          <li>• 기부 Journey: 시작부터 결과까지 한 흐름으로</li>
          <li>• 인증/리포트: 신뢰할 수 있는 근거 제공</li>
          <li>• 임팩트 요약: 내가 만든 변화가 한눈에 보이게</li>
        </ul>
      </div>
    </Section>
  );
}
