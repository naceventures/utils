export function sleep(ms: number): Promise<unknown> {
   return new Promise((r) => setTimeout(r, ms))
}

export const asynchronous = {
   sleep,
}
