import Section from "@/components/Section";

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="데모/제휴 문의"
      desc="파트너십, 시범 운영, 투자/협업 등 무엇이든 편하게 연락 주세요."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <form className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="이름" />
          <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="이메일" />
          <input className="sm:col-span-2 rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="회사/조직" />
          <textarea className="sm:col-span-2 min-h-[120px] rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="문의 내용" />
          <button className="sm:col-span-2 inline-flex items-center justify-center rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink/90">
            보내기
          </button>
          <p className="sm:col-span-2 text-xs text-brand-slate">* 폼은 데모용입니다. 실제 전송은 백엔드/폼 서비스 연동이 필요합니다.</p>
        </form>
      </div>
    </Section>
  );
}
