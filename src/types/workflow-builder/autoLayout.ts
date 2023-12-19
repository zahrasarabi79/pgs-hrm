import { Edge, Instance, Node } from 'reactflow';

export type IOnLayout = (
  direction: 'TB' | 'LR',
  nodes: Node[],
  edges: Edge[],
  setNodes: Instance.SetNodes<any>,
  setEdges: Instance.SetEdges<any>,
) => void;
