import { describe, it, expect } from 'vitest'
import { encoding } from '.'

const {
   convertToBuffer,
   convertToUint8,
   encodeToString,
   encodeToHex,
   encodeToBase32,
   encodeToBase64,
   encodeToBase64url,
   decodeFromString,
   decodeFromHex,
   decodeFromBase32,
   decodeFromBase64,
   decodeFromBase64url,
} = encoding

describe('Encoding', () => {
   describe('Convert', () => {
      it('should convert to Buffer', () => {
         const uint8array = new Uint8Array(5)

         const buffer = convertToBuffer(uint8array) as ArrayBuffer
         const uint8array2 = convertToUint8(buffer)

         expect(buffer).toBeInstanceOf(ArrayBuffer)
         expect(uint8array2).toEqual(uint8array)
      })

      it('should convert to Uint8Array', () => {
         const buffer = new ArrayBuffer(5)

         const uint8array = convertToUint8(buffer)
         const buffer2 = convertToBuffer(uint8array)

         expect(uint8array).toBeInstanceOf(Uint8Array)
         expect(uint8array).toHaveLength(5)
         expect(buffer2).toEqual(buffer)
      })
   })

   describe('Encode', () => {
      it('should encode to String', () => {
         const uint8array = new Uint8Array([84, 101, 115, 116])

         const str = encodeToString(uint8array)

         expect(str).toBeTypeOf('string')
         expect(str).toHaveLength(4)
         expect(str).toBe('Test')
      })

      it('should encode to Hex', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const hex = encodeToHex(uint8array)

         expect(hex).toBeTypeOf('string')
         expect(hex).toHaveLength(10)
         expect(hex).toBe('0a141e2832')
      })

      it('should encode to Base32', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const base32 = encodeToBase32(uint8array)

         expect(base32).toBeTypeOf('string')
         expect(base32).toHaveLength(8)
         expect(base32).toBe('bikb4kbs')
      })

      it('should encode to Base64', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const base64 = encodeToBase64(uint8array)

         expect(base64).toBeTypeOf('string')
         expect(base64).toHaveLength(7)
         expect(base64).toBe('ChQeKDI')
      })

      it('should encode to Base64url', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const base64url = encodeToBase64url(uint8array)

         expect(base64url).toBeTypeOf('string')
         expect(base64url).toHaveLength(7)
         expect(base64url).toBe('ChQeKDI')
      })
   })

   describe('Decode', () => {
      it('should decode from String', () => {
         const str = 'Test'

         const uint8array = decodeFromString(str)

         expect(uint8array).toBeInstanceOf(Uint8Array)
         expect(uint8array).toHaveLength(4)
         expect(uint8array).toStrictEqual(new Uint8Array([84, 101, 115, 116]))
      })

      it('decodeHex', () => {
         const hex = '0a141e2832'

         const uint8array = decodeFromHex(hex)

         expect(uint8array).toBeInstanceOf(Uint8Array)
         expect(uint8array).toHaveLength(5)
         expect(uint8array).toStrictEqual(new Uint8Array([10, 20, 30, 40, 50]))
      })

      it('decodeBase32', () => {
         const base32 = 'bikb4kbs'

         const uint8array = decodeFromBase32(base32)

         expect(uint8array).toBeInstanceOf(Uint8Array)
         expect(uint8array).toHaveLength(5)
         expect(uint8array).toStrictEqual(new Uint8Array([10, 20, 30, 40, 50]))
      })

      it('decodeBase64', () => {
         const base64 = 'ChQeKDI'

         const uint8array = decodeFromBase64(base64)

         expect(uint8array).toBeInstanceOf(Uint8Array)
         expect(uint8array).toHaveLength(5)
         expect(uint8array).toStrictEqual(new Uint8Array([10, 20, 30, 40, 50]))
      })

      it('decodeBase64url', () => {
         const base64url = 'ChQeKDI'

         const uint8array = decodeFromBase64url(base64url)

         expect(uint8array).toBeInstanceOf(Uint8Array)
         expect(uint8array).toHaveLength(5)
         expect(uint8array).toStrictEqual(new Uint8Array([10, 20, 30, 40, 50]))
      })
   })
})
