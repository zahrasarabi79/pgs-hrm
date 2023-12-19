import { IFlows } from '@/state-management/apis/types';
import React, { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';

export interface FlowsListTableBodyProps {
  item: IFlows;
  index: number;
  page: number;
}

const FlowsListTableBody: FC<FlowsListTableBodyProps> = ({ page, index, item }) => {
  return (
    <TableRow>
      <TableCell>{index + 1 + (page - 1) * 10}</TableCell>
      <TableCell>{new Date(item.createdAt).toLocaleDateString('fa')}</TableCell>
      {/*<TableCell>{item.service.name}</TableCell>*/}
    </TableRow>
  );
};
export default FlowsListTableBody;
