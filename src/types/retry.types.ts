export type FnType = (...args:any[])=>Promise<any>
export type BackoffStrategy = "exponential" | "linear" | "fixed"

type Error = {
    message:string,
    code:string
}

export enum ErrorCode {
    "FIRST_ARGUMENT_FUNCTION",
    "NON_NEGATIVE_RETRIES",
    "NON_NEGATIVE_DELAY",
}

export type Errors = Error[]
export type RetryOptions = {
    retries?: number,
    retryDelay? : number,
    backoff?:BackoffStrategy
}
