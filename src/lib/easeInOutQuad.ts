
export default function easeOutInQuad (currentTime, startValue, changes, duration): number {
  currentTime /= duration * 0.5;
  if (currentTime < 1) return changes / 2 * currentTime * currentTime + startValue;
  currentTime -= 1;
  return -changes / 2 * (currentTime * (currentTime - 2) - 1) + startValue;
}