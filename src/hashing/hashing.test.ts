import { describe, it, expect } from 'vitest'
import { hashing } from '.'

const { sha256, sha512, sha512_256, hmac256, hmac512, hmac512_256 } = hashing

describe('Hashing', () => {
   describe('SHA', () => {
      it('SHA-256', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const hashed = sha256(uint8array)

         expect(hashed).toEqual(
            new Uint8Array([
               110, 245, 58, 100, 8, 236, 68, 41, 121, 31, 168, 8, 228, 251, 231, 132, 63, 147, 99,
               22, 149, 10, 32, 186, 95, 187, 189, 208, 28, 210, 152, 153,
            ]),
         )
      })

      it('SHA-256', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const hashed = sha512(uint8array)

         expect(hashed).toEqual(
            new Uint8Array([
               3, 47, 89, 171, 238, 15, 89, 212, 68, 100, 172, 5, 14, 213, 44, 228, 168, 227, 73,
               228, 177, 125, 218, 168, 32, 64, 100, 21, 127, 20, 139, 178, 143, 45, 115, 62, 238,
               132, 181, 55, 255, 75, 251, 119, 187, 5, 126, 82, 113, 218, 52, 95, 12, 211, 133, 9,
               90, 72, 42, 30, 16, 232, 170, 68,
            ]),
         )
      })

      it('SHA-256', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const hashed = sha512_256(uint8array)

         expect(hashed).toEqual(
            new Uint8Array([
               111, 26, 24, 58, 234, 23, 25, 189, 190, 95, 29, 192, 153, 170, 71, 219, 129, 173, 83,
               129, 19, 203, 188, 96, 74, 142, 211, 37, 16, 252, 111, 152,
            ]),
         )
      })
   })

   describe('HMAC', () => {
      const key = new Uint8Array([0, 0, 0, 0, 0])

      it('SHA-256', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const hashed = hmac256(uint8array, key)

         expect(hashed).toEqual(
            new Uint8Array([
               240, 87, 150, 157, 251, 145, 81, 43, 93, 64, 156, 34, 124, 182, 240, 2, 245, 194, 18,
               151, 51, 3, 22, 175, 126, 118, 101, 143, 132, 175, 47, 13,
            ]),
         )
      })

      it('SHA-256', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const hashed = hmac512(uint8array, key)

         expect(hashed).toEqual(
            new Uint8Array([
               161, 251, 38, 75, 174, 111, 217, 145, 55, 72, 9, 35, 177, 203, 147, 56, 93, 255, 166,
               143, 163, 39, 185, 49, 222, 53, 109, 207, 122, 111, 142, 30, 234, 74, 171, 4, 185,
               113, 211, 58, 73, 48, 88, 36, 234, 133, 249, 27, 179, 30, 104, 237, 7, 106, 79, 170,
               64, 101, 74, 116, 186, 141, 224, 174,
            ]),
         )
      })

      it('SHA-256', () => {
         const uint8array = new Uint8Array([10, 20, 30, 40, 50])

         const hashed = hmac512_256(uint8array, key)

         expect(hashed).toEqual(
            new Uint8Array([
               196, 55, 215, 176, 40, 20, 239, 38, 23, 218, 129, 21, 26, 62, 53, 137, 14, 207, 251,
               196, 237, 136, 146, 41, 66, 101, 98, 221, 206, 208, 29, 133,
            ]),
         )
      })
   })
})
