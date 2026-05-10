export type FnType = (...args:any[])=>Promise<any>
export type BackoffStrategy = "exponential" | "linear" | "fixed"

export type RetryOptions = {
    retries?: number,
    retryDelay? : number,
    backoff?:BackoffStrategy
}
