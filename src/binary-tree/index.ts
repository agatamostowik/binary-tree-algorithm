import {
  Traverse,
  TreeNode,
  TreeNodeWithColumn,
  BinaryTreeType,
} from "../types";

export class BinaryTree<TreeNodeValue>
  implements BinaryTreeType<TreeNodeValue>
{
  tree: TreeNode<TreeNodeValue>;

  constructor(tree: TreeNode<TreeNodeValue>) {
    this.tree = tree;
  }

  traverse(traverseType: Traverse): TreeNodeValue[] {
    switch (traverseType) {
      case Traverse.DFS_INORDER: {
        return this.sortInOrder(this.tree);
      }
      case Traverse.DFS_PREORDER: {
        return this.sortPreOrder(this.tree);
      }
      case Traverse.DFS_POSTORDER: {
        return this.sortPostOrder(this.tree);
      }
      case Traverse.BFS: {
        return this.sortBFS(this.tree);
      }
      default: {
        throw new Error("Unexpected traverse type");
      }
    }
  }

  getColumn(columnOrder: number): TreeNodeValue[] {
    const treeWithColumn = this.createTreeWithColumn(this.tree);

    return this.columnValues(columnOrder, treeWithColumn);
  }

  private columnValues(
    columnOrder: number,
    treeWithColumn: TreeNodeWithColumn<TreeNodeValue>
  ): TreeNodeValue[] {
    const value =
      treeWithColumn.column === columnOrder ? [treeWithColumn.value] : [];
    const left = treeWithColumn.left
      ? this.columnValues(columnOrder, treeWithColumn.left)
      : [];
    const right = treeWithColumn.right
      ? this.columnValues(columnOrder, treeWithColumn.right)
      : [];

    return [...value, ...left, ...right];
  }

  private createTreeWithColumn(
    tree: TreeNodeWithColumn<TreeNodeValue>,
    column: number = 0
  ): TreeNodeWithColumn<TreeNodeValue> {
    const left = tree.left
      ? { left: this.createTreeWithColumn(tree.left, column - 1) }
      : {};
    const right = tree.right
      ? { right: this.createTreeWithColumn(tree.right, column + 1) }
      : {};

    return { ...tree, ...left, ...right, column: column };
  }

  private sortInOrder(input: TreeNode<TreeNodeValue>): TreeNodeValue[] {
    const parent = input.value;
    const left = input.left ? this.sortInOrder(input.left) : [];
    const right = input.right ? this.sortInOrder(input.right) : [];

    return [...left, parent, ...right];
  }

  private sortPreOrder(input: TreeNode<TreeNodeValue>): TreeNodeValue[] {
    const parent = input.value;
    const left = input.left ? this.sortPreOrder(input.left) : [];
    const right = input.right ? this.sortPreOrder(input.right) : [];

    return [parent, ...left, ...right];
  }

  private sortPostOrder(input: TreeNode<TreeNodeValue>): TreeNodeValue[] {
    const parent = input.value;
    const left = input.left ? this.sortPostOrder(input.left) : [];
    const right = input.right ? this.sortPostOrder(input.right) : [];

    return [...left, ...right, parent];
  }

  private sortBFS(input: TreeNode<TreeNodeValue>): TreeNodeValue[] {
    const bfs = (
      queue: TreeNode<TreeNodeValue>[] = [input],
      result: TreeNodeValue[] = []
    ): TreeNodeValue[] => {
      const [node, ...rest] = queue;

      if (!node) {
        return result;
      }

      const left = node.left ? [node.left] : [];
      const right = node.right ? [node.right] : [];

      const nextResult = [...result, node.value];
      const nextQueue = [...rest, ...left, ...right];

      return bfs(nextQueue, nextResult);
    };

    return bfs();
  }
}
