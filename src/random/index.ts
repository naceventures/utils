import {
   type RandomReader,
   generateRandomIntegerNumber as _generateRandomIntegerNumber,
   generateRandomString as _generateRandomString,
} from '@oslojs/crypto/random'
import {
   encodeHexLowerCase,
   encodeBase32LowerCaseNoPadding,
   encodeBase64NoPadding,
   encodeBase64urlNoPadding,
} from '@oslojs/encoding'
import { ALPHABET } from './alphabet'

// ========== Random Source ==========

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

function generateRandomString(length: number, alphabet: string): string {
   return _generateRandomString(randomSource, alphabet, length)
}

function generateRandomBytes(byteLength: number): Uint8Array {
   const bytes = crypto.getRandomValues(new Uint8Array(byteLength))
   return bytes
}

/* OTP */

function generateRandomOTP(length: number): string {
   return _generateRandomString(randomSource, ALPHABET.all.numeric, length)
}

/* ID */

function generateShortId(): string {
   return generateRandomString(16, ALPHABET.all.alphaNumeric)
}

function generateLongId(): string {
   return generateRandomString(32, ALPHABET.all.alphaNumeric)
}

/* Token */

function generateRandomHex(byteLength: number): string {
   const bytes = generateRandomBytes(byteLength)
   return encodeHexLowerCase(bytes)
}

function generateRandomBase32(byteLength: number): string {
   const bytes = generateRandomBytes(byteLength)
   return encodeBase32LowerCaseNoPadding(bytes)
}

function generateRandomBase64(byteLength: number): string {
   const bytes = generateRandomBytes(byteLength)
   return encodeBase64NoPadding(bytes)
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
   generateRandomOTP,
   generateRandomHex,
   generateRandomBase32,
   generateRandomBase64,
   generateRandomBase64url,
}
