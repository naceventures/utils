import { Temporal } from '@js-temporal/polyfill'

// ! All Instants are rounded to the milliseconds

// ========== Options ==========

const ROUNDING: Temporal.RoundTo<'millisecond'> = {
   smallestUnit: 'millisecond',
   roundingMode: 'trunc',
}

const TO_STRING: Temporal.InstantToStringOptions = {
   smallestUnit: 'millisecond',
}

// ========== Helpers ==========

function parseDate(date: string | number | Temporal.Instant): Temporal.Instant {
   try {
      if (typeof date === 'string') {
         return Temporal.Instant.from(date).round(ROUNDING)
      }

      if (typeof date === 'number') {
         return Temporal.Instant.fromEpochMilliseconds(date).round(ROUNDING)
      }

      if (date instanceof Temporal.Instant) {
         return date.round(ROUNDING)
      }

      throw new TypeError('date is not valid')
   } catch (e) {
      throw new Error('date is not valid', { cause: e })
   }
}

function parsePeriod(duration: string): Temporal.Duration {
   try {
      return Temporal.Duration.from(duration)
   } catch (e) {
      throw new Error('duration is not valid', { cause: e })
   }
}

// ========== Methods ==========

function now(): Temporal.Instant {
   return Temporal.Now.instant().round(ROUNDING)
}

function toString(date: string | number | Temporal.Instant): string {
   const instant = parseDate(date)

   return instant.toString(TO_STRING)
}

function toInstant(date: string | number | Temporal.Instant): Temporal.Instant {
   const instant = parseDate(date)

   return instant
}

function isPast(date: string | number | Temporal.Instant): boolean {
   const now = Temporal.Now.instant().round(ROUNDING)
   const instant = parseDate(date)

   return Temporal.Instant.compare(instant, now) < 0 ? true : false
}

function isFuture(date: string | number | Temporal.Instant): boolean {
   const now = Temporal.Now.instant().round(ROUNDING)
   const instant = parseDate(date)

   return Temporal.Instant.compare(instant, now) > 0 ? true : false
}

function add(date: string | number | Temporal.Instant, period: string): Temporal.Instant {
   const instant = parseDate(date)
   let duration = parsePeriod(period)

   return instant.toZonedDateTimeISO('UTC').add(duration).toInstant()
}

function sub(date: string | number | Temporal.Instant, period: string): Temporal.Instant {
   const instant = parseDate(date)
   let duration = parsePeriod(period)

   return instant.toZonedDateTimeISO('UTC').subtract(duration).toInstant()
}

// ========== Namespace ==========

export const datetime = {
   toString,
   toInstant,
   isPast,
   isFuture,
   add,
   sub,
}
