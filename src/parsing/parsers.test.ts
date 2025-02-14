import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { parseZodSafe } from './zod'

describe('Parser', () => {
   describe('Parse Zod with monad', () => {
      it('should validate an email', () => {
         const emailSchema = z.object({
            email: z.string().email(),
         })

         const data = {
            email: 'user@valid.com',
         }

         const parsed = parseZodSafe(emailSchema, data)

         expect(parsed.ok).toBe(true)
         expect(parsed.ok && parsed.data).toStrictEqual(data)
      })

      it('should error on email validation', () => {
         const emailSchema = z.object({
            email: z.string().email(),
         })

         const data = {
            email: 'user@notvalid',
         }

         const parsed = parseZodSafe(emailSchema, data)

         expect(parsed.ok).toBe(false)
         expect(!parsed.ok && parsed.error).toBeInstanceOf(Error)
      })

      it('should validate an TOTP code', () => {
         const totpSchema = z.object({
            code: z.string().length(6),
         })

         const data = {
            code: '123456',
         }

         const parsed = parseZodSafe(totpSchema, data)

         expect(parsed.ok).toBe(true)
         expect(parsed.ok && parsed.data).toStrictEqual(data)
      })

      it('should error on TOTP code validation', () => {
         const totpSchema = z.object({
            code: z.string().length(6),
         })

         const data = {
            code: '12345',
         }

         const parsed = parseZodSafe(totpSchema, data)

         expect(parsed.ok).toBe(false)
         expect(!parsed.ok && parsed.error).toBeInstanceOf(Error)
      })
   })

   // TODO: Parse zod or throw
   // describe('Parse Zod or throw', () => {})
})
