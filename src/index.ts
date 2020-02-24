import { Node, Parent } from "unist";

export type Transform = (
  node: Node,
  path: number[],
  root: Parent
) => Node | Node[];

const isParent = (node: Node): node is Parent => {
  return typeof node.children !== "undefined" && Array.isArray(node.children);
};

export const recursiveReduce = (root: Parent, transform: Transform): Parent => {
  const { children, ...rest } = root;

  const iteratee = (path: number[]) => (
    accumulator: Node[],
    node: Node,
    index: number
  ): Node[] => {
    if (isParent(node)) {
      const { children, ...rest } = node;

      const reduced = {
        ...rest,
        children: children.reduce(iteratee(path.concat(index)), [])
      };

      return accumulator.concat(transform(reduced, path, root));
    }

    return accumulator.concat(transform(node, path, root));
  };

  return {
    ...rest,
    children: children.reduce(iteratee([]), [])
  };
};

export default recursiveReduce;
