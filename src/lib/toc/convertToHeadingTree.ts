import { HeadingNode } from "./findTocHeadingNodes";

type HeadingTree = HeadingNode & {
  children: HeadingNode[];
};

export default function convertToHeadingTree(
  headingNodes: HeadingNode[]
): HeadingTree[] {
  const depth2HeadingNodes = headingNodes.filter(node => node.depth === 2);
  const depth3HeadingNodes = headingNodes.filter(node => node.depth === 3);

  const headingTree: HeadingTree[] = depth2HeadingNodes.map(
    (dep2node, i, nodes) => {
      const children = depth3HeadingNodes.filter(dep3node => {
        if (nodes[i + 1]) {
          return (
            dep3node.line > dep2node.line && dep3node.line < nodes[i + 1].line
          );
        }
        return dep3node.line > dep2node.line;
      });

      return {
        ...dep2node,
        children
      };
    }
  );

  return headingTree;
}
