
export default function getHashCode(str: string): number {
  let hash = 0
  const length = str.length
  if (length === 0) return hash;
  else {
    for (let i = 0; i < length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
}