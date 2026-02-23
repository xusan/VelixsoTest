/**
 * Calculates a sequence of factorials from 0! to N! 
 * uses BigInt for precision up to N=500.
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
