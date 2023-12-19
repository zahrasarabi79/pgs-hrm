import React, { FC } from 'react';
import { IFlows } from '@/state-management/apis/types';
import { FlowsTableHeadItems } from '@/public/data/tableHeaderData';
import { Table } from '@/components/shared';
import FlowsListTableBody from '@/components/tables/FlowsListTableBody';

const FlowsContent: FC<{ flows: IFlows[] }> = ({ flows }) => {
  return (
    <Table tableHeadItems={FlowsTableHeadItems} total={10}>
      {flows?.map((item: any, index: number) => (
        <FlowsListTableBody key={index} item={item} index={index} page={1} />
      ))}
    </Table>
  );
};
export default FlowsContent;
