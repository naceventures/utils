# @naceventures/utils

> Reusable utility functions

## Highlights

- Written in TypeScript
- Cover useful utilities

## Install

```ts
pnpm add @naceventures/utils
```

## Usage

You can either import `Utils` or individual namespaces but you can't import individual functions

```ts
import { Utils } from '@naceventures/utils'
// OR
import { dt, enc, crypt, hash, parse, rand, str, val } from '@naceventures/utils'

Utils.dt.add(...)
// OR
dt.add(...)

// datetime
dt.add('2025-01-29T11:30:25.100Z', 'PT5H')
//=> Temporal.Instant('2025-01-29T16:30:25.100Z')

// encoding
enc.encodeToBase64url(new Uint8Array([10, 20, 30, 40, 50]))
//=> 'ChQeKDI'

// encryption
crypt.encrypt(
   new Uint8Array([10, 20, 30, 40, 50]), // data
   new Uint8Array[0, 0, 0, 0, 0]) // encryption key
)
//=> encrypted bytes

// hashing
hash.sha256(new Uint8Array([10, 20, 30, 40, 50]))
//=> new Uint8Array([110, 245, 58, 100, 8, 236, 68, 41, 121, 31, 168, 8, 228, 251, 231, 132, 63, 147, 99, 22, 149, 10, 32, 186, 95, 187, 189, 208, 28, 210, 152, 153])

// parsing
const emailSchema = z.object({
   email: z.string().email(),
})

const data = {
   email: 'user@valid.com',
}

parseZod(emailSchema, data)
//=> successfully parsed

// Random
rand.generateRandomBase32(16)
//=> kvbvhswtnh3g3244c4j3ezrb7e

// String
str.normalizeEmail('some.name.middleName+extension@gmail.com')
//=> 'somenamemiddlename@gmail.com'

// Validate
val.isBase64('SGVsbG8gV29ybGQ')
//=> true
```
## API

### 🕐 dt

##### `.now(): Temporal.Instant`
Rounded a Temporal.Instant rounded to the milliseconds

##### `.toString(date: string | number | Temporal.Instant): string`

Convert a date in a ISO string

##### `.toInstant(date: string | number | Temporal.Instant): Temporal.Instant`

Parse a date to a Temporal.Instant

##### `.isPast(date: string | number | Temporal.Instant): boolean`

Check if a date happened in the past

##### `.isFuture(date: string | number | Temporal.Instant): boolean`

Check if a date will happen in the future

##### `.add(date: string | number | Temporal.Instant, period: string): Temporal.Instant`

Add a period to a date

```ts
const instant = Temporal.Now.instant()
instant.add('PT5H')
```

##### `.sub(date: string | number | Temporal.Instant, period: string): Temporal.Instant`

Substract a period to a date

```ts
const instant = Temporal.Now.instant()
instant.substract('PT10M')
```

### 🧲 enc

#### Binary conversion

##### `.convertToUint8(buffer: ArrayBuffer): Uint8Array`

Converts a Buffer to a Uint8Array

##### `.convertToBuffer(uint8: Uint8Array): ArrayBuffer | SharedArrayBuffer`

Converts a Uint8Array to a Buffer

#### Encoder

##### `.encodeToString(bytes: Uint8Array): string`

Encode data into string

##### `.encodeToHex(bytes: Uint8Array): string`

Encodes bytes into hex with lower case letters

##### `.encodeToBase32(bytes: Uint8Array): string`

Encodes bytes into base32 with lower case letters and the padding omitted

##### `.encodeToBase64(bytes: Uint8Array): string`

Encodes bytes into base64 with the padding omitted

##### `.encodeToBase64url(bytes: Uint8Array): string`

Encodes bytes into base64 with url-safe alphabet and the padding omitted.

#### Decoder

##### `.decodeFromString(str: string): Uint8Array`

Decode a string into bytes

##### `.decodeFromHex(hex: string): Uint8Array`

Decodes an hex encoded string into bytes. Throws an Error if the hex string is malformed.

##### `.decodeFromBase32(base32: string): Uint8Array`

Decode a Base32 string to a Uint8Array
Decodes a base32 encoded string into bytes. Throws an Error if the encoding is invalid.

##### `.decodeFromBase64(base64: string): Uint8Array`

