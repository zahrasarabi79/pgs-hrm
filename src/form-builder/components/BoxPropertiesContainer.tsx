import { FC } from 'react';
import { Paper } from '@mui/material';
import { ChildrenProps } from '@/components/shared/ITypes';
import { useAppSelector } from '@/state-management/store/store';

const BoxPropertiesContainer: FC<ChildrenProps> = ({ children }) => {
  const openProperties = useAppSelector((state) => state.properties?.openProperties);

  return (
    <Paper
      sx={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        right: 0,
        width: 'auto',
        maxWidth: '340px',
        height: '100%',
        py: 8,
        borderLeft: '1px solid #fff',
        transform: openProperties ? 'translate(0)' : 'translate(1000px)',
        transition: 'all 0.4s ease',
      }}
    >
      {children}
    </Paper>
  );
};

export default BoxPropertiesContainer;
