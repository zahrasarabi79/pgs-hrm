import React, { CSSProperties, FC } from 'react';
import { Edge, getConnectedEdges, Handle, HandleProps, useNodeId, useStore } from 'reactflow';

export const selector =
  (nodeId: string, isConnectable = true, maxConnections = Infinity) =>
  (s: {
    nodeInternals: {
      get: (arg0: string) => any;
    };
    edges: Edge[];
  }) => {
    // If the user props say this handle is not connectable, we don't need to
    // bother checking anything else.
    if (!isConnectable) return false;

    const node = s.nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], s.edges);

    return connectedEdges.filter((edge) => edge.target !== node.id)?.length < maxConnections;
  };

const CustomHandle: FC<
  HandleProps & {
    maxConnections: number;
    style: CSSProperties;
  }
> = ({ maxConnections, position, style, ...props }) => {
  const nodeId = useNodeId();

  const isConnectable = useStore(selector(nodeId as string, props.isConnectable, maxConnections));

  // The `isConnectable` prop is a part of React Flow, all we need to do is give
  // it the bool we calculated above and React Flow can handle the logic to disable
  // it for us.
  return (
    <Handle
      {...props}
      type="source"
      position={position}
      isConnectable={isConnectable}
      style={style}
    />
  );
};

export default CustomHandle;
