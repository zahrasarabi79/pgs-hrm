import { FC } from 'react';
import { Box, Stack } from '@mui/material';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { Edge, Node, useReactFlow } from 'reactflow';
import { useAppContext } from '@/components/context/WorkflowProvider';
import { onLayout } from '@/workflow-builder/utils';

const AutoLayoutPanel: FC<{ nodes: Node[]; edges: Edge[] }> = ({ nodes, edges }) => {
  const { setNodes, setEdges, setCenter } = useReactFlow();
  const { setLayoutDirection } = useAppContext();
  return (
    <Stack
      direction="row"
      sx={{
        borderRadius: '10px 0 0 10px',
        bgcolor: 'background.paper',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
      }}
    >
      <Box
        onClick={() => {
          onLayout('TB', nodes, edges, setNodes, setEdges);
          setLayoutDirection('TB');
          setCenter(50, 150);
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
        }}
      >
        <AlignVerticalTopIcon
          sx={{
            fontSize: '33px',
            p: '0.4rem',
            bgcolor: 'background.default',
            color: '#fff',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        />
      </Box>
      <Box
        onClick={() => {
          onLayout('LR', nodes, edges, setNodes, setEdges);
          setLayoutDirection('LR');
          setCenter(250, 50);
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
        }}
      >
        <AlignHorizontalLeftIcon
          color="info"
          sx={{
            fontSize: '32px',
            p: '0.4rem',
            bgcolor: 'background.default',
            color: '#fff',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        />
      </Box>
    </Stack>
  );
};

export default AutoLayoutPanel;
