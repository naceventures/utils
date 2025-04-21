import is from '@sindresorhus/is'
import type { Node, Path, Modifier, NodeContext, WalkOptions } from './types'

function walkPath(
   node: Node,
   toWalk: Path,
   walked: Path,
   modifier: Modifier,
   options: WalkOptions,
): Node {
   const isRoot = walked.length === 0
   const isLeaf = toWalk.length === 0 || (!is.array(node) && !is.plainObject(node))

   const context: NodeContext = {
      node,
      parent: null,
      path: walked,
      key: walked.length > 0 ? walked[walked.length - 1] : null,
      isRoot,
      isLeaf,
   }

   const transformed = modifier(context)
   // * Cannot use is.undefined() here since it doesn't catch void
   const newNode = typeof transformed === 'undefined' ? node : transformed

   // Stop if it's a leaf or we've completed the path
   if (toWalk.length === 0 || (!is.array(newNode) && !is.plainObject(newNode))) {
      return newNode
   }

   const [key, ...rest] = toWalk

   if (is.array(newNode)) {
      const index = key as number

      const child = newNode[index]
      // Invalid array index
      if (is.nullOrUndefined(child)) {
         if (options.strict) {
            const walkedPath = '(root)'.concat(walked.length > 0 ? '.' : '', walked.join('.'))
            throw `Invalid array index "${index}" at "${walkedPath}"`
         } else {
            return newNode
         }
      }

      const nextWalk = [...walked, index]
      const updated = walkPath(child, rest, nextWalk, modifier, options)
      const result = [...newNode]
      result[index] = updated

      return result
   }

   if (is.plainObject(newNode)) {
      const prop = key as string

      const child = newNode[prop]
      // Invalid object prop
      if (is.nullOrUndefined(child)) {
         if (options.strict) {
            const walkedPath = '(root)'.concat(walked.length > 0 ? '.' : '', walked.join('.'))
            throw `Invalid object prop "${prop}" at "${walkedPath}"`
         } else {
            return newNode
         }
      }

      const nextWalk = [...walked, prop]
      const updated = walkPath(child, rest, nextWalk, modifier, options)

      return { ...newNode, [key]: updated }
   }

   return node
}

export function walk(node: Node, path: Path, modifier: Modifier, options: WalkOptions = {}): Node {
   return walkPath(node, path, [], modifier, options)
}
