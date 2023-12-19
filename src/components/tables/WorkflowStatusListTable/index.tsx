import { FC } from 'react';
import { WorkflowTableBodyProps } from '@/types/component-types';
import { TableRow, TableCell, Tooltip, IconButton, Stack } from '@mui/material';
import { setOpenModal } from '@/state-management/slices/modalSlice';
import DeleteModal from '@/components/modals/DeleteModal';
import { useAppDispatch } from '@/state-management/store/store';
import { useDeleteWorkflowStatusMutation } from '@/state-management/apis/workflowApi';
import { workflowStatusData } from '@/state-management/apis/types';
import WorkflowStatusPreviewModal from '@/components/modals/WorkflowStatusPreviewModal';
import { convertStatusToPersian } from '@/components/tables/WorkflowStatusListTable/utils';
import { Icon, MainCard } from '@/components/shared';
import Link from 'next/link';

const Index: FC<WorkflowTableBodyProps> = ({ index, item, page }) => {
  const dispatch = useAppDispatch();
  const [deleteWorkflowStatus, { isLoading: deleteLoading }] = useDeleteWorkflowStatusMutation();
  const handleDelete = async (id: string) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard cardStyles={{ px: 2, pb: 2 }} title="آیا از  درخواست حذف خود مطمئن هستید؟">
            <DeleteModal
              isLoading={deleteLoading}
              deleteFunction={() => deleteWorkflowStatus(id).unwrap()}
            />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  const handleOpenPreview = (item: workflowStatusData) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard closeBtn divider cardStyles={{ px: 2, pb: 2 }} title="مشاهده جزئیات">
            <WorkflowStatusPreviewModal item={item} />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };
  return (
    <>
      <TableRow key={item.id}>
        <TableCell align={'left'} style={{ width: '5%' }}>
          {index + 1 + (page - 1) * 10}
        </TableCell>
        <TableCell align={'left'} style={{ width: '5%' }}>
          <div style={{ width: 'max-content' }}>{item.name.value}</div>
        </TableCell>
        <TableCell align={'left'} style={{ width: '5%' }}>
          <div style={{ width: 'max-content' }}>{convertStatusToPersian(item.type)}</div>
        </TableCell>
        <TableCell align={'center'} style={{ width: '10%' }}>
          <Stack direction={'row'} justifyContent={'center'}>
            <Tooltip onClick={() => handleOpenPreview(item)} title="مشاهده ">
              <IconButton>
                <Icon pathName="linear/eye.svg" color="primary.main" />
              </IconButton>
            </Tooltip>
            <Link href={`workflow-status-list/edit/${item.id}`}>
              <Tooltip title=" ویرایش وضعیت جریان کار">
                <IconButton>
                  <Icon pathName="linear/edit.svg" color="primary.main" />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip onClick={() => handleDelete(item.id)} title=" حذف">
              <IconButton>
                <Icon pathName="linear/trash.svg" color={'primary.main'} />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Index;
