import DetailPageShell from "@/components/DetailPageShell";
import { DETAILS_CONTENT, type DetailsId } from "@/lib/detailsContent";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const key = id as DetailsId;
  const content = DETAILS_CONTENT[key];

  if (!content) {
    return (
      <DetailPageShell title="Not Found">
        <p className="text-slate-600">존재하지 않는 페이지입니다.</p>
      </DetailPageShell>
    );
  }

  return (
    <DetailPageShell title={content.title}>
      <p className="text-slate-700">{content.summary}</p>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        (콘텐츠는 나중에 채울 예정)
      </div>
    </DetailPageShell>
  );
}