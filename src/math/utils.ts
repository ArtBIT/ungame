export const norm = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
};
export const lerp = (norm: number, min: number, max: number): number => {
  return (max - min) * norm + min;
};
export const map = (value: number, sourceMin: number, sourceMax: number, destMin = 0, destMax = 1): number => {
  return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
};
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(Math.min(min, max), Math.min(Math.max(min, max), value));
};
export const distance = (x0: number, y0: number, x1: number, y1: number): number => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  return Math.sqrt(dx * dx + dy * dy);
};
export const snap = (value: number, multiplier = 1): number => ((value / multiplier) | 0) * multiplier;
