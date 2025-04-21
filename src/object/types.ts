type JSONPrimitive = string | number | boolean | null
type JSONObject = { [key: string]: JSONValue }
type JSONArray = Array<JSONValue>
type JSONValue = JSONPrimitive | JSONObject | JSONArray

export type Node = JSONValue
export type Parent = JSONObject | JSONArray | null
export type Path = Array<string | number>
export type Key = string | number | null
export type Modifier = (context: NodeContext) => JSONValue | undefined | void

export interface NodeContext {
   node: Node
   parent: JSONObject | JSONArray | null
   path: Path
   key: string | number | null
   isRoot: boolean
   isLeaf: boolean
}

export interface TraverseOptions {}

export interface WalkOptions {
   strict?: boolean
}
