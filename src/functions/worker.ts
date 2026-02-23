/* global self */

// PERSISTENT CACHE: Stays in memory as long as the worker is alive
const globalCache: Map<number, string> = new Map([
  [0, "1"]
]);

self.onmessage = (event: MessageEvent) => {
  const n = event.data;
  try {
    const results: string[] = [];
    let lastKnownVal = BigInt(1);
    let lastKnownN = 0;

    // 1. Find the highest N we have already calculated in the cache
    for (let i = n; i >= 0; i--) {
      if (globalCache.has(i)) {
        lastKnownN = i;
        lastKnownVal = BigInt(globalCache.get(i)!);
        break;
      }
    }

    // 2. Calculate only the missing gap
    for (let i = 0; i <= n; i++) {
      if (i <= lastKnownN) {
        // Pull existing value
        results.push(globalCache.get(i)!);
      } else {
        // Calculate new value and update cache
        lastKnownVal *= BigInt(i);
        const strVal = lastKnownVal.toString();
        globalCache.set(i, strVal);
        results.push(strVal);
      }
    }

    self.postMessage({ success: true, data: results });
  } catch (error) {
    self.postMessage({ success: false, error: (error as Error).message });
  }
};
