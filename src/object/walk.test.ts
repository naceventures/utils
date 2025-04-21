import { describe, test, expect, vi } from 'vitest'
import { walk } from './walk'

describe('walk', () => {
   test('should handle undefined input', () => {
      // @ts-expect-error undefined node
      const result = walk(undefined, [], (ctx) => ctx.node)

      expect(result).toEqual(undefined)
   })

   test('should handle null input', () => {
      const result = walk(null, [], (ctx) => ctx.node)

      expect(result).toEqual(null)
   })

   test('should walk a simple input', () => {
      const result = walk(
         'hello',
         [],
         (ctx) => typeof ctx.node === 'string' && ctx.node.toUpperCase(),
      )

      expect(result).toEqual('HELLO')
   })

   test('should handle number input', () => {
      const result = walk(42, [], (ctx) => ctx.node)

      expect(result).toEqual(42)
   })

   test('should handle boolean input', () => {
      const result = walk(true, [], (ctx) => ctx.node)

      expect(result).toEqual(true)
   })

   test('should walk a simple array', () => {
      const arr = [1, 2, 3]

      const result = walk(arr, [2], (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual([1, 2, 4])
   })

   test('should walk a simple object', () => {
      const obj = { a: 1, b: 2, c: 3 }

      const result = walk(obj, ['c'], (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual({ a: 1, b: 2, c: 4 })
   })

   test('should walk a nested array', () => {
      const arr = [
         [1, 2],
         [3, 4],
      ]

      const result = walk(arr, [1, 1], (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual([
         [1, 2],
         [3, 5],
      ])
   })

   test('should walk a nested object', () => {
      const obj = { a: { b: { c: 1, d: 4 } } }

      const result = walk(obj, ['a', 'b', 'c'], (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual({ a: { b: { c: 2, d: 4 } } })
   })

   test('should walk a mixed structure', () => {
      const mixed = { a: [1, 2, { b: 3, c: 4 }], d: { e: 5 } }

      const result = walk(mixed, ['a', 2, 'c'], (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual({ a: [1, 2, { b: 3, c: 5 }], d: { e: 5 } })
   })

   test('should work when the modifier does not return a node', () => {
      const obj = { a: { b: { c: 1, d: 4 } } }

      const result = walk(obj, ['a', 'b', 'c'], (ctx) => {
         if (typeof ctx.node === 'number') {
            return ctx.node + 1
         }
      })

      expect(result).toEqual({ a: { b: { c: 2, d: 4 } } })
   })

   test('should handle missing leaf key in object (soft)', () => {
      const obj = { a: { b: { c: 1, d: 4 } } }

      const result = walk(obj, ['a', 'b', 'e'], (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual({ a: { b: { c: 1, d: 4 } } })
   })

   test('should handle missing leaf key in object (strict)', () => {
      const obj = { a: { b: { c: 1, d: 4 } } }

      expect(() =>
         walk(
            obj,
            ['a', 'b', 'e'],
            (ctx) => (typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node),
            { strict: true },
         ),
      ).toThrow('Invalid object prop "e" at "(root).a.b"')
   })

   test('should handle missing segment key in object (soft)', () => {
      const obj = { a: { b: { c: 1, d: 4 } } }

      const result = walk(obj, ['a', 'x', 'd'], (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual({ a: { b: { c: 1, d: 4 } } })
   })

   test('should handle missing segment key in object (strict)', () => {
      const obj = { a: { b: { c: 1, d: 4 } } }

      expect(() =>
         walk(
            obj,
            ['a', 'x', 'd'],
            (ctx) => (typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node),
            { strict: true },
         ),
      ).toThrowError('Invalid object prop "x" at "(root).a"')
   })

   test('should handle missing leaf index in array (soft)', () => {
      const arr = [
         [1, 2],
         [3, 4],
      ]

      const result = walk(arr, [1, 2], (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual([
         [1, 2],
         [3, 4],
      ])
   })

   test('should handle missing leaf index in array (strict)', () => {
      const arr = [
         [1, 2],
         [3, 4],
      ]

      expect(() =>
         walk(arr, [1, 2], (ctx) => (typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node), {
            strict: true,
         }),
      ).toThrowError('Invalid array index "2" at "(root).1"')
   })

   test('should handle missing segment index in array (soft)', () => {
      const arr = [
         [1, 2],
         [3, 4],
      ]

      const result = walk(arr, [2, 0], (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual([
         [1, 2],
         [3, 4],
      ])
   })

   test('should handle missing segment index in array (strict)', () => {
      const arr = [
         [1, 2],
         [3, 4],
      ]

      expect(() =>
         walk(arr, [2, 0], (ctx) => (typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node), {
            strict: true,
         }),
      ).toThrowError('Invalid array index "2" at "(root)"')
   })

   test('should log each step', () => {
      const obj = { a: { b: { c: 1, d: 4 } } }

      vi.spyOn(console, 'log')

      walk(obj, ['a', 'b', 'c'], (ctx) => {
         console.log(ctx.node)
      })

      expect(console.log).toHaveBeenCalledTimes(4)
      expect(console.log).toHaveBeenCalledWith({ a: { b: { c: 1, d: 4 } } })
      expect(console.log).toHaveBeenCalledWith({ b: { c: 1, d: 4 } })
      expect(console.log).toHaveBeenCalledWith({ c: 1, d: 4 })
      expect(console.log).toHaveBeenCalledWith(1)
   })

   test('should modify a node mid-walk', () => {
      const obj = { a: { b: { c: 1, d: 4 } } }

      const result = walk(obj, ['a', 'b', 'x'], (ctx) => {
         if (ctx.key === 'b') {
            return { x: 10 }
         }
      })

      expect(result).toEqual({ a: { b: { x: 10 } } })
   })
})
