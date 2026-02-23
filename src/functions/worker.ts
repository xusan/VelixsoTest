import { calculateFactorialSequence } from "./factorial";

/* global self */
self.onmessage = (event: MessageEvent) => {
  const n = event.data;
  try {
    const results = calculateFactorialSequence(n);
    self.postMessage({ success: true, data: results });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
};
