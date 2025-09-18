# @naceventures/utils

## 1.3.0

### Minor Changes

-  - Add `.generateRandomOTP(length: number)` function under the `rand` namespace

## 1.2.0

### Minor Changes

- Add `.sleep(ms: number)` function under the `async` namespace to pause code execution
- Add `.traverse(node: Node, modifier: Modifier, options: TraverseOptions = {}): Node` under the `obj` namespace to traverse an object and apply a modifier function to each node
- Add `.walk(node: Node, path: Path, modifier: Modifier, options: WalkOptions = {}): Node` under the `obj` namespace to visit the object at a given path and apply a modifier to each segment of the path

### Patch Changes

- Updated the README.md

## 1.1.0

### Minor Changes

- Add `generateRandomHex` function under `rand` namespace

### Patch Changes

- Fix `generateRandomBase64` that was previously using Base64url encoding under the hood

## 1.0.4

### Patch Changes

- Clean README

## 1.0.3

### Patch Changes

- Bump version

## 1.0.2

### Patch Changes

- Fix GitHub Action permissions

## 1.0.1

### Patch Changes

- Added Github Action
