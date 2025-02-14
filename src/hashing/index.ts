import {
   SHA256,
   sha256 as _sha256,
   SHA512,
   sha512 as _sha512,
   SHA512_256,
   sha512_256 as _sha512_256,
} from '@oslojs/crypto/sha2'
import { hmac } from '@oslojs/crypto/hmac'

// ========== Methods ==========

/* SHA */

function sha256(bytes: Uint8Array): Uint8Array {
   return _sha256(bytes)
}

function sha512(bytes: Uint8Array): Uint8Array {
   return _sha512(bytes)
}

function sha512_256(bytes: Uint8Array): Uint8Array {
   return _sha512_256(bytes)
}

/* HMAC */

function hmac256(message: Uint8Array, key: Uint8Array): Uint8Array {
   return hmac(SHA256, message, key)
}

function hmac512(message: Uint8Array, key: Uint8Array): Uint8Array {
   return hmac(SHA512, message, key)
}

function hmac512_256(message: Uint8Array, key: Uint8Array): Uint8Array {
   return hmac(SHA512_256, message, key)
}

// ========== Namespace ==========

export const hashing = {
   sha256,
   sha512,
   sha512_256,
   hmac256,
   hmac512,
   hmac512_256,
}
