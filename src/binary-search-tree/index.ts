import { BinaryTree } from "../binary-tree";
import { TreeNode, BinarySearchTreeType } from "../types";

export class BinarySearchTree
  extends BinaryTree<number>
  implements BinarySearchTreeType
{
  tree: TreeNode<number>;

  constructor(tree: TreeNode<number>) {
    super(tree);
    this.tree = tree;
  }

  has(value: number): boolean {
    const nodeValues = this.getNodeValues(this.tree);
    return nodeValues.includes(value);
  }

  private getNodeValues(input: TreeNode<number>): number[] {
    const parent = input.value;
    const left = input.left ? this.getNodeValues(input.left) : [];
    const right = input.right ? this.getNodeValues(input.right) : [];

    return [...left, parent, ...right];
  }
}
