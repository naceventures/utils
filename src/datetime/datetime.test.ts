import { vi, describe, it, expect, beforeAll, afterAll } from 'vitest'
import { Temporal } from '@js-temporal/polyfill'
import { datetime } from '.'

const TO_STRING: Temporal.InstantToStringOptions = { smallestUnit: 'millisecond' }

const ROUNDING: Temporal.RoundTo<'millisecond'> = {
   smallestUnit: 'millisecond',
   roundingMode: 'trunc',
}

describe('Date', () => {
   beforeAll(() => {
      vi.useFakeTimers()
      vi.setSystemTime('2025-01-29T11:30:25.100Z')
   })

   afterAll(() => {
      vi.useRealTimers()
   })

   it('should format a date to ISO string', () => {
      expect(datetime.toString('2025-01-29T11:30:25.100Z')).toBe('2025-01-29T11:30:25.100Z')
      expect(() => datetime.toString('')).toThrow('date is not valid')

      expect(datetime.toString(Temporal.Now.instant())).toBe('2025-01-29T11:30:25.100Z')
      // @ts-expect-error: wrong Temporal.Instant
      expect(datetime.toString(Temporal.Now.instant(''))).toBe('2025-01-29T11:30:25.100Z')
      // Whatever value passed to instant() is dropped

      expect(datetime.toString(1738150225100)).toBe('2025-01-29T11:30:25.100Z')
      expect(() => datetime.toString(NaN)).toThrow('date is not valid')
   })

   it('should parse an ISO string to a Date', () => {
      expect(
         datetime.toInstant('2025-01-29T11:30:25.100Z').toString({ smallestUnit: 'milliseconds' }),
      ).toStrictEqual(Temporal.Now.instant().toString({ smallestUnit: 'milliseconds' }))
      expect(() => datetime.toInstant('')).toThrow('date is not valid')
   })

   it('should check if a date is in the past', () => {
      expect(datetime.isPast('2024-01-29T11:30:25.100Z')).toBe(true)
      expect(datetime.isPast('2026-01-29T11:30:25.100Z')).toBe(false)

      expect(datetime.isPast(Temporal.Instant.from('2024-01-29T11:30:25.100Z'))).toBe(true)
      expect(datetime.isPast(Temporal.Instant.from('2026-01-29T11:30:25.100Z'))).toBe(false)

      expect(datetime.isPast(173815022599)).toBe(true)
      expect(datetime.isPast(1738150225101)).toBe(false)
   })

   it('should check if a date is in the future', () => {
      expect(datetime.isFuture('2024-01-29T11:30:25.100Z')).toBe(false)
      expect(datetime.isFuture('2026-01-29T11:30:25.100Z')).toBe(true)

      expect(datetime.isFuture(Temporal.Instant.from('2024-01-29T11:30:25.100Z'))).toBe(false)
      expect(datetime.isFuture(Temporal.Instant.from('2026-01-29T11:30:25.100Z'))).toBe(true)

      expect(datetime.isFuture(173815022599)).toBe(false)
      expect(datetime.isFuture(1738150225101)).toBe(true)
   })

   it('should add a duration to a date', () => {
      const now = Temporal.Now.instant().round(ROUNDING)

      // By type
      expect(now.add('PT5H').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T16:30:25.100Z').toString(TO_STRING),
      )
      expect(datetime.add('2025-01-29T11:30:25.100Z', 'PT5H').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T16:30:25.100Z').toString(TO_STRING),
      )
      expect(datetime.add(now, 'PT5H').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T16:30:25.100Z').toString(TO_STRING),
      )
      expect(datetime.add(1738150225100, 'PT5H')).toEqual(
         Temporal.Instant.from('2025-01-29T16:30:25.100Z'),
      )

      // By value
      expect(datetime.add(now, 'PT0.01S').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T11:30:25.110Z').toString(TO_STRING),
      )
      expect(datetime.add(now, 'PT10S').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T11:30:35.100Z').toString(TO_STRING),
      )
      expect(datetime.add(now, 'PT10M').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T11:40:25.100Z').toString(TO_STRING),
      )
      expect(datetime.add(now, 'PT10H').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T21:30:25.100Z').toString(TO_STRING),
      )
      expect(datetime.add(now, 'P10D').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-02-08T11:30:25.100Z').toString(TO_STRING),
      )
      expect(datetime.add(now, 'P10W').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-04-09T11:30:25.100Z').toString(TO_STRING),
      )

      expect(datetime.add(now, '-PT0.01S').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T11:30:25.090Z').toString(TO_STRING),
      )
   })

   it('should substract a duration from a date', () => {
      const now = Temporal.Now.instant().round(ROUNDING)

      // By type
      expect(datetime.sub('2025-01-29T11:30:25.100Z', 'PT5H').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T06:30:25.100Z').toString(TO_STRING),
      )
      expect(datetime.sub(now, 'PT5H')).toEqual(Temporal.Instant.from('2025-01-29T06:30:25.100Z'))
      expect(datetime.sub(1738150225100, 'PT5H').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T06:30:25.100Z').toString(TO_STRING),
      )

      // By value
      expect(datetime.sub(now, 'PT0.01S').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T11:30:25.090Z').toString(TO_STRING),
      )
      expect(datetime.sub(now, 'PT10S').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T11:30:15.100Z').toString(TO_STRING),
      )
      expect(datetime.sub(now, 'PT10M').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T11:20:25.100Z').toString(TO_STRING),
      )
      expect(datetime.sub(now, 'PT10H').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T01:30:25.100Z').toString(TO_STRING),
      )
      expect(datetime.sub(now, 'P10D').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-19T11:30:25.100Z').toString(TO_STRING),
      )
      expect(datetime.sub(now, 'P10W').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2024-11-20T11:30:25.100Z').toString(TO_STRING),
      )

      expect(datetime.sub(now, '-PT0.01S').toString(TO_STRING)).toEqual(
         Temporal.Instant.from('2025-01-29T11:30:25.110Z').toString(TO_STRING),
      )
   })
})
