import type { BackoffStrategy } from "../types/retry.types.ts";

export function calculateDelay(
    attemp:number,
    baseDelay:number,
    strategy:BackoffStrategy = 'fixed'
)
{ 
    switch(strategy)
    {
        case 'exponential':
            return baseDelay * 2 ** (attemp - 1);
        case "linear":
            return baseDelay * attemp;
        default:
            return baseDelay;
    }
}