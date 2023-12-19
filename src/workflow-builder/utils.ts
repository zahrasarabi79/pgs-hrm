import { initialNodes } from '@/public/data/initialWorkflowData';
import { AddFlowReq, IFormValues } from '@/types/workflow-builder/formAdaptore';
import dagre from 'dagre';
import { Edge, Node, Position } from 'reactflow';
import { IOnLayout } from '@/types/workflow-builder/autoLayout';

export const submittedData = (data: IFormValues): AddFlowReq => {
  return {
    startStatusId: data.nodes[2].id,
    transitions: data.edges
      .filter((edge) => edge.source !== initialNodes[0].id)
      .map((edge) => ({
        sourceId: edge.source,
        targetId: edge.target,
        label: edge?.data?.label
          ? {
              _: 'StaticText',
              value: edge?.data?.label,
            }
          : undefined,
        trigger: {
          _: edge?.data?.trigger?._,
          roles: edge?.data?.trigger?.roles,
          buttonLabel: edge?.data?.trigger?.buttonLabel,
          formId: edge?.data?.trigger?.form?.formId,
        },
      })),
    statuses: data.nodes
      .filter((_node, index) => index !== 0)
      .map((node) => ({
        _: node.data?._ as string,
        id: node.id,
        position: { x: node.position.x, y: node.position.y },
        size: {
          width: node.width as number,
          height: node.height as number,
        },
        typeId: node.data?.status?.id,
      })),
    name: {
      _: 'StaticText',
      value: data.edges[0].data?.label,
    },
    trigger: { _: 'RolesStartTrigger', roles: data.edges[0]?.data?.trigger?.roles },
  };
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

export const getLayoutElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export const onLayout: IOnLayout = (direction, nodes, edges, setNodes, setEdges) => {
  const { nodes: layoutNodes, edges: layoutEdges } = getLayoutElements(nodes, edges, direction);

  setNodes([...layoutNodes]);
  setEdges([...layoutEdges]);
};
