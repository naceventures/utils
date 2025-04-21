import is from '@sindresorhus/is'
import type { Node, Parent, Path, Key, Modifier, NodeContext, TraverseOptions } from './types'

function traverseNode(
   node: Node,
   parent: Parent,
   path: Path,
   key: Key,
   modifier: Modifier,
   options: TraverseOptions,
): Node {
   const isRoot = parent === null
   const isLeaf = !is.array(node) && !is.plainObject(node)

   const context: NodeContext = {
      node,
      parent,
      path,
      key,
      isRoot,
      isLeaf,
   }

   const transformed = modifier(context)
   // * Cannot use is.undefined() here since it doesn't catch void
   const newNode = typeof transformed === 'undefined' ? node : transformed

   // If Primitive
   if (!is.array(newNode) && !is.plainObject(newNode)) {
      return newNode
   }

   // If Array
   if (is.array(newNode)) {
      return newNode.map((child, index) => {
         return traverseNode(child, newNode, [...path, index], index, modifier, options)
      })
   }

   // If Object
   const result: Node = {}
   for (const [key, value] of Object.entries(newNode)) {
      result[key] = traverseNode(value, newNode, [...path, key], key, modifier, options)
   }
   return result
}

export function traverse(node: Node, modifier: Modifier, options: TraverseOptions = {}): Node {
   return traverseNode(node, null, [], null, modifier, options)
}
