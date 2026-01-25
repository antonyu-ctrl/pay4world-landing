import Image from "next/image";

type Tile = { x: string; y: string };

export default function GalleryStrip({
  src,
  alt,
  tiles,
  height = 180
}: {
  src: string;
  alt: string;
  tiles: Tile[];
  height?: number;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="flex gap-3 overflow-x-auto p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {tiles.map((t, idx) => (
          <div
            key={idx}
            className="relative shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
            style={{ width: Math.round(height * 1.18), height }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              style={{
                objectPosition: `${t.x} ${t.y}`,
                transform: "scale(1.4)"
              }}
              priority={idx < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}