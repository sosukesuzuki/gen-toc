import { HeadingNode } from "./findTocHeadingNodes";

export type HeadingTree = HeadingNode & {
  children?: HeadingTree[];
};

// TODO: support over depth 4
export default function convertToHeadingTree(
  headingNodes: HeadingNode[]
): HeadingTree[] {
  const depth2HeadingNodes = headingNodes.filter(node => node.depth === 2);
  const depth3HeadingNodes = headingNodes.filter(node => node.depth === 3);

  const headingTree: HeadingTree[] = depth2HeadingNodes.map(
    (dep2HeadingNode, i, nodes) => {
      const children = depth3HeadingNodes.filter(dep3HeadingNode => {
        const isUnderOfCurrentNode =
          dep3HeadingNode.line > dep2HeadingNode.line;
        if (nodes[i + 1]) {
          const isAboveOfNextNode = dep3HeadingNode.line < nodes[i + 1].line;
          return isUnderOfCurrentNode && isAboveOfNextNode;
        }
        return isUnderOfCurrentNode;
      });

      return {
        ...dep2HeadingNode,
        children
      };
    }
  );

  return headingTree;
}
