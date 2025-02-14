const charCode_af = [97, 102]
const charCode_09 = [48, 57]

export function isHex(str: string): boolean {
   const lowered = str.toLowerCase()
   const len = lowered.length

   for (let i = 0; i < len; i++) {
      const code = lowered.charCodeAt(i)

      if (
         !(charCode_09[0] <= code && code <= charCode_09[1]) &&
         !(charCode_af[0] <= code && code <= charCode_af[1])
      ) {
         return false
      }
   }

   return true
}
