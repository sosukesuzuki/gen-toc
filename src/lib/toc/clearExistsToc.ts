import { Node } from "unist";
import shallowequal from "shallowequal";

export default function clearExistsToc(baseAst: Node, markerNode: Node): Node {
  const children = baseAst.children as Node[];

  let markerNextNodeIndex = -1;
  children.forEach((child, i) => {
    if (shallowequal(child, markerNode)) {
      markerNextNodeIndex = i + 1;
    }
  });

  let newChildren = children;
  const markerNextNode = children[markerNextNodeIndex];
  if (markerNextNode && markerNextNode.type === "list") {
    delete children[markerNextNodeIndex];
  }

  const newAst = {
    ...baseAst,
    children: newChildren.filter(el => el)
  };

  return newAst;
}
