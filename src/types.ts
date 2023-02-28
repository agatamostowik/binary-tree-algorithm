export type TreeNode<TreeNodeValue> = {
  value: TreeNodeValue;
  left?: TreeNode<TreeNodeValue>;
  right?: TreeNode<TreeNodeValue>;
};

export type TreeNodeWithColumn<TreeNodeValue> = {
  value: TreeNodeValue;
  left?: TreeNode<TreeNodeValue>;
  right?: TreeNode<TreeNodeValue>;
  column?: number;
};

export enum Traverse {
  DFS_INORDER = "DFS_INORDER",
  DFS_PREORDER = "DFS_PREORDER",
  DFS_POSTORDER = "DFS_POSTORDER",
  BFS = "BFS",
}

export interface BinaryTreeType<TreeNodeValue> {
  tree: TreeNode<TreeNodeValue>;
  traverse(traverseType: Traverse): TreeNodeValue[];
  getColumn(columnOrder: number): TreeNodeValue[];
}

export interface BinarySearchTreeType extends BinaryTreeType<number> {
  tree: TreeNode<number>;
  has(value: number): boolean;
}
