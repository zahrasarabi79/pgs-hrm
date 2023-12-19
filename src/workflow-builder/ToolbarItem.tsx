import React, { DragEvent, FC } from 'react';
import { Box, Divider, ListItem, ListItemButton, Paper } from '@mui/material';
import { nodeShapes } from '@/public/data/workflowToolbarData';
import { useAppContext } from '@/components/context/WorkflowProvider';

const ToolbarItem: FC<{ node: any; index: number }> = ({ node, index }) => {
  const { setNodeStyle, setNodeShape } = useAppContext();
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer?.setData('application/reactflow', nodeType);
    event.dataTransfer?.effectAllowed && (event.dataTransfer.effectAllowed = 'move');
    setNodeStyle(node.style);
    setNodeShape(node.shape);
  };

  return (
    <>
      <ListItem disablePadding data-testid="toolbar-item">
        <ListItemButton
          disableRipple
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '&:hover': { bgcolor: 'initial', cursor: 'default' },
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 1,
              width: '55px',
              height: '55px',
              display: 'flex',
              bgcolor: 'background.default',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              border: 'none',
            }}
          >
            {node.shape === 'diamondNode' && (
              <Box
                data-testid="drag-role"
                sx={node.style}
                onDragStart={(event) => {
                  onDragStart(event, node.type as string);
                }}
                draggable
              >
                <svg width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="18,0 36,18 18,36 0,18" fill="none" stroke="#fff" />
                </svg>
              </Box>
            )}
            <Box
              data-testid="drag-role"
              style={node.style}
              onDragStart={(event) => {
                onDragStart(event, node.type as string);
              }}
              draggable
            />
          </Paper>
        </ListItemButton>
      </ListItem>
      {index !== nodeShapes.length - 1 && <Divider sx={{ mx: 1.25 }} />}
    </>
  );
};

export default ToolbarItem;
