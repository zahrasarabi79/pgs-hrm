import React, { FC } from 'react';
import { TableRow, TableCell, Tooltip, IconButton } from '@mui/material';
import Icon from '@/components/shared/Icon';

export interface BrandTableBodyProps {
  item: any;
  index: number;
}
const BrandTableBody: FC<BrandTableBodyProps> = ({ item, index }) => {
  return (
    <TableRow key={item.id}>
      <TableCell align={'right'} style={{ width: '10%' }}>
        {index + 1}
      </TableCell>
      <TableCell align={'right'} style={{ width: '80%' }}>
        {item.title}
      </TableCell>
      <TableCell align={'left'} style={{ width: '10%' }}>
        <Tooltip onClick={() => console.log(1)} title="ویرایش برند">
          <IconButton>
            <Icon pathName="linear/edit.svg" color="primary.main" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default BrandTableBody;
