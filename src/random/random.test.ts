import { describe, it, expect } from 'vitest'
import { random } from './'

const {
   generateRandomInteger,
   generateRandomString,
   generateRandomBytes,
   generateShortId,
   generateLongId,
   generateRandomBase32,
   generateRandomBase64,
   generateRandomBase64url,
} = random

describe('Random', () => {
   describe('Random Generators', () => {
      it('should generate a random integer', () => {
         const max = 10
         const randomInteger = generateRandomInteger(max)

         expect(randomInteger).toBeTypeOf('number')
         expect(randomInteger).toBeGreaterThanOrEqual(0)
         expect(randomInteger).toBeLessThan(max)
      })

      it('should generate a random string', () => {
         const randomString = generateRandomString(10)

         expect(randomString).toBeTypeOf('string')
         expect(randomString).toHaveLength(10)
      })

      it('should generate random bytes', () => {
         const secureToken = generateRandomBytes(16)

         expect(secureToken).toBeInstanceOf(Uint8Array)
         expect(secureToken).toHaveLength(16)
      })
   })

   describe('IDs', () => {
      it('should generate a short ID', () => {
         const shortId = generateShortId()

         expect(shortId).toBeTypeOf('string')
         expect(shortId).toHaveLength(16)
      })

      it('should generate a long ID', () => {
         const longId = generateLongId()

         expect(longId).toBeTypeOf('string')
         expect(longId).toHaveLength(32)
      })
   })

   describe('Tokens', () => {
      it('should generate a base32 random token with 16, 32 and 64 bytes', () => {
         const token16 = generateRandomBase32(16)
         const token32 = generateRandomBase32(32)
         const token64 = generateRandomBase32(64)

         expect(token16).toBeTypeOf('string')
         expect(token32).toBeTypeOf('string')
         expect(token64).toBeTypeOf('string')
         expect(token16).toHaveLength(26)
         expect(token32).toHaveLength(52)
         expect(token64).toHaveLength(103)
      })

      it('should generate a base64 random token with 16, 32 and 64 bytes', () => {
         const token16 = generateRandomBase64(16)
         const token32 = generateRandomBase64(32)
         const token64 = generateRandomBase64(64)

         expect(token16).toBeTypeOf('string')
         expect(token32).toBeTypeOf('string')
         expect(token64).toBeTypeOf('string')
         expect(token16).toHaveLength(22)
         expect(token32).toHaveLength(43)
         expect(token64).toHaveLength(86)
      })

      it('should generate a base64url random token with 16, 32 and 64 bytes', () => {
         const token16 = generateRandomBase64url(16)
         const token32 = generateRandomBase64url(32)
         const token64 = generateRandomBase64url(64)

         expect(token16).toBeTypeOf('string')
         expect(token32).toBeTypeOf('string')
         expect(token64).toBeTypeOf('string')
         expect(token16).toHaveLength(22)
         expect(token32).toHaveLength(43)
         expect(token64).toHaveLength(86)
      })
   })
})
