import { BinarySearchTree } from "./binary-search-tree";
import { Traverse } from "./types";

const input = {
  value: 10,
  left: {
    value: 5,
    left: { value: 3 },
    right: { value: 7 },
  },
  right: {
    value: 15,
    right: {
      value: 20,
      left: { value: 17 },
      right: { value: 50 },
    },
  },
};

const tree = new BinarySearchTree(input);

console.log(tree.getColumn(0));
console.log(tree.traverse(Traverse.DFS_INORDER));
console.log(tree.has(20));
