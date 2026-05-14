import type { Errors, FnType, RetryOptions } from "../types/retry.types.ts";
import { calculateDelay } from "../utils/calculateDelay.js";

export function retry(fn: FnType, options: RetryOptions = {}) {
    const retries = options.retries ?? 3;
    const delay = options.retryDelay ?? 1000;
    const strategy = options.backoff ?? "fixed"
    let currentAttemp = 0 

    const errors:Errors = []
    
    if(!(fn instanceof Function))
    {
        errors.push({
            message:"first argument must be function",
            code:"FIRST_ARGUMENT_FUNCTION"
        })
    }

    if(retries<0)
    {
        errors.push({
            message : "retries can not be negative or zero",
            code : 'NON_NEGATIVE_RETRIES'
        })
    }
    if(delay<0)
    {
        errors.push({
            message : "delay can not be negative",
            code : "NON_NEGATIVE_DELAY"
        })
    }

    if(errors.length>0)
    {
        return Promise.reject(errors)
    }

    return new Promise((resolve, reject) => {
        // create an attemp function 
        async function makeAsync()
        {
            try {
                return await fn()
            } catch (error) {
                return Promise.reject(error)
            }
        }
        function attemp() {
            // incrase Atttemp
            makeAsync().then((result) => {
                resolve(result)
            }).catch((error) => {
                currentAttemp++;
                if(currentAttemp >= retries)
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