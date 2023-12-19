import React, { FC, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { NodeProps, Position, useReactFlow } from 'reactflow';
import CustomHandle from './CustomHandle';
import { useAppContext } from '@/components/context/WorkflowProvider';

const StartNode: FC<NodeProps<{ value: number }>> = ({ isConnectable, id }) => {
  const { getNode } = useReactFlow();
  const node = getNode(id);
  const { layoutDirection, graphError } = useAppContext();

  return (
    <Box
      sx={{
        width: '50px',
        height: '50px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        boxShadow: node?.id === graphError.id ? '0px 0px 15px 3px rgba(255, 0, 45, 0.85)' : 'none',
      }}
    >
      <Typography
        variant="subtitle2"
        component="p"
        sx={{ textAlign: 'center', width: '100%', fontSize: '10px' }}
      >
        {node?.data.label}
      </Typography>
      <CustomHandle
        id="start"
        position={layoutDirection === 'TB' ? Position.Bottom : Position.Right}
        isConnectable={isConnectable}
        maxConnections={node?.data.maxConnections}
        type="source"
        style={{
          width: '8px',
          height: '8px',
          background: '#fff',
          borderRadius: '50%',
        }}
      />
    </Box>
  );
};

export default memo(StartNode);
