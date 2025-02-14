import { datetime } from './datetime'
import { encoding } from './encoding'
import { encryption } from './encryption'
import { hashing } from './hashing'
import { parsing } from './parsing'
import { random } from './random'
import { string } from './string'
import { validate } from './validate'

export const dt = { ...datetime }
export const enc = { ...encoding }
export const crypt = { ...encryption }
export const hash = { ...hashing }
export const parse = { ...parsing }
export const rand = { ...random }
export const str = { ...string }
export const val = { ...validate }

export const Utils = {
   dt,
   enc,
   crypt,
   hash,
   parse,
   rand,
   str,
   val,
}
