import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import type { MapPoint } from "../entities";
import {
  MAP_BOUNDS,
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM_STEP,
  clampCenter,
  zoomedViewBox,
} from "../utils";

const DRAG_THRESHOLD_PX = 4;

const INITIAL_CENTER: MapPoint = {
  x: MAP_BOUNDS.x + MAP_BOUNDS.width / 2,
  y: MAP_BOUNDS.y + MAP_BOUNDS.height / 2,
};

type Drag = Readonly<{
  pointerX: number;
  pointerY: number;
  center: MapPoint;
}>;

function useMapZoom() {
  const [zoom, setZoom] = useState<number>(MIN_ZOOM);
  const [center, setCenter] = useState<MapPoint>(INITIAL_CENTER);
  const dragRef = useRef<Drag | null>(null);
  const draggedRef = useRef<boolean>(false);

  const zoomTo = (next: number) => {
    const clamped = Math.min(Math.max(next, MIN_ZOOM), MAX_ZOOM);
    setZoom(clamped);
    setCenter((current) => clampCenter(MAP_BOUNDS, clamped, current));
  };

  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    draggedRef.current = false;
    if (zoom === MIN_ZOOM) return;

    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      center: clampCenter(MAP_BOUNDS, zoom, center),
    };
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (drag === null) return;

    const dx = event.clientX - drag.pointerX;
    const dy = event.clientY - drag.pointerY;

    if (!draggedRef.current && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;

    if (!draggedRef.current)
      event.currentTarget.setPointerCapture(event.pointerId);
    draggedRef.current = true;

    const unitsPerPx =
      MAP_BOUNDS.width / zoom / event.currentTarget.clientWidth;

    setCenter(
      clampCenter(MAP_BOUNDS, zoom, {
        x: drag.center.x - dx * unitsPerPx,
        y: drag.center.y - dy * unitsPerPx,
      }),
    );
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const onClickCapture = (event: MouseEvent<SVGSVGElement>) => {
    if (!draggedRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    draggedRef.current = false;
  };

  return {
    zoom,
    viewBox: zoomedViewBox(MAP_BOUNDS, zoom, center),
    canZoomIn: zoom < MAX_ZOOM,
    canZoomOut: zoom > MIN_ZOOM,
    zoomIn: () => zoomTo(zoom * ZOOM_STEP),
    zoomOut: () => zoomTo(zoom / ZOOM_STEP),
    reset: () => {
      setZoom(MIN_ZOOM);
      setCenter(INITIAL_CENTER);
    },
    panHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onClickCapture,
    },
  };
}

export { useMapZoom };
