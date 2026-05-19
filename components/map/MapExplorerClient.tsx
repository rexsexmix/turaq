"use client";

import dynamic from "next/dynamic";

// Leaflet ссылается на window/document, поэтому компонент с картой должен
// грузиться только на клиенте. ssr: false возможен в Client Component.
const MapExplorer = dynamic(
  () => import("./MapExplorer").then((mod) => mod.MapExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[60vh] min-h-[420px] w-full items-center justify-center rounded-card border border-border bg-surface-secondary text-sm text-text-secondary lg:h-[640px]">
        Загружаем карту…
      </div>
    ),
  },
);

export function MapExplorerClient() {
  return <MapExplorer />;
}
