import React, { FC, memo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import NodeResizer from '@/components/shared/NodeResizer';
import { INodeSizes } from '@/types/workflow-builder/workflowProvider';
import { useAppContext } from '@/components/context/WorkflowProvider';

const SquareNode: FC<NodeProps<{ value: number }>> = ({ isConnectable, selected, id }) => {
  const [squareSize, setSquareSize] = useState<INodeSizes>({ width: 74, height: 74 });
  const { getNode } = useReactFlow();
  const node = getNode(id);

  const { graphError } = useAppContext();

  return (
    <>
      <NodeResizer setNodeSize={setSquareSize} />
      <Box
        role="square-node-wrapper"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          whiteSpace: 'pre-wrap',
          textAlign: 'start',
          padding: '10px',
          width: squareSize.width,
          height: squareSize.height,
          bgcolor: '#957DAD',
          boxShadow:
            node?.id === graphError.id
              ? '0px 0px 15px 3px rgba(255, 0, 45, 0.85)'
              : node?.id !== graphError.id && selected
                ? '0px 0px 15px 1px rgba(39, 139, 229, 1)'
                : 'none',
        }}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
          }}
          isConnectable={isConnectable}
        />
        <Typography
          variant="subtitle2"
          sx={{ width: '100%', fontSize: '10px', textAlign: 'center' }}
        >
          {node?.data?.status?.label}
        </Typography>
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
          }}
          isConnectable={isConnectable}
        />
      </Box>
    </>
  );
};

export default memo(SquareNode);
