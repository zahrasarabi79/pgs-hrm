import { Node } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import DiamondNode from '@/workflow-builder/customs/DiamondNode';
import StartNode from '@/workflow-builder/customs/StartNode';
import SquareNode from '@/workflow-builder/customs/SquareNode';
import CircleNode from '@/workflow-builder/customs/CircleNode';

export const nodeTypes = {
  startNode: StartNode,
  circleNode: CircleNode,
  squareNode: SquareNode,
  diamondNode: DiamondNode,
};
export const initialNodes: Node[] = [
  {
    id: uuidv4(),
    type: 'startNode',
    data: { label: 'start', _: 'StartStatus', maxConnections: 1 },
    position: { x: -50, y: 200 },
    deletable: false,
    draggable: false,
  },
  {
    id: uuidv4(),
    type: 'circleNode',
    data: { label: 'close', _: 'CloseStatus' },
    position: { x: 500, y: 200 },
    deletable: false,
  },
];
