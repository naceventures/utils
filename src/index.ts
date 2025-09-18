import { string } from './string'
import { datetime } from './datetime'
import { object } from './object'
import { asynchronous } from './asynchronous'
import { encoding } from './encoding'
import { encryption } from './encryption'
import { hashing } from './hashing'
import { parsing } from './parsing'
import { random } from './random'
import { ALPHABET } from './random/alphabet'
import { validate } from './validate'

export const str = { ...string }
export const dt = { ...datetime }
export const obj = { ...object }
export const async = { ...asynchronous }
export const enc = { ...encoding }
export const crypt = { ...encryption }
export const hash = { ...hashing }
export const parse = { ...parsing }
export const rand = { ...random }
export const val = { ...validate }
export { ALPHABET }

export const Utils = {
   str,
   dt,
   obj,
   async,
   enc,
   crypt,
   hash,
   parse,
   rand,
   val,
   ALPHABET,
}
