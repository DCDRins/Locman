

export default function mapRange(value, from_1, to_1, from_2, to_2) {
  return (value - from_1) * (to_2 - from_2) / (to_1 - from_1) + from_2;
}
