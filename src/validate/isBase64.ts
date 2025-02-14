const charCode_az = [97, 122]
const charCode_AZ = [65, 90]
const charCode_09 = [48, 57]
const charCode_b64 = [43, 47] // '+' and '/'

export function isBase64(str: string): boolean {
   const len = str.length

   for (let i = 0; i < len; i++) {
      const code = str.charCodeAt(i)

      if (
         !(charCode_AZ[0] <= code && code <= charCode_AZ[1]) &&
         !(charCode_az[0] <= code && code <= charCode_az[1]) &&
         !(charCode_09[0] <= code && code <= charCode_09[1]) &&
         !(code === charCode_b64[0]) &&
         !(code === charCode_b64[1])
      ) {
         return false
      }
   }

   return true
}
