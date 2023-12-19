import React, { FC } from 'react';
import { IconButton, Stack } from '@mui/material';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import { ICardFormPropertiesState } from '@/state-management/slices/cardFormPropertySlice';
import { useAppSelector } from '@/state-management/store/store';

export interface AlignmentIconsProps {
  setAlignment: (alignment: ICardFormPropertiesState['primaryButtonAlignment']) => void;
}

const AlignmentIcons: FC<AlignmentIconsProps> = ({ setAlignment }) => {
  const cardFormProperties = useAppSelector((state) => state?.cardFormProperties);
  return (
    <Stack spacing={2} direction="row" sx={{ width: '100%', justifyContent: 'space-between' }}>
      <IconButton
        sx={{
          bgcolor:
            cardFormProperties?.primaryButtonAlignment === 'left' ? 'warning.main' : 'initial',
        }}
        onClick={() => setAlignment('left')}
      >
        <AlignHorizontalLeftIcon />
      </IconButton>
      <IconButton
        sx={{
          bgcolor:
            cardFormProperties?.primaryButtonAlignment === 'center' ? 'warning.main' : 'initial',
        }}
        onClick={() => setAlignment('center')}
      >
        <AlignHorizontalCenterIcon />
      </IconButton>
      <IconButton
        sx={{
          bgcolor:
            cardFormProperties?.primaryButtonAlignment === 'right' ? 'warning.main' : 'initial',
        }}
        onClick={() => setAlignment('right')}
      >
        <AlignHorizontalRightIcon />
      </IconButton>
    </Stack>
  );
};

export default AlignmentIcons;
