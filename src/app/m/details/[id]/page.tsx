import { notFound } from "next/navigation";
import IosTopBar from "@/components/IosTopBar";
import DetailsTemplate from "@/components/DetailsTemplate";
import { DETAILS_CONTENT, type DetailsId } from "@/lib/detailsContent";

export default async function MobileDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!Object.prototype.hasOwnProperty.call(DETAILS_CONTENT, id)) {
    notFound();
  }

  const content = DETAILS_CONTENT[id as DetailsId];

  return (
    <div className="min-h-dvh bg-brand-bgTint">
      {/* ✅ iOS TopBar로 통일 */}
      <IosTopBar title={content.title} />

      <DetailsTemplate
        title={content.title}
        summary={content.summary}
        heroImageSrc={content.heroImageSrc}
        cta={{ label: "문의하기", href: "/#contact" }}
        sections={[
          { id: "overview", title: "요약", body: "이 섹션에 개요가 들어갑니다." },
          { id: "details", title: "상세", body: "이 섹션에 상세 내용이 들어갑니다." },
          { id: "faq", title: "FAQ", body: "자주 묻는 질문 섹션입니다." },
        ]}
      />
    </div>
  );
}