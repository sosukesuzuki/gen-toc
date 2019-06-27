import { Node } from "unist";

type Depth = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingNode = {
  value: string;
  depth: Depth;
  line: number;
};

function findHeadingNodes(children: Node[]): HeadingNode[] {
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

export default function findTocHeadingNodes(ast: Node): HeadingNode[] {
  const { children } = ast;

  if (!Array.isArray(children)) return [];

  const headingNodes = findHeadingNodes(children);

  return headingNodes;
}
