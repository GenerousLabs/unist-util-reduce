# unist-util-reduce

[![Chat][chat-badge]][chat]

[**unist**][unist] utility to recursively reduce a tree

## Install

[npm][]:

```bash
npm install unist-util-reduce
```

## Usage

```js
const u = require("unist-builder");
const reduce = require("unist-util-reduce");
const assert = require("assert");

const tree = u("tree", [
  u("leaf", "1"),
  u("node", [u("leaf", "2")]),
  u("void"),
  u("leaf", "3")
]);

const newTree = reduce(tree, function(node) {
  if (node.value === "2") {
    const duplicateNode = { ...node, value: "two" };
    return [duplicateNode, node];
  }
  return node;
});

const expected = u("tree", [
  u("leaf", "1"),
  u("node", [u("leaf", "two"), u("leaf", "2")]),
  u("void"),
  u("leaf", "3")
]);

assert.deepEqual(newTree, expected);
```

NOTE: `leaf` with `value` `2` is visited before it's parent `node`. By the
time your `transform` function is invoked, it's `children` will already have
been passed through `transform`.

## API

### `reduce(tree, transform)`

- `tree` - A node of type `Parent`
- `transform` - A function with the signature:
  - `(node: Node, path: number[], root: Paretn) => Node | Node[]`
    - `node` - The `Node` in the tree to be transformed
    - `path` - The path to reach this node in each level of the tree
    - `root` - The `Parent` root node
    - Returns - What you return is passed to `.concat()` on the `children`
      array of the node's parent.

## Related

- [`unist-util-filter`](https://github.com/eush77/unist-util-filter)
  — Create a new tree with all nodes that pass a test
- [`unist-util-map`](https://github.com/syntax-tree/unist-util-map)
  — Create a new tree with all nodes mapped by a given function
- [`unist-util-remove`](https://github.com/eush77/unist-util-remove)
  — Remove nodes from a tree that pass a test
- [`unist-util-select`](https://github.com/eush77/unist-util-select)
  — Select nodes with CSS-like selectors

## License

[MIT][license] © [Callum Macdonald / GeneroUS Labs](https://github.com/GenerousLabs/unist-util-reduce)

<!-- Definition -->

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg
[chat]: https://spectrum.chat/unified/syntax-tree
[npm]: https://docs.npmjs.com/cli/install
[license]: licensea
[unist]: https://github.com/syntax-tree/unist
