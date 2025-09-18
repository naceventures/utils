// ========== Alphabet ==========

const NUMERIC = '0123456789'
const LOWER_ALPHABETIC = 'abcdefghijklmnopqrstuvwxyz'
const UPPER_ALPHABETIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER_ALPHANUMERIC = `${NUMERIC}${LOWER_ALPHABETIC}`
const UPPER_ALPHANUMERIC = `${NUMERIC}${UPPER_ALPHABETIC}`
const ALPHANUMERIC = `${NUMERIC}${LOWER_ALPHABETIC}${UPPER_ALPHABETIC}`

// ========== Safe Alphabet ==========

/**
 * Removed confusing characters
 *
 * - 0, o, O
 * - 1, i, I, l, L
 * - 8, b, B
 * - 9, g, G
 */

const SAFE_NUMERIC = '234567'
const SAFE_LOWER_ALPHABETIC = 'acdefhjkmnpqrstuvwxyz'
const SAFE_UPPER_ALPHABETIC = 'ACDEFHJKMNPQRSTUVWXYZ'
const SAFE_LOWER_ALPHANUMERIC = `${SAFE_NUMERIC}${SAFE_LOWER_ALPHABETIC}`
const SAFE_UPPER_ALPHANUMERIC = `${SAFE_NUMERIC}${SAFE_UPPER_ALPHABETIC}`
const SAFE_ALPHANUMERIC = `${SAFE_NUMERIC}${SAFE_LOWER_ALPHABETIC}${SAFE_UPPER_ALPHABETIC}`

// ========== Export ==========

export const ALPHABET = {
   all: {
      numeric: NUMERIC,
      lowerAlphabetic: LOWER_ALPHABETIC,
      upperAlphabetic: UPPER_ALPHABETIC,
      lowerAlphaNumeric: LOWER_ALPHANUMERIC,
      upperAlphaNumeric: UPPER_ALPHANUMERIC,
      alphaNumeric: ALPHANUMERIC,
   },
   safe: {
      numeric: SAFE_NUMERIC,
      lowerAlphabetic: SAFE_LOWER_ALPHABETIC,
      upperAlphabetic: SAFE_UPPER_ALPHABETIC,
      lowerAlphaNumeric: SAFE_LOWER_ALPHANUMERIC,
      upperAlphaNumeric: SAFE_UPPER_ALPHANUMERIC,
      alphaNumeric: SAFE_ALPHANUMERIC,
   },
}
