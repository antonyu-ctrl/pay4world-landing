import Image from "next/image";
import { SCENE_CONTROLS as C, SceneBgPresetName } from "@/lib/sceneControls";

export default function SceneMedia({
  presetName,
  src,
  alt,
}: {
  presetName: SceneBgPresetName;
  src?: string;
  alt?: string;
}) {
  const preset = C.bg.presets[presetName];

  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm",
        preset.mediaCardBgClass,
      ].join(" ")}
    >
      {/* 카드 위에 은은한 민트 하이라이트 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(72,186,175,0.18)_0%,rgba(255,255,255,0)_60%)]" />

      {src ? (
        <div className="relative min-h-[320px]">
          <Image
            src={src}
            alt={alt ?? "Section illustration"}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 92vw"
            priority={false}
          />
        </div>
      ) : (
        <div className="relative flex min-h-[320px] items-center justify-center p-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-brand-ink">{C.media.placeholderLabel}</p>
            <p className="mt-2 text-xs text-brand-slate">추후 실제 이미지/그래픽으로 교체 예정</p>
          </div>
        </div>
      )}
    </div>
  );
}