import { Node, Parent } from "unist";
import { set } from "remeda";

export type Transform = <T extends Parent>(
  node: Node,
  path: number[],
  root: T
) => Node | Node[];

const isParent = (node: Node): node is Parent => {
  return typeof node.children !== "undefined" && Array.isArray(node.children);
};

export const recursiveReduce = <T extends Parent>(
  root: T,
  transform: Transform
): T => {
  const { children } = root;

  const iteratee = (path: number[]) => (
    accumulator: Node[],
    node: Node,
    index: number
  ): Node[] => {
    if (isParent(node)) {
      const { children } = node;

      const reduced = set(
        node,
        "children",
        children.reduce(iteratee(path.concat(index)), [])
      );

      return accumulator.concat(transform(reduced, path, root));
    }

    return accumulator.concat(transform(node, path, root));
  };

  return set(root, "children", children.reduce(iteratee([]), []));

  // Typescript complains about this, couldn't figure out why, so switched to
  // set() instead
  // const { children, ...rest } = root;
  // return {
  //   ...rest,
  //   children: children.reduce(iteratee([]), [])
  // };
};

export default recursiveReduce;
