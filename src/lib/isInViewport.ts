
export default function isInViewport(element, offset = 0) {
  const top = element.getBoundingClientRect().top;
  return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
}
