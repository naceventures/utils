import { describe, test, expect, vi } from 'vitest'
import { traverse } from './traverse'

describe('traverse', () => {
   test('should handle undefined input', () => {
      // @ts-expect-error undefined node
      const result = traverse(undefined, (ctx) => ctx.node)

      expect(result).toEqual(undefined)
   })

   test('should handle null input', () => {
      const result = traverse(null, (ctx) => ctx.node)

      expect(result).toEqual(null)
   })

   test('should traverse a simple input', () => {
      const result = traverse(
         'hello',
         (ctx) => typeof ctx.node === 'string' && ctx.node.toUpperCase(),
      )

      expect(result).toEqual('HELLO')
   })

   test('should handle number input', () => {
      const result = traverse(42, (ctx) => ctx.node)

      expect(result).toEqual(42)
   })

   test('should handle boolean input', () => {
      const result = traverse(true, (ctx) => ctx.node)

      expect(result).toEqual(true)
   })

   test('should traverse a simple array', () => {
      const arr = [1, 2, 3]

      const result = traverse(arr, (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual([2, 3, 4])
   })

   test('should traverse a simple object', () => {
      const obj = { a: 1, b: 2, c: 3 }

      const result = traverse(obj, (ctx) =>
         typeof ctx.node === 'number' ? ctx.node + 1 : ctx.node,
      )

      expect(result).toEqual({ a: 2, b: 3, c: 4 })
   })

   test('should traverse a nested array', () => {
      const arr = [
         [1, 2],
         [3, 4],
      ]

      const result = traverse(arr, (ctx) => {
         if (ctx.isLeaf && typeof ctx.node === 'number') {
            return ctx.node + 1
         }
         return ctx.node
      })

      expect(result).toEqual([
         [2, 3],
         [4, 5],
      ])
   })

   test('should traverse a nested object', () => {
      const obj = { a: { b: { c: 1 } } }

      const result = traverse(obj, (ctx) => {
         if (ctx.isLeaf && typeof ctx.node === 'number') {
            return ctx.node + 1
         }
         return ctx.node
      })

      expect(result).toEqual({ a: { b: { c: 2 } } })
   })

   test('should traverse a mixed structure', () => {
      const mixed = { a: [1, 2], b: { c: 3 } }

      const result = traverse(mixed, (ctx) => {
         if (ctx.isLeaf && typeof ctx.node === 'number') {
            return ctx.node + 1
         }
         return ctx.node
      })

      expect(result).toEqual({ a: [2, 3], b: { c: 4 } })
   })

   test('should still work when modifier does not return the node', () => {
      const obj = { a: { b: { c: 1 } } }

      const result = traverse(obj, (ctx) => {
         if (ctx.isLeaf && typeof ctx.node === 'number') {
            return ctx.node + 1
         }
      })

      expect(result).toEqual({ a: { b: { c: 2 } } })
   })
})
