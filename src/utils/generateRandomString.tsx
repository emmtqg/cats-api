export default function generateRandomString(): string {
  return Math.random().toString(20).substr(2, 6)
}
