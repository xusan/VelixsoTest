/* global Office, OfficeRuntime, Excel */

/**
 * @customfunction FACTORIALROW
 * @param n The max number.
 * @helpurl https://example.com/help
 * @returns {Promise<string[][]>} A spill range [0!, 1!, ..., N!]
 */
export async function factorialRow(n: number): Promise<string[][]> {
  // 1. Validation (KISS)
  if (n < 0 || n > 500) throw new Error("N must be between 0 and 500.");

  return new Promise((resolve, reject) => {
    // 2. Offload to Web Worker (Separation of Concerns)
    const worker = new Worker("factorialWorker.js");
    
     worker.onmessage = async (event) => {
      // FIX: Access the .data.data property because of the worker's object structure
      if (event.data.success) {
        const sequence: string[] = event.data.data; 
        const orientation = await OfficeRuntime.storage.getItem("orientation") || "row";
        worker.terminate();
        resolve(orientation === "row" ? [sequence] : sequence.map(v => [v]));
      } else {
        reject(event.data.error);
      }
    };

    worker.onerror = (e) => reject(e);
    worker.postMessage(n);
  });
}
