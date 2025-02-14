import {
   type RandomReader,
   generateRandomIntegerNumber as _generateRandomIntegerNumber,
   generateRandomString as _generateRandomString,
} from '@oslojs/crypto/random'
import { encodeBase32LowerCaseNoPadding, encodeBase64urlNoPadding } from '@oslojs/encoding'

// ========== Constants ==========

// Removed confusing
/**
 * Removed
 * - 0, o, O
 * - 1, i, I, l, L
 * - 8, b, B
 * - 9, g, G
 */
const NUMERIC = '234567'
const LOWER = 'acdefhjklmnpqrstuvwxyz'
const UPPER = 'ACDEFHJKLMNPQRSTUVWXYZ'
const ALPHABET = `${NUMERIC}${LOWER}${UPPER}`

// ========== Helpers ==========

const randomSource: RandomReader = {
   read(bytes) {
      crypto.getRandomValues(bytes)
   },
}

// ========== Handlers ==========

/* Random generators */

function generateRandomInteger(max: number): number {
   return _generateRandomIntegerNumber(randomSource, max)
}

function generateRandomString(length: number): string {
   return _generateRandomString(randomSource, ALPHABET, length)
}

function generateRandomBytes(byteLength: number): Uint8Array {
   const bytes = crypto.getRandomValues(new Uint8Array(byteLength))
   return bytes
}

/* ID */

function generateShortId(): string {
   return generateRandomString(16)
}

function generateLongId(): string {
   return generateRandomString(32)
}

/* Token */

function generateRandomBase32(byteLength: number): string {
   const bytes = generateRandomBytes(byteLength)
   return encodeBase32LowerCaseNoPadding(bytes)
}

function generateRandomBase64(byteLength: number): string {
   const bytes = generateRandomBytes(byteLength)
   return encodeBase64urlNoPadding(bytes)
}

function generateRandomBase64url(byteLength: number): string {
   const bytes = generateRandomBytes(byteLength)
   return encodeBase64urlNoPadding(bytes)
}

// ========== Namespace ==========

export const random = {
   generateRandomInteger,
   generateRandomString,
   generateRandomBytes,
   generateShortId,
   generateLongId,
   generateRandomBase32,
   generateRandomBase64,
   generateRandomBase64url,
}
