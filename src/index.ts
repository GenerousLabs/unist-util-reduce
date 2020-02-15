import { Node, Parent } from "unist";

export type Transform = (
  root: Parent,
  path: number[],
  node: Node
) => Node | Node[];

const isParent = (node: Node): node is Parent => {
  return typeof node.children !== "undefined" && Array.isArray(node.children);
};

export const recursiveReduce = (root: Parent, transform: Transform) => {
  const { children, ...rest } = root;

  const iteratee = (path: number[]) => (
    accumulator: Node[],
    node: Node,
    index: number,
    children: Node[]
  ): Node[] => {
    if (isParent(node)) {
      const { children, ...rest } = node;

      const reduced = {
        ...rest,
        children: children.reduce(iteratee(path.concat(index)), [])
      };

      return accumulator.concat(transform(root, path, reduced));
    }

    return accumulator.concat(transform(root, path, node));
  };

  return {
    ...rest,
    children: children.reduce(iteratee([]), [])
  };
};
