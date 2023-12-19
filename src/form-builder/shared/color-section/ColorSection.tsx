import { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { colors } from '@/public/data/otherData';
import { handleColor } from '@/form-builder/shared/color-section/colorSection';

export interface ColorSectionProps {
  name: string;
}

const ColorSection: FC<ColorSectionProps> = ({ name }) => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state?.properties);
  const elementStyle =
    properties?.elementProperties[properties?.listId][properties?.currentIndex]?.properties;
  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Typography variant="subtitle1">رنگ</Typography>
      <Paper variant="outlined" sx={{ p: 1.5 }}>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          {colors.map((color) => (
            <Paper
              onClick={() => handleColor(dispatch, properties, name, color.themeName)}
              key={color.name}
              sx={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                bgcolor: color.themeName,
                cursor: 'pointer',
                transform: elementStyle?.color === color.themeName ? 'scale(1.1)' : 'scale(1)',
                boxShadow:
                  elementStyle?.color === color.themeName
                    ? '1px 1px 10px 2px rgba(255,255,255,0.3), -1px -1px 10px 2px rgba(255,255,255,0.3)'
                    : 'none',
              }}
            ></Paper>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};
export default ColorSection;
