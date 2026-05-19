"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { buildPropertyDetailUrl } from "@/lib/catalogFrom";
import { properties } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types/property";

const ALMATY_CENTER: [number, number] = [43.24, 76.95];
const ALMATY_ZOOM = 11;

const MAP_BRAND = "#00c389";
const MAP_BRAND_DEEP = "#0e5c3f";

type LatLng = { lat: number; lng: number };

function pointInPolygon(point: LatLng, polygon: LatLng[]): boolean {
  // Алгоритм ray-casting: считаем пересечения горизонтального луча
  // от точки с рёбрами многоугольника.
  let inside = false;
  const x = point.lng;
  const y = point.lat;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi || Number.EPSILON) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function hasCoords(p: Property): p is Property & { lat: number; lng: number } {
  return typeof p.lat === "number" && typeof p.lng === "number";
}

export function MapExplorer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const propertyLayerRef = useRef<L.LayerGroup | null>(null);
  const drawingPolylineRef = useRef<L.Polyline | null>(null);
  const drawingVertexLayerRef = useRef<L.LayerGroup | null>(null);
  const polygonLayerRef = useRef<L.Polygon | null>(null);

  const [drawing, setDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<LatLng[]>([]);
  const [polygon, setPolygon] = useState<LatLng[] | null>(null);

  const propertiesWithCoords = useMemo(() => properties.filter(hasCoords), []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = L.map(containerRef.current, {
      center: ALMATY_CENTER,
      zoom: ALMATY_ZOOM,
      zoomControl: true,
      doubleClickZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const propertyLayer = L.layerGroup().addTo(map);
    propertyLayerRef.current = propertyLayer;

    for (const p of properties) {
      if (!hasCoords(p)) continue;
      L.circleMarker([p.lat, p.lng], {
        radius: 6,
        weight: 2,
        color: MAP_BRAND_DEEP,
        fillColor: MAP_BRAND,
        fillOpacity: 0.85,
        // Не перехватываем клики, чтобы не мешать рисованию многоугольника.
        interactive: false,
      }).addTo(propertyLayer);
    }

    drawingVertexLayerRef.current = L.layerGroup().addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      propertyLayerRef.current = null;
      drawingVertexLayerRef.current = null;
      drawingPolylineRef.current = null;
      polygonLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const onClick = (event: L.LeafletMouseEvent) => {
      setDrawnPoints((prev) => [
        ...prev,
        { lat: event.latlng.lat, lng: event.latlng.lng },
      ]);
    };

    if (drawing) {
      map.getContainer().style.cursor = "crosshair";
      map.on("click", onClick);
    }

    return () => {
      map.off("click", onClick);
      map.getContainer().style.cursor = "";
    };
  }, [drawing]);

  useEffect(() => {
    const map = mapRef.current;
    const vertexLayer = drawingVertexLayerRef.current;
    if (!map || !vertexLayer) return;

    vertexLayer.clearLayers();
    if (drawingPolylineRef.current) {
      drawingPolylineRef.current.remove();
      drawingPolylineRef.current = null;
    }

    if (!drawing || drawnPoints.length === 0) {
      return;
    }

    if (drawnPoints.length >= 2) {
      drawingPolylineRef.current = L.polyline(
        drawnPoints.map((p) => [p.lat, p.lng]),
        {
          color: MAP_BRAND,
          weight: 2,
          dashArray: "6 6",
          interactive: false,
        },
      ).addTo(map);
    }

    for (const p of drawnPoints) {
      L.circleMarker([p.lat, p.lng], {
        radius: 5,
        weight: 2,
        color: MAP_BRAND_DEEP,
        fillColor: "#ffffff",
        fillOpacity: 1,
        interactive: false,
      }).addTo(vertexLayer);
    }
  }, [drawnPoints, drawing]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (polygonLayerRef.current) {
      polygonLayerRef.current.remove();
      polygonLayerRef.current = null;
    }

    if (!polygon || polygon.length < 3) {
      return;
    }

    polygonLayerRef.current = L.polygon(
      polygon.map((p) => [p.lat, p.lng]),
      {
        color: MAP_BRAND_DEEP,
        weight: 2,
        fillColor: MAP_BRAND,
        fillOpacity: 0.18,
        interactive: false,
      },
    ).addTo(map);
  }, [polygon]);

  const startDrawing = useCallback(() => {
    setPolygon(null);
    setDrawnPoints([]);
    setDrawing(true);
  }, []);

  const finishDrawing = useCallback(() => {
    setDrawnPoints((current) => {
      if (current.length >= 3) {
        setPolygon(current);
      }
      return [];
    });
    setDrawing(false);
  }, []);

  const cancelDrawing = useCallback(() => {
    setDrawnPoints([]);
    setDrawing(false);
  }, []);

  const clearZone = useCallback(() => {
    setPolygon(null);
    setDrawnPoints([]);
    setDrawing(false);
  }, []);

  const filteredProperties = useMemo<Property[] | null>(() => {
    if (!polygon) return null;
    return propertiesWithCoords.filter((p) =>
      pointInPolygon({ lat: p.lat, lng: p.lng }, polygon),
    );
  }, [polygon, propertiesWithCoords]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="relative w-full overflow-hidden rounded-card border border-border bg-surface-secondary">
        <div
          ref={containerRef}
          className="h-[60vh] min-h-[420px] w-full lg:h-[640px]"
          role="application"
          aria-label="Карта Казахстана с областью поиска"
        />

        <div className="pointer-events-none absolute left-3 top-3 z-[400] flex flex-col gap-2">
          {!drawing && !polygon ? (
            <button
              type="button"
              onClick={startDrawing}
              className="pointer-events-auto rounded-pill bg-brand px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-brand-deep"
            >
              Нарисовать зону
            </button>
          ) : null}

          {drawing ? (
            <div className="pointer-events-auto flex flex-col gap-2 rounded-card bg-surface-secondary/95 p-3 shadow-md backdrop-blur">
              <p className="text-xs text-text-secondary">
                Кликайте по карте, чтобы добавить точки. Минимум 3.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={finishDrawing}
                  disabled={drawnPoints.length < 3}
                  className="rounded-pill bg-brand px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-brand-deep disabled:cursor-not-allowed disabled:bg-text-secondary/40"
                >
                  Завершить ({drawnPoints.length})
                </button>
                <button
                  type="button"
                  onClick={cancelDrawing}
                  className="rounded-pill border border-border bg-surface px-4 py-2 text-xs font-medium text-text-primary transition-all duration-200 hover:bg-surface-secondary"
                >
                  Отменить
                </button>
              </div>
            </div>
          ) : null}

          {polygon && !drawing ? (
            <div className="pointer-events-auto flex flex-wrap gap-2 rounded-card bg-surface-secondary/95 p-3 shadow-md backdrop-blur">
              <button
                type="button"
                onClick={startDrawing}
                className="rounded-pill border border-border bg-surface px-4 py-2 text-xs font-medium text-text-primary transition-all duration-200 hover:bg-surface-secondary"
              >
                Нарисовать заново
              </button>
              <button
                type="button"
                onClick={clearZone}
                className="rounded-pill bg-brand px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-brand-deep"
              >
                Очистить зону
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <aside className="w-full shrink-0 lg:w-[360px]">
        <div className="rounded-card border border-border bg-surface-secondary p-4">
          <h2 className="text-lg font-semibold text-text-primary">Объявления в зоне</h2>
          {filteredProperties === null ? (
            <p className="mt-2 text-sm text-text-secondary">
              Нарисуйте многоугольник на карте, чтобы увидеть подходящие объявления. До этого
              показываются все точки на карте.
            </p>
          ) : (
            <p className="mt-2 text-sm text-text-secondary">
              Найдено в выбранной зоне:{" "}
              <span className="font-medium tabular-nums text-text-primary">
                {filteredProperties.length}
              </span>
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {filteredProperties === null ? (
              <div className="rounded-card border border-dashed border-border bg-surface p-4 text-sm text-text-secondary">
                Список после выбора зоны
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="rounded-card border border-dashed border-border bg-surface p-4 text-sm text-text-secondary">
                В выбранной зоне нет объявлений. Попробуйте увеличить площадь поиска.
              </div>
            ) : (
              filteredProperties.map((p) => (
                <Link
                  key={p.id}
                  href={buildPropertyDetailUrl(p.id)}
                  className="flex flex-col gap-1 rounded-card border border-border bg-surface p-3 transition-colors duration-200 hover:border-brand"
                >
                  <span className="text-sm font-medium text-text-primary">{p.title}</span>
                  <span className="text-base font-semibold tabular-nums text-brand">
                    {formatPrice(p.price, p.pricePerMonth)}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {p.rooms}-комн · {p.area} м² · {p.district}, {p.city}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
