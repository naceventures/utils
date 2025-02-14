const escapeCharsRegex = /['\/\\`"><&]/g
const escapeCharsMap = new Map([
   ["'", '&#39;'],
   ['\/', '&#47;'],
   ['\\', '&#92;'],
   ['`', '&#96;'],
   ['"', '&quot;'],
   ['>', '&gt;'],
   ['<', '&lt;'],
   ['&', '&amp;'],
])

/**
 * Replace potentially harmful character (&, ", ', <, >, /, \, `)
 *
 * @param str A string
 * @returns The string removed from potentially harmful characters
 */
export function escapeHtml(str: string): string {
   return str.replace(escapeCharsRegex, (char) => escapeCharsMap.get(char)!)
}

const unescapeCharsRegex = /&(?:#39|#47|#92|#96|quot|gt|lt|amp);/g
const unescapeCharsMap = new Map([
   ['&#39;', "'"],
   ['&#47;', '\/'],
   ['&#92;', '\\'],
   ['&#96;', '`'],
   ['&quot;', '"'],
   ['&gt;', '>'],
   ['&lt;', '<'],
   ['&amp;', '&'],
])

/**
 * Replace escaped potentially harmful character (&, ", ', <, >, /, \, `)
 *
 * @param str A string
 * @returns The original string replaced with the escaped characters
 */
export function unescapeHtml(str: string): string {
   return str.replace(unescapeCharsRegex, (char) => unescapeCharsMap.get(char)!)

   // &amp; replacement has to be the last one to prevent
   // bugs with intermediate strings containing escape sequences
   // See: https://github.com/validatorjs/validator.js/issues/1827
}
