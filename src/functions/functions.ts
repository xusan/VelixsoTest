/* global Office, OfficeRuntime, CustomFunctions */

// MOVE OUTSIDE: This ensures the worker (and its cache) survives between function calls
const worker = new Worker("factorialWorker.js");

/**
 * @customfunction FACTORIALROW
 * @param n The max number.
 * @returns {Promise<string[][]>} A spill range [0!, 1!, ..., N!]
 */
export async function factorialRow(n: number): Promise<string[][]> {
  if (n < 0 || n > 500) throw new Error("N must be 0-500.");

  return new Promise((resolve, reject) => {
    // Setup the listener for this specific call
    worker.onmessage = async (event) => {
      if (event.data.success) {
        const sequence: string[] = event.data.data;
        const orientation = (await OfficeRuntime.storage.getItem("orientation")) || "row";
        
        // IMPORTANT: Do NOT call worker.terminate() here, or the cache is wiped!
        
        resolve(orientation === "row" ? [sequence] : sequence.map(v => [v]));
      } else {
        reject(event.data.error);
      }
    };

    worker.onerror = (err) => reject(err);

    // Send the task to the background thread
    worker.postMessage(n);
  });
}

// Ensure function is registered
Office.onReady(() => {
  CustomFunctions.associate("FACTORIALROW", factorialRow);
});
