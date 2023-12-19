'use client';
import { DragEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionLineType,
  Controls,
  Edge,
  EdgeMouseHandler,
  MarkerType,
  Node,
  NodeMouseHandler,
  OnConnect,
  OnEdgeUpdateFunc,
  Panel,
  ReactFlowInstance,
  ReactFlowProvider,
  updateEdge,
  useEdgesState,
  useNodesState,
  XYPosition,
} from 'reactflow';
import { Box, Fade } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import 'reactflow/dist/style.css';
import { useAppContext } from '@/components/context/WorkflowProvider';
import { IMenuPopup } from '@/types/workflow-builder/popupMenu';
import { WorkflowToolbar } from '@/workflow-builder/WorkflowToolbar';
import CustomEdge from '@/workflow-builder/customs/CustomEdge';
import { submittedData } from '@/workflow-builder/utils';
import { IFormValues } from '@/types/workflow-builder/formAdaptore';
import RequestMessage from '@/workflow-builder/panels/RequestMessage';
import {
  AutoLayoutPanel,
  DownloadImageButtonPanel,
  ErrorsPanel,
  FormButtonsPanel,
} from '@/workflow-builder/panels';
import NodeContextMenu from '@/workflow-builder/context-menus/NodeContextMenu';
import EdgeContextMenu from '@/workflow-builder/context-menus/EdgeContextMenu';
import { WorkFlowGraph } from '@/workflow-builder/validations/workflowGraph';
import { initialNodes, nodeTypes } from '@/public/data/initialWorkflowData';
import { useAddFlowMutation } from '@/workflow-builder/flowApi';
import { useParams } from 'next/navigation';

const edgeTypes = {
  custom: CustomEdge,
};

