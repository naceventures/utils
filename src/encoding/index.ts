import {
   encodeHexLowerCase,
   decodeHex as decodeHexLowerCase,
   encodeBase32LowerCaseNoPadding,
   decodeBase32IgnorePadding,
   encodeBase64NoPadding,
   decodeBase64IgnorePadding,
   encodeBase64urlNoPadding,
   decodeBase64urlIgnorePadding,
} from '@oslojs/encoding'

// ========== Methods ==========

/* Binary conversion */

function convertToUint8(buffer: ArrayBuffer): Uint8Array {
   return new Uint8Array(buffer)
}

function convertToBuffer(uint8: Uint8Array): ArrayBuffer | SharedArrayBuffer {
   return uint8.buffer.slice(uint8.byteOffset, uint8.byteOffset + uint8.byteLength)
}

/* Encoder */

function encodeToString(bytes: Uint8Array): string {
   return new TextDecoder().decode(bytes)
}

function encodeToHex(bytes: Uint8Array): string {
   // TODO: replace with `Uint8Array.prototype.toHex()`
   return encodeHexLowerCase(bytes)
}

function encodeToBase32(bytes: Uint8Array): string {
   return encodeBase32LowerCaseNoPadding(bytes)
}

function encodeToBase64(bytes: Uint8Array): string {
   // TODO: replace with `Uint8Array.prototype.toBase64()`
   return encodeBase64NoPadding(bytes)
}

function encodeToBase64url(bytes: Uint8Array): string {
   return encodeBase64urlNoPadding(bytes)
}

/* Decoder */

function decodeFromString(str: string): Uint8Array {
   return new TextEncoder().encode(str)
}

function decodeFromHex(hex: string): Uint8Array {
   // TODO: replace with `Uint8Array.fromHex()`
   return decodeHexLowerCase(hex)
}

function decodeFromBase32(base32: string): Uint8Array {
   return decodeBase32IgnorePadding(base32)
}

function decodeFromBase64(base64: string): Uint8Array {
   // TODO: replace with `Uint8Array.fromBase64()`
   return decodeBase64IgnorePadding(base64)
}

function decodeFromBase64url(base64url: string): Uint8Array {
   return decodeBase64urlIgnorePadding(base64url)
}

// ========== Namespace ==========

export const encoding = {
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
}
