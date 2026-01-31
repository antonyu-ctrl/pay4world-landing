import { notFound } from "next/navigation";
import DetailOverlay from "@/components/DetailOverlay";
import DetailsTemplate from "@/components/DetailsTemplate";
import { DETAILS_CONTENT, type DetailsId } from "@/lib/detailsContent";

export default async function DetailsModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 런타임 방어 + 타입 안정
  if (!Object.prototype.hasOwnProperty.call(DETAILS_CONTENT, id)) {
    // 오버레이 슬롯이므로 notFound() 대신 null로 조용히 처리하고 싶으면 return null로 바꿔도 됨
    notFound();
  }

  const key = id as DetailsId;
  const content = DETAILS_CONTENT[key];

  return (
    <DetailOverlay title={content.title}>
      {/* 데스크탑 오버레이도 모바일과 동일한 "섹션 템플릿"으로 통일 */}
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
    </DetailOverlay>
  );
}