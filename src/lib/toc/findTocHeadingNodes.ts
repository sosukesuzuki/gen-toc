import { Node } from "unist";

type Depth = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingNode = {
  value: string;
  depth: Depth;
  line: number;
};

export function findHeadingNodes(children: Node[]): HeadingNode[] {
  const headings = children.filter(child => child.type === "heading");
  const headingNodes = headings.map(heading => {
    const { children, depth, position } = heading;

    if (
      Array.isArray(children) &&
      typeof children[0].value === "string" &&
      typeof depth === "number" &&
      position !== undefined
    ) {
      return {
        value: children[0].value,
        depth,
        line: position.start.line
      };
    }

    return undefined;
  });

  if (headingNodes.includes(undefined)) {
    return headingNodes.filter(el => el !== undefined) as HeadingNode[];
  }

  return headingNodes as HeadingNode[];
}

export function findHeadingNodesUnderMarker(
  headingNodes: HeadingNode[],
  markerNode: Node
) {
  const headingNodesUnderMarkar = headingNodes.filter(headingNode => {
    const markerNodePos = markerNode.position;
    if (markerNodePos === undefined)
      throw new Error("position of marker node must not be undefined");
    return headingNode.line > markerNodePos.start.line;
  });

  return headingNodesUnderMarkar;
}

export default function findTocHeadingNodes(
  ast: Node,
  markerNode: Node
): HeadingNode[] {
  const { children } = ast;

  if (!Array.isArray(children)) return [];

  const headingNodes = findHeadingNodes(children);

  if (markerNode === null) {
    throw new Error("Please write a heading or comment as a marker");
  }

  const headingNodesUnderMarkar = findHeadingNodesUnderMarker(
    headingNodes,
    markerNode
  );

  return headingNodesUnderMarkar;
}
