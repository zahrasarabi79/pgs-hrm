import { FC } from 'react';
import { Typography } from '@mui/material';
import { useAppSelector } from '@/state-management/store/store';
import { DefaultElementProps } from '@/types/form-builder/root';

const HeadTitle: FC<DefaultElementProps> = ({ index }) => {
  const properties = useAppSelector((state) => state?.properties);
  const elementStyle = properties?.elementProperties[properties?.listId][index]?.properties;
  return (
    <Typography
      variant={elementStyle?.textVariant || 'h3'}
      sx={{ transition: `all 0.4s ease`, color: elementStyle?.color }}
    >
      {elementStyle?.content
        ? elementStyle.content
        : `این یک نمونه ${elementStyle?.textVariant || 'h3'} است`}
    </Typography>
  );
};

export default HeadTitle;
