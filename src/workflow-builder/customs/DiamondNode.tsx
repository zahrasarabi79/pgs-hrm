import React, { FC, memo, useState } from 'react';
import { Typography } from '@mui/material';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import NodeResizer from '@/components/shared/NodeResizer';
import { useAppContext } from '@/components/context/WorkflowProvider';

const DiamondNode: FC<NodeProps<{ value: number }>> = ({ isConnectable, selected, id }) => {
  const [diamondSize, setDiamondSize] = useState<{ width: number; height: number }>({
    width: 74,
    height: 74,
  });
  const { getNode } = useReactFlow();

  const node = getNode(id);
  const { graphError } = useAppContext();

  return (
    <>
      <NodeResizer setNodeSize={setDiamondSize} />
      <div
        style={{
          position: 'relative',
        }}
      >
        <svg
          className={
            graphError.id === node?.id
              ? 'error'
              : node?.id !== graphError.id && selected
                ? 'selected'
                : ''
          }
          width={diamondSize.width}
          height={diamondSize.height}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points={`${diamondSize.width / 2},0 ${diamondSize.width},${diamondSize.height / 2} ${
              diamondSize.width / 2
            },${diamondSize.height} 0,${diamondSize.height / 2}`}
            fill="#FC999C"
            stroke="none"
            strokeWidth={selected ? '3' : '2'}
          />
        </svg>
        <Handle
          type="target"
          position={Position.Left}
          style={{
            top: '45%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
          }}
          isConnectable={isConnectable}
        />
        <Typography
          variant="subtitle2"
          sx={{
            position: 'absolute',
            top: '30%',
            left: '20%',
            width: '65%',
            fontSize: '10px',
            textAlign: 'center',
          }}
        >
          {node?.data?.status?.label}
        </Typography>
        <Handle
          type="source"
          position={Position.Right}
          id="a"
          style={{
            top: '45%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
          }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
};

export default memo(DiamondNode);
