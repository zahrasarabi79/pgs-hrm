import React, { Dispatch, FC, SetStateAction } from 'react';
import { NodeResizeControl } from 'reactflow';
import { ResizeIcon } from '@/components/shared';

const NodeResizer: FC<{
  setNodeSize: Dispatch<SetStateAction<{ width: number; height: number }>>;
}> = ({ setNodeSize }) => {
  return (
    <NodeResizeControl
      style={{ background: 'transparent', border: 'none' }}
      minWidth={74}
      minHeight={74}
      keepAspectRatio
      onResize={(_event, params) => {
        setNodeSize({ width: params.width, height: params.height });
      }}
    >
      <ResizeIcon data-testid="node-resizer" />
    </NodeResizeControl>
  );
};

export default NodeResizer;
