import * as u from "unist-builder";

import { recursiveReduce } from "../index";

describe("unist-util-reduce", () => {
  describe("recursiveReduce()", () => {
    it("Invokes transform for every root node #k8mUoB", () => {
      const tree = u("root", [
        u("leaf", { id: "#rJLkIg" }),
        u("leaf", { id: "#YYAItG" }),
        u("leaf", { id: "#aoyKWB" }),
        u("leaf", { id: "#GBGJS1" })
      ]);
      const transform = jest.fn((root, path, node) => {
        return node;
      });

      expect(recursiveReduce(tree, transform)).toEqual(tree);
      expect(transform).toHaveBeenCalledWith(
        {
          children: [
            { id: "#rJLkIg", type: "leaf" },
            { id: "#YYAItG", type: "leaf" },
            { id: "#aoyKWB", type: "leaf" },
            { id: "#GBGJS1", type: "leaf" }
          ],
          type: "root"
        },
        [],
        { id: "#rJLkIg", type: "leaf" }
      );
      expect(transform).toHaveBeenCalledWith(
        {
          children: [
            { id: "#rJLkIg", type: "leaf" },
            { id: "#YYAItG", type: "leaf" },
            { id: "#aoyKWB", type: "leaf" },
            { id: "#GBGJS1", type: "leaf" }
          ],
          type: "root"
        },
        [],
        { id: "#rJLkIg", type: "leaf" }
      );
      expect(transform).toHaveBeenCalledWith(
        {
          children: [
            { id: "#rJLkIg", type: "leaf" },
            { id: "#YYAItG", type: "leaf" },
            { id: "#aoyKWB", type: "leaf" },
            { id: "#GBGJS1", type: "leaf" }
          ],
          type: "root"
        },
        [],
        { id: "#YYAItG", type: "leaf" }
      );
      expect(transform).toHaveBeenCalledWith(
        {
          children: [
            { id: "#rJLkIg", type: "leaf" },
            { id: "#YYAItG", type: "leaf" },
            { id: "#aoyKWB", type: "leaf" },
            { id: "#GBGJS1", type: "leaf" }
          ],
          type: "root"
        },
        [],
        { id: "#aoyKWB", type: "leaf" }
      );
    });

    it("Does not return children which are skipped #fynx90", () => {
      const root = u("root", [u("leaf"), u("leaf"), u("leaf"), u("leaf")]);
      const output = u("root", []);

      expect(recursiveReduce(root, () => [])).toEqual(output);
    });
  });
});
