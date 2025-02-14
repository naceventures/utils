const charCode_AZ = [65, 90]
const charCode_27 = [50, 55]

export function isBase32(str: string): boolean {
   const uppered = str.toUpperCase()
   const len = uppered.length

   for (let i = 0; i < len; i++) {
      const code = uppered.charCodeAt(i)

      if (
         !(charCode_AZ[0] <= code && code <= charCode_AZ[1]) &&
         !(charCode_27[0] <= code && code <= charCode_27[1])
      ) {
         return false
      }
   }

   return true
}
