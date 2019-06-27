import { Node } from "unist";
import shallowequal from "shallowequal";

export default function insertTocAstToBaseAst(baseAst: Node, tocAst: Node, markerAst: Node): Node {
  const children = baseAst.children;

  if (!Array.isArray(children)) throw new Error("children must be array")

  let markerNodeIndex: number = -1;
  (children as Node[]).forEach((child, i) => {
    if (shallowequal(child, markerAst)) markerNodeIndex = i;
  });

  if (markerNodeIndex === -1) throw new Error("marker not found");

  children.splice(markerNodeIndex + 1, 0, tocAst);

  return {
    ...baseAst,
    children
  }
}
