import { z } from 'zod'
import type { ZodTypeAny, ZodError } from 'zod'

// ========== Types ==========

type Parsed<T extends ZodTypeAny> =
   | { ok: true; data: z.infer<T> }
   | { ok: false; error: ZodError<T> }

// ========== Methods ==========

/**
 * Parse data against a zod schema and return a the validated data or throw a ZodError
 *
 * @param schema A zod schema
 * @param data The data to validate against the zod schema
 * @returns the validated data or throw a ZodError
 * @throw ZodError
 */
export function parseZod<T extends ZodTypeAny>(schema: T, data: unknown) {
   return schema.parse(data) as z.infer<T>
}

/**
 * Parse data against a zod schema and return a Result nomad with either the validated data or the zod error
 *
 * @param schema A zod schema
 * @param data The data to validate against the zod schema
 * @returns A monad containing either the validated data or the zod error
 */
export function parseZodSafe<T extends ZodTypeAny>(schema: T, data: unknown): Parsed<T> {
   const { success, data: parsed, error } = schema.safeParse(data)

   if (success) {
      return { ok: true, data: parsed }
   } else {
      return { ok: false, error }
   }
}
