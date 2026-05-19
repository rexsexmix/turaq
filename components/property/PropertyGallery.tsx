"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useState } from "react";

type PropertyGalleryProps = {
  images: string[];
  alt: string;
  isVerified?: boolean;
};

export function PropertyGallery({ images, alt, isVerified = false }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = images[activeIndex] ?? images[0];
  const hasMultiple = images.length > 1;

  if (!activeSrc) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-large bg-surface-secondary">
        <Image
          src={activeSrc}
          alt={hasMultiple ? `${alt}, фото ${activeIndex + 1}` : alt}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 960px) 100vw, 960px"
          className="object-cover"
        />
        {isVerified ? (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-pill bg-gold px-3 py-1.5 text-xs font-medium text-black">
            <Check className="h-3.5 w-3.5" aria-hidden />
            Проверено
          </span>
        ) : null}
      </div>

      {hasMultiple ? (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Фотографии объекта"
        >
          {images.map((src, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Фото ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-button border-2 transition-colors duration-200 ${
                  selected ? "border-brand" : "border-border hover:border-brand/50"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
