// import crypto from 'node:crypto'
import { describe, it, expect, beforeAll } from 'vitest'
import { encryption } from '.'

const { encrypt, encryptFromString, decrypt, decryptToString } = encryption

async function generateEncryptionKey() {
   const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
      'encrypt',
      'decrypt',
   ])
   const exportedKey = await crypto.subtle.exportKey('raw', key)
   const uint8key = new Uint8Array(exportedKey)
   return uint8key
}

describe('Encryption', () => {
   let encryptionKey: Uint8Array

   beforeAll(async () => {
      encryptionKey = await generateEncryptionKey()
   })

   describe('Encrypt', () => {
      it('should encrypt a uint8array', async () => {
         const uint8array = new Uint8Array(5)

         const encrypted = await encrypt(uint8array, encryptionKey)

         expect(encrypted).toBeInstanceOf(Uint8Array)
         expect(encrypted).toHaveLength(49)
      })

      it('should encrypt a string', async () => {
         const str = 'data.'

         const encrypted = await encryptFromString(str, encryptionKey)

         expect(encrypted).toBeInstanceOf(Uint8Array)
         expect(encrypted).toHaveLength(49)
      })

      it('should fail to encrypt due to wrong encryption key format', async () => {
         const strData = 'data.'
         const wrongEncryptionKey = '1234567890'

         // @ts-expect-error: wrong encryptionKey format
         const encrypt = async () => await encryptFromString(strData, wrongEncryptionKey)

         await expect(() => encrypt()).rejects.toThrow('Failed to encrypt data')
      })

      it('should fail to encrypt due to wrong encryption key lenght', async () => {
         const strData = 'data.'
         const wrongEncryptionKey = crypto.getRandomValues(new Uint8Array(0))

         const encrypt = async () => await encryptFromString(strData, wrongEncryptionKey)

         await expect(() => encrypt()).rejects.toThrow('Encryption key is too weak')
      })
   })

   describe('Decrypt', () => {
      it('should decrypt a uint8array', async () => {
         const uint8array = new Uint8Array(5)

         const encrypted = await encrypt(uint8array, encryptionKey)
         const decrypted = await decrypt(encrypted, encryptionKey)

         expect(decrypted).toBeInstanceOf(Uint8Array)
         expect(decrypted).toHaveLength(5)
      })

      it('should decrypt to a string', async () => {
         const str = 'data.'

         const encrypted = await encryptFromString(str, encryptionKey)
         const decrypted = await decryptToString(encrypted, encryptionKey)

         expect(decrypted).toBeTypeOf('string')
         expect(decrypted).toHaveLength(5)
         expect(decrypted).toBe('data.')
      })

      it('should fail to decrypt due to wrong encryption key format', async () => {
         const strData = 'data.'
         const wrongEncryptionKey = '1234567890'

         const encrypted = await encryptFromString(strData, encryptionKey)
         // @ts-expect-error: wrong encryptionKey format
         const decrypt = async () => await decryptToString(encrypted, wrongEncryptionKey)

         await expect(() => decrypt()).rejects.toThrow('Failed to decrypt data')
      })

      it('should fail to encrypt due to wrong encryption key lenght', async () => {
         const decrypt = async () => await decryptToString(new Uint8Array(43), encryptionKey)

         await expect(() => decrypt()).rejects.toThrow('Invalid data')
      })
   })
})