const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<any, any>>();
  const [nodeMenu, setNodeMenu] = useState<IMenuPopup | null>(null);
  const [edgeMenu, setEdgeMenu] = useState<IMenuPopup | null>(null);

  const { workflowBuilderId } = useParams();

  const {
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormValues>();

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const edgeUpdateSuccessful = useRef(true);

  const { nodeShape, setGraphError, oneWorkflow, openSnackbar } = useAppContext();

  useEffect(() => {
    if (oneWorkflow) {
      const newNodes: Node[] = oneWorkflow.data.statuses.map((step) => ({
        id: step.id,
        type:
          step._ === 'DiamondStatus'
            ? 'diamondNode'
            : step._ === 'SquareStatus'
              ? 'squareNode'
              : 'closeNode',
        selectable: true,
        position: step.position,
        width: step.size.width,
        height: step.size.height,
        data: {
          typeId: step?.typeId[0],
          _: step._,
          maxConnections: step._ === 'SelectStepDto' ? 10 : 1,
        },
      }));

      // Filter out the node with specific ID and concatenate new nodes
      setNodes((existingNodes) =>
        existingNodes.filter((node) => node.id !== initialNodes[1].id).concat(newNodes),
      );
    }
  }, [oneWorkflow, setNodes]);

  useEffect(() => {
    if (oneWorkflow?.data.transitions && !edges?.length) {
      const newEdge = {
        id: uuidv4(),
        type: 'custom',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15,
          color: '#fff',
        },
        style: {
          strokeWidth: 1,
          stroke: '#fff',
        },
        source: initialNodes[0].id,
        target: oneWorkflow.data.startStatusId,
      };

      setEdges((edges) => [newEdge, ...edges]);

      oneWorkflow?.data.transitions.map((line) => {
        setEdges((edge) =>
          edge.concat([
            {
              id: uuidv4(),
              type: 'custom',
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 15,
                height: 15,
                color: '#fff',
              },
              style: {
                strokeWidth: 1,
                stroke: '#fff',
              },
              source: line.sourceId,
              target: line.targetId,
              label: line.label?.value,
            },
          ]),
        );
      });
    }
  }, [nodes, oneWorkflow, setEdges]);

  const workFlowGraph = new WorkFlowGraph(nodes, edges);
  const errorMessage = workFlowGraph.validate();

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'custom',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 15,
              height: 15,
              color: '#fff',
            },
            style: {
              strokeWidth: 1,
              stroke: '#fff',
            },
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const isValidConnection = (connection: Connection): boolean => {
    return connection.target !== connection.source;
  };

  // @ts-ignore
  const reactFlowBounds: DOMRect = reactFlowWrapper?.current?.getBoundingClientRect();

  const onDrop: DragEventHandler = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer?.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX - reactFlowBounds?.left,
        y: event.clientY - reactFlowBounds?.top,
      }) as XYPosition;

      const newNode: Node = {
        id: uuidv4(),
        type: Object.keys(nodeTypes)
          .filter((type) => type === nodeShape)
          .toString(),
        selectable: true,
        selected: true,
        position,
        data: {
          label: '',
          _:
            nodeShape === 'diamondNode'
              ? 'DiamondStatus'
              : nodeShape === 'squareNode'
                ? 'SquareStatus'
                : 'CloseStatus',
          maxConnections: nodeShape === 'diamondNode' ? 10 : 1,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, reactFlowBounds, nodeShape, setNodes],
  );

  const onDragOver: DragEventHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onEdgeContextMenu: EdgeMouseHandler = useCallback(
    (event, edge) => {
      event.preventDefault();

      setEdgeMenu({
        id: edge.id,
        top: event.clientY < reactFlowBounds.height - 200 && event.clientY,
        left: event.clientX < reactFlowBounds.width - 200 && event.clientX,
        right:
          event.clientX >= reactFlowBounds.width - 200 && reactFlowBounds.width - event.clientX,
        bottom:
          event.clientY >= reactFlowBounds.height - 200 && reactFlowBounds.height - event.clientY,
      });
    },
    [reactFlowBounds],
  );

  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (event, node) => {
      event.preventDefault();
      if (node.data._ !== 'StartStatus' && node.data._ !== 'CloseStatus') {
        setNodeMenu({
          id: node.id,
          top: event.clientY < reactFlowBounds.height - 200 && event.clientY,
          left: event.clientX < reactFlowBounds.width - 200 && event.clientX,
          right:
            event.clientX >= reactFlowBounds.width - 200 && reactFlowBounds.width - event.clientX,
          bottom:
            event.clientY >= reactFlowBounds.height - 200 && reactFlowBounds.height - event.clientY,
        });
      }
    },
    [reactFlowBounds],
  );

  const onEdgeUpdateStart = () => {
    edgeUpdateSuccessful.current = false;
  };

  const onEdgeUpdate: OnEdgeUpdateFunc = useCallback(
    (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [setEdges],
  );

  const onEdgeUpdateEnd = useCallback(
    (_: any, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge?.id));
      }

      edgeUpdateSuccessful.current = true;
    },
    [setEdges],
  );

  useEffect(() => {
    setValue('nodes', nodes);
    setValue('edges', edges);
  }, [edges, nodes, setValue]);

  useEffect(() => {
    if (nodes?.length > 2) {
      clearErrors('nodes');
    }
  }, [clearErrors, nodes]);

  const [addFlow] = useAddFlowMutation();

  const submit = async (formData: IFormValues) => {
    if (nodes?.length < 3) {
      setError('nodes', {
        types: {
          minLength: 'حداقل 1 مرحله الزامی است',
        },
      });
    } else if (errorMessage) {
      setGraphError(
        errorMessage as {
          id: string;
          message: string;
        },
      );
    } else {
      await addFlow({ body: submittedData(formData), id: workflowBuilderId as string });
    }
  };

  return (
    <Fade in>
      <form onSubmit={handleSubmit(submit)} dir={'ltr'}>
        <ReactFlowProvider>
          <Box data-testid="workflow-wrapper" sx={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
              ref={reactFlowWrapper}
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onEdgeContextMenu={onEdgeContextMenu}
              onNodeContextMenu={onNodeContextMenu}
              connectionLineType={ConnectionLineType.SmoothStep}
              connectionLineStyle={{
                strokeWidth: 1,
                stroke: '#fff',
              }}
              isValidConnection={isValidConnection}
              zoomOnDoubleClick
              fitView
              proOptions={{ hideAttribution: true }}
            >
              <Background />
              {nodeMenu && <NodeContextMenu {...nodeMenu} setNodeMenu={setNodeMenu} />}
              {edgeMenu && <EdgeContextMenu {...edgeMenu} setEdgeMenu={setEdgeMenu} />}
              <Panel position="top-left">
                <WorkflowToolbar />
              </Panel>
              <ErrorsPanel errors={errors} errorMessage={errorMessage} />
              <Controls position="top-right" />
              {nodes?.length > 2 && edges?.length > 1 && (
                <>
                  <Panel position="top-right" style={{ marginRight: '12rem' }}>
                    <AutoLayoutPanel nodes={nodes} edges={edges} />
                  </Panel>
                  <DownloadImageButtonPanel />
                </>
              )}
              <FormButtonsPanel />
              {openSnackbar?.open && <RequestMessage />}
            </ReactFlow>
          </Box>
        </ReactFlowProvider>
      </form>
    </Fade>
  );
};

export default WorkflowBuilder;
