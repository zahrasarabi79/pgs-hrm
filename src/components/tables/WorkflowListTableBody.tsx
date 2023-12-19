import React, { FC } from 'react';
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';
import Icon from '../shared/Icon';
import { WorkflowData } from '@/state-management/apis/types';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setOpenModal } from '@/state-management/slices/modalSlice';
import DeleteModal from '@/components/modals/DeleteModal';
import { useDeleteWorkflowMutation } from '@/state-management/apis/workflowApi';
import { MainCard } from '@/components/shared';
import { useRouter } from 'next/navigation';
import { hasPermission } from '@/public/utility-functions';
import Link from 'next/link';

export interface WorkflowListTableBodyProps {
  index: number;
  item: WorkflowData;
  page: number;
}

const WorkflowListTableBody: FC<WorkflowListTableBodyProps> = ({ page, index, item }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteWorkflow, { isLoading }] = useDeleteWorkflowMutation();

  const { allDataPermissions: permissions } = useAppSelector((state) => state.workflow);

  const handleDeleteWorkflow = (id: string) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard cardStyles={{ px: 2, pb: 2 }} title="آیا از  درخواست حذف خود مطمئن هستید؟">
            <DeleteModal isLoading={isLoading} deleteFunction={() => deleteWorkflow(id).unwrap()} />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  return (
    <TableRow>
      <TableCell>{index + 1 + (page - 1) * 10}</TableCell>
      <TableCell>{item.name.value}</TableCell>
      <TableCell>{item.service.name}</TableCell>
      <TableCell>
        <Stack direction="row" justifyContent="center">
          <Tooltip title="مشاهده " onClick={() => router.push(`workflow-list/${item.id}`)}>
            <IconButton>
              <Icon pathName="linear/eye.svg" color="primary.main" />
            </IconButton>
          </Tooltip>
          {hasPermission(permissions, 'update') && (
            <Link href={`workflow-list/edit/${item.id}`}>
              <Tooltip title="ویرایش ">
                <IconButton>
                  <Icon pathName="linear/edit.svg" color="primary.main" />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {hasPermission(permissions, 'delete') && (
            <Tooltip title=" حذف" onClick={() => handleDeleteWorkflow(item.id)}>
              <IconButton>
                <Icon pathName="linear/trash.svg" color="primary.main" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};
export default WorkflowListTableBody;
