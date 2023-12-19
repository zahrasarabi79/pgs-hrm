import React, { FC, memo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { NodeResizer } from '@/components/shared';
import { INodeSizes } from '@/types/workflow-builder/workflowProvider';
import { useAppContext } from '@/components/context/WorkflowProvider';

const CircleNode: FC<NodeProps<{ value: number }>> = ({ isConnectable, id, selected }) => {
  const [endSize, setEndSize] = useState<INodeSizes>({ width: 74, height: 74 });
  const { getNode } = useReactFlow();
  const node = getNode(id);

  const { graphError } = useAppContext();

  return (
    <>
      <NodeResizer setNodeSize={setEndSize} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: endSize.width,
          height: endSize.height,
          padding: '10px',
          color: '#fff',
          borderRadius: '50%',
          bgcolor: '#619196',
          boxShadow:
            node?.id === graphError.id
              ? '0px 0px 15px 3px rgba(255, 0, 45, 0.85)'
              : node?.id !== graphError.id && selected
                ? '0px 0px 15px 1px rgba(39, 139, 229, 1)'
                : 'none',
        }}
      >
        <Handle
          position={Position.Left}
          isConnectable={isConnectable}
          type="target"
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
          }}
        />
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ textAlign: 'center', width: '100%', fontSize: '10px' }}
        >
          {node?.data.label}
        </Typography>
      </Box>
    </>
  );
};

export default memo(CircleNode);
