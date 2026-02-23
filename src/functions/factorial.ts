/**
 * Core math logic using BigInt for N=500 precision.
 */
export function calculateFactorialSequence(n: number): string[] {
  if (n < 0) return [];
  const sequence: string[] = ["1"]; // 0!
  let currentFactorial = BigInt(1);

  for (let i = 1; i <= n; i++) {
    currentFactorial *= BigInt(i);
    sequence.push(currentFactorial.toString());
  }
  return sequence;
}
