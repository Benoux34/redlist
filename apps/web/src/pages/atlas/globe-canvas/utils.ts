const GLOBE_COLORS = {
  water: "#f4f1ec",
  landHover: "#a52a24",
  side: "#dad7d0",
  stroke: "#b2ada3",
  atmosphere: "#b2ada3",
} as const;

const ROTATION_SPEED = 0.35;
const INITIAL_ALTITUDE = 2.2;
const MIN_DISTANCE = 160;
const MAX_DISTANCE = 520;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export {
  GLOBE_COLORS,
  ROTATION_SPEED,
  INITIAL_ALTITUDE,
  MIN_DISTANCE,
  MAX_DISTANCE,
  prefersReducedMotion,
};
