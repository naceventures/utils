import { describe, it, expect } from 'vitest'
import { isHex } from './isHex'
import { isBase32 } from './isBase32'
import { isBase64 } from './isBase64'
import { isBase64url } from './isBase64url'

describe('Typed', () => {
   it('isHex: should validate an Hex string', () => {
      expect(isHex('48656c6c6f')).toBe(true)
      expect(isHex('48656c6c6g')).toBe(false) // replace 'f' by 'g'
      expect(isHex('Hello World')).toBe(false)
   })

   it('isBase32: should validate a Base32 string', () => {
      expect(isBase32('JBSWY3DP')).toBe(true)
      expect(isBase32('JBSWY1DP')).toBe(false) // replace '3' by '1'
      expect(isBase32('Hello World')).toBe(false)
   })

   it('isBase64: should validate a Base64 string', () => {
      expect(isBase64('SGVsbG8gV29ybGQ')).toBe(true)
      expect(isBase64('SGVsbG8+=')).toBe(false) // replace 's' by '_'
      expect(isBase64('Hello World')).toBe(false)
   })

   it('isBase64url: should validate a Base64url string', () => {
      expect(isBase64url('SGVsbG8-V29ybGQ')).toBe(true)
      expect(isBase64url('SGVsbG8?W29ybGQ=')).toBe(false) // replace '-' by '?'
      expect(isBase64url('Hello World')).toBe(false)
   })
})
