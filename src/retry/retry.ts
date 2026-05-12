import type { FnType, RetryOptions } from "../types/retry.types.ts";
import { calculateDelay } from "../utils/calculateDelay.js";

export function retry(fn: FnType, options: RetryOptions = {}) {
    const retries = options.retries ?? 3;
    let delay = options.retryDelay ?? 1000;
    const strategy = options.backoff ?? "fixed"
    let currentAttemp = 0

    return new Promise((resolve, reject) => {
        // create an attemp function 
        function attemp() {
            // incrase Atttemp
            fn().then((result) => {
                resolve(result)
            }).catch((error) => {
                currentAttemp++;
                if(currentAttemp === retries)
                    reject(error)
                else
                {
                    setTimeout(attemp,calculateDelay(currentAttemp,delay,strategy))
                }
        })
        }
        attemp()
    })
}