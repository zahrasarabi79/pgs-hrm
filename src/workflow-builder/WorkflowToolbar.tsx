import { List, Paper } from '@mui/material';
import { nodeShapes } from '@/public/data/workflowToolbarData';
import ToolbarItem from '@/workflow-builder/ToolbarItem';

export const WorkflowToolbar = () => {
  return (
    <Paper
      sx={{
        borderRadius: '12px',
        width: '70px',
      }}
    >
      <List disablePadding>
        {nodeShapes.map((node, index: number) => (
          <ToolbarItem key={node.shape} node={node} index={index} />
        ))}
      </List>
    </Paper>
  );
};
