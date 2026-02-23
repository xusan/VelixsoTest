import { calculateFactorialSequence } from "./factorial";

test("calculates factorials correctly up to 3", () => {
  const result = calculateFactorialSequence(3);
  expect(result).toEqual(["1", "1", "2", "6"]); // 0!, 1!, 2!, 3!
});

test("handles large N (500) without precision loss", () => {
  const result = calculateFactorialSequence(500);
  expect(typeof result[500]).toBe("string");
  expect(result[500].length).toBeGreaterThan(1000); // 500! is > 1000 digits
});