Decode a Base64 string to a Uint8Array
Decodes a base64 encoded string into bytes. Throws an Error if the encoding is invalid.

##### `.decodeFromBase64url(base64url: string): Uint8Array`

Decodes a base64 encoded string with url-safe alphabet into bytes. Throws an Error if the encoding is invalid.

### 🔒 crypt

#### Encrypt

##### `.encrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array>`

Encrypt bytes given an encryption key

##### `.encryptFromString(data: string, key: Uint8Array): Promise<Uint8Array>`

Encrypt a string given an encryption key

#### Decrypt

##### `.decrypt(encrypted: Uint8Array, key: Uint8Array): Promise<Uint8Array>`

Decrypt bytes given an encryption key

##### `.decryptToString(data: Uint8Array, key: Uint8Array): Promise<string>`

Decrypt bytes into string given an encryption key

### 🥷🏻 hash

#### SHA

##### `.sha256(bytes: Uint8Array): Uint8Array`

Synchronously hashes data with SHA-256

##### `.sha512(bytes: Uint8Array): Uint8Array`

Synchronously hashes data with SHA-512

##### `.sha512_256(bytes: Uint8Array): Uint8Array`

Synchronously hashes data with SHA-512/256

#### HMAC

##### `.hmac256(message: Uint8Array, key: Uint8Array): Uint8Array`

Synchronously hashes data with HMAC and SHA-256

##### `.hmac512(message: Uint8Array, key: Uint8Array): Uint8Array`

Synchronously hashes data with HMAC and SHA-512

##### `.hmac512_256(message: Uint8Array, key: Uint8Array): Uint8Array`

Synchronously hashes data with HMAC and SHA-512/256

### ✅ parse

#### Zod

##### `.parseZod<T extends ZodTypeAny>(schema: T, data: unknown)`

Parse data given a Zod schema. Return the validated data, or throw a ZodError

##### `.parseZodSafe<T extends ZodTypeAny>(schema: T, data: unknown): Parsed<T>`

Parse data given a Zod schema. Return a monad containing either the validated data or the zod error

### ❓ rand

#### Random generators

##### `.generateRandomInteger(max: number): number`

Generate a random integer between 0 included and `max` excluded

##### `.generateRandomString(length: number): string`

Generate a random string of length `length`

##### `.generateRandomBytes(byteLength: number): Uint8Array`

Generate random bytes of byte length `byteLength`

```ts
generateRandomBytes(16)
generateRandomBytes(32)
```

#### ID

##### `.generateShortId(): string`

Generate a random short ID with 16 characters

##### `.generateLongId(): string`

Generate a random long ID with 32 characters

#### Token

##### `.generateRandomBase32(byteLength: number): string`

Generate a random base32 encoded string from `byteLength` bytes

##### `.generateRandomBase64(byteLength: number): string`

Generate a random base64 encoded string from `byteLength` bytes

##### `.generateRandomBase64url(byteLength: number): string`

Generate a random base64url encoded string from `byteLength` bytes

### 🧵 str

#### Escape

##### `.escapeHtml(str: string): string`

Escape potentially harmful HTML characters

- Replace `'` with `&#39;`
- Replace `\/` with `&#47;`
- Replace `\\` with `&#92;`
- Replace ``` with `&#96;`
- Replace `"` with `&quot;`
- Replace `>` with `&gt;`
- Replace `<` with `&lt;`
- Replace `&` with `&amp;`

##### `.unescapeHtml(str: string): string`

Unescape potentially harmful characters

- Replace `&#39;` with `'`
- Replace `&#47;` with `\/`
- Replace `&#92;` with `\\`
- Replace `&#96;` with ```
- Replace `&quot;` with `"`
- Replace `&gt;` with `>`
- Replace `&lt;` with `<`
- Replace `&amp;` with `&`

##### `.normalizeEmail(email: string): string | null`

Trim, lowercase and normalize common email docmains (google, icloud, outlook, yahoo, yandex)

### 👍 val

##### `.isHex(str: string): boolean`

Validate whether a string is an Hex value

##### `.isBase32(str: string): boolean`

Validate whether a string is a Base32 value

##### `.isBase64(str: string): boolean`

Validate whether a string is a Base64 value

##### `.isBase64url(str: string): boolean`

Validate whether a string is a Base64url value
