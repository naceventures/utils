// ========== Helpers ==========

async function importKey(rawKey: Uint8Array): Promise<CryptoKey> {
   return await crypto.subtle.importKey('raw', rawKey, 'PBKDF2', false, ['deriveKey'])
}

async function deriveKey(key: CryptoKey, salt: Uint8Array): Promise<CryptoKey> {
   return await crypto.subtle.deriveKey(
      {
         name: 'PBKDF2',
         salt: salt,
         iterations: 100000,
         hash: 'SHA-256',
      },
      key,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt'],
   )
}

// ========== Functions ==========

/**
 * Encrypt the provided data
 *
 * https://github.com/lucia-auth/example-sveltekit-email-password-2fa/blob/main/src/lib/server/encryption.ts
 *
 * @param data The data to encrypt
 * @returns Encrypted data
 */
async function encrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
   if (key.byteLength < 16) {
      throw new Error('Encryption key is too weak')
   }

   try {
      // Initialise a random salt and iv
      const salt = crypto.getRandomValues(new Uint8Array(16))
      const iv = crypto.getRandomValues(new Uint8Array(12))

      // import the key in CryptoKey format and derive it
      const cryptoKey = await importKey(key)
      const derivedKey = await deriveKey(cryptoKey, salt)

      // Actual encryption
      const encryptedBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, derivedKey, data)
      const encryptedArray = new Uint8Array(encryptedBuffer)

      // Combine salt + iv + encrypted data together
      const combined = new Uint8Array(salt.byteLength + iv.byteLength + encryptedArray.byteLength)
      combined.set(salt, 0)
      combined.set(iv, salt.byteLength)
      combined.set(encryptedArray, salt.byteLength + iv.byteLength)

      return combined
   } catch (e) {
      throw new Error('Failed to encrypt data', { cause: e })
   }
}

async function encryptFromString(data: string, key: Uint8Array): Promise<Uint8Array> {
   return await encrypt(new TextEncoder().encode(data), key)
}

/**
 * Decrypt the provided encrypted data
 *
 * https://github.com/lucia-auth/example-sveltekit-email-password-2fa/blob/main/src/lib/server/encryption.ts
 *
 * @param encrypted The data to decrypt
 * @returns Decrypted data
 */
async function decrypt(encrypted: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
   // salt (16) + iv (12) + auth tag (16) = 44 bytes overhead minimum on top of encrypted data
   if (encrypted.byteLength < 44) {
      throw new Error('Invalid data')
   }

   try {
      // Separate salt, iv and encrypted data
      const salt = encrypted.slice(0, 16) // salt has 16 bytes
      const iv = encrypted.slice(16, 28) // iv has 12 bytes
      const data = encrypted.slice(28)

      // import the key in CryptoKey format and derive it
      const cryptoKey = await importKey(key)
      const derivedKey = await deriveKey(cryptoKey, salt)

      // Actual decryption
      const decryptedBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, derivedKey, data)
      const decryptedArray = new Uint8Array(decryptedBuffer)

      return decryptedArray
   } catch (e) {
      throw new Error('Failed to decrypt data', {
         cause: e,
      })
   }
}

async function decryptToString(data: Uint8Array, key: Uint8Array): Promise<string> {
   return new TextDecoder().decode(await decrypt(data, key))
}

// ========== Namespace ==========

export const encryption = {
   encrypt,
   encryptFromString,
   decrypt,
   decryptToString,
}
