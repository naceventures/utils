import { describe, it, expect } from 'vitest'
import { normalizeEmail } from './normalizeEmail'
import { escapeHtml, unescapeHtml } from './escapeHtml'
// import { toCamelCase, toSnakeCase } from './textCase'

describe('String', () => {
   describe('normalizeEmail', () => {
      it('should normalize a Gmail domain', () => {
         expect(normalizeEmail('some.name@gmail.com')).toBe('somename@gmail.com')
         expect(normalizeEmail('some.name@googleMail.com')).toBe('somename@gmail.com')
         expect(normalizeEmail('some.name+extension@gmail.com')).toBe('somename@gmail.com')
         expect(normalizeEmail('some.Name+extension@GoogleMail.com')).toBe('somename@gmail.com')
         expect(normalizeEmail('some.name.middleName+extension@gmail.com')).toBe(
            'somenamemiddlename@gmail.com',
         )
         expect(normalizeEmail('some.name.middleName+extension@GoogleMail.com')).toBe(
            'somenamemiddlename@gmail.com',
         )
         expect(normalizeEmail('some.name.midd.leNa.me.+extension@gmail.com')).toBe(
            'somenamemiddlename@gmail.com',
         )
         expect(normalizeEmail('some.name.midd.leNa.me.+extension@GoogleMail.com')).toBe(
            'somenamemiddlename@gmail.com',
         )
         expect(normalizeEmail('some.name.midd..leNa...me...+extension@GoogleMail.com')).toBe(
            'somenamemiddlename@gmail.com',
         )
         expect(normalizeEmail('matthew..example@gmail.com')).toBe('matthewexample@gmail.com')
         expect(normalizeEmail('@gmail.com')).toBe(null)
      })

      it('should normalize an iCloud domain', () => {
         expect(normalizeEmail('test@me.com')).toBe('test@me.com')
         expect(normalizeEmail('@icloud.com')).toBe(null)
      })

      it('should normalize an Outlook domain', () => {
         expect(normalizeEmail('@outlook.com')).toBe(null)
      })

      it('should normalize a Yahoo domain', () => {
         expect(normalizeEmail('@yahoo.com')).toBe(null)
      })

      it('should normalize a Yandex domain', () => {
         expect(normalizeEmail('test@ya.ru')).toBe('test@yandex.ru')
         expect(normalizeEmail('test@yandex.kz')).toBe('test@yandex.ru')
         expect(normalizeEmail('test@yandex.ru')).toBe('test@yandex.ru')
         expect(normalizeEmail('test@yandex.ua')).toBe('test@yandex.ru')
         expect(normalizeEmail('test@yandex.com')).toBe('test@yandex.ru')
         expect(normalizeEmail('test@yandex.by')).toBe('test@yandex.ru')
      })

      it('should normalize other domain', () => {
         expect(normalizeEmail('some.name+extension@unknown.com')).toBe(
            'some.name+extension@unknown.com',
         )
         expect(normalizeEmail('hans@m端ller.com')).toBe('hans@m端ller.com')
         expect(normalizeEmail('"foo@bar"@baz.com')).toBe(null)
      })
   })

   describe('escapeHtml', () => {
      it('should trim a string', () => {
         const dirty = '  Hello World  '

         const trimmed = dirty.trim()

         expect(trimmed).toBe('Hello World')
      })

      it('should trim the left side of a string', () => {
         const dirty = '  Hello World  '

         const trimmed = dirty.trimStart()

         expect(trimmed).toBe('Hello World  ')
      })

      it('should trim the right side of a string', () => {
         const dirty = '  Hello World  '

         const trimmed = dirty.trimEnd()

         expect(trimmed).toBe('  Hello World')
      })

      it('should escape harmful characters', () => {
         const dirty = '\'\/\\`"><&'
         const trimmed = escapeHtml(dirty)

         expect(trimmed).toBe('&#39;&#47;&#92;&#96;&quot;&gt;&lt;&amp;')
      })

      it('should unescape harmful characters', () => {
         const dirty = '&#39;&#47;&#92;&#96;&quot;&gt;&lt;&amp;'

         const trimmed = unescapeHtml(dirty)

         expect(trimmed).toBe('\'\/\\`"><&')
      })

      it('should lower case a string', () => {
         const dirty = 'HeLLo WoRlD'

         const trimmed = dirty.toLowerCase()

         expect(trimmed).toBe('hello world')
      })
   })

   // it('should transform a string to snake_case', () => {
   //    expect(toSnakeCase('quick brown fox')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('quick   brown   fox')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('  quick_brown_fox  ')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('quick_brown_fox')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('quick-brown-fox')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('_quick__Br0wn-FOX')).toBe('quick_br0wn_fox')
   //    expect(toSnakeCase('quick--brown--fox')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('quick__brown__fox')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('QUICK_BROWN_FOX')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('QuickBrownFox')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('QuickBrownFOX')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('quickBrownF0X')).toBe('quick_brown_f0x')
   //    expect(toSnakeCase('_quickBrownFox_')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('__quickBrownFox__')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('quickBROWNFox')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('CamelCASERules')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('IndexID')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('CamelCASE')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('aID')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('theIDForUSGovAndDOD')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('TheID_')).toBe('quick_brown_fox')
   //    expect(toSnakeCase('_IDOne')).toBe('quick_brown_fox')
   // })

   // it('should transform a string to camelCase', () => {
   //    expect(toCamelCase('quick brown fox')).toBe('quickBrownFox')
   //    expect(toCamelCase('quick   brown   fox')).toBe('quickBrownFox')
   //    expect(toCamelCase('  quick_brown_fox  ')).toBe('quickBrownFox')
   //    expect(toCamelCase('quick_brown_fox')).toBe('quickBrownFox')
   //    expect(toCamelCase('quick-brown-fox')).toBe('quickBrownFox')
   //    expect(toCamelCase('_quick__Br0wn-FOX')).toBe('quick_br0wn_fox')
   //    expect(toCamelCase('quick--brown--fox')).toBe('quickBrownFox')
   //    expect(toCamelCase('quick__brown__fox')).toBe('quickBrownFox')
   //    expect(toCamelCase('QUICK_BROWN_FOX')).toBe('quickBrownFox')
   //    expect(toCamelCase('QuickBrownFox')).toBe('quickBrownFox')
   //    expect(toCamelCase('QuickBrownFOX')).toBe('quickBrownFox')
   //    expect(toCamelCase('quickBrownF0X')).toBe('quick_brown_f0x')
   //    expect(toCamelCase('_quickBrownFox_')).toBe('quickBrownFox')
   //    expect(toCamelCase('__quickBrownFox__')).toBe('quickBrownFox')
   //    expect(toCamelCase('quickBROWNFox')).toBe('quickBrownFox')
   //    expect(toCamelCase('CamelCASERules')).toBe('quickBrownFox')
   //    expect(toCamelCase('IndexID')).toBe('quickBrownFox')
   //    expect(toCamelCase('CamelCASE')).toBe('quickBrownFox')
   //    expect(toCamelCase('aID')).toBe('quickBrownFox')
   //    expect(toCamelCase('theIDForUSGovAndDOD')).toBe('quickBrownFox')
   //    expect(toCamelCase('TheID_')).toBe('quickBrownFox')
   //    expect(toCamelCase('_IDOne')).toBe('quickBrownFox')
   // })
})
