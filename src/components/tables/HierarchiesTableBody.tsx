import { FC } from 'react';
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';
import { HierarchiesTableBodyProps } from '@/types/component-types';
import Icon from '@/components/shared/Icon';
import { useDeleteHierarchyMutation } from '@/state-management/apis/hierarchyApi';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setOpenModal } from '@/state-management/slices/modalSlice';
import { MainCard } from '@/components/shared';
import HierarchyItemPreviewModal from '@/components/modals/HierarchiItemPreviewModal';
import { HierarchyData } from '@/state-management/apis/types';
import DeleteModal from '@/components/modals/DeleteModal';
import { hasPermission } from '@/public/utility-functions';
import Link from 'next/link';

const HierarchiesTableBody: FC<HierarchiesTableBodyProps> = ({ item, index, page }) => {
  const dispatch = useAppDispatch();
  const [deleteHierarchy, { isLoading: deleteLoading }] = useDeleteHierarchyMutation();
  const notAbleToDelete = item.organizationalStructuresCount > 0;
  const { allDataPermissions: permissions } = useAppSelector((state) => state.hierarchySlice);
  const handleDeleteHierarchy = async (hierarchyId: string) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard cardStyles={{ px: 2, pb: 2 }} title="آیا از  درخواست حذف خود مطمئن هستید؟">
            <DeleteModal
              isLoading={deleteLoading}
              deleteFunction={() => deleteHierarchy(hierarchyId).unwrap()}
            />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  const handleOpenPreview = (hierarchyItem: HierarchyData) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard closeBtn divider cardStyles={{ px: 2, pb: 2 }} title="مشاهده جزئیات">
            <HierarchyItemPreviewModal hierarchyItem={hierarchyItem} />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  return (
    <TableRow key={item.id}>
      <TableCell align={'left'} style={{ width: '5%' }}>
        {index + 1 + (page - 1) * 10}
      </TableCell>
      <TableCell align={'left'} style={{ width: '5%' }}>
        {item.name.value}
      </TableCell>
      <TableCell align={'left'} style={{ width: '30%' }}>
        {item.rank}
      </TableCell>
      <TableCell align={'center'} style={{ width: '10%' }}>
        <Stack direction={'row'} justifyContent={'center'}>
          <Tooltip onClick={() => handleOpenPreview(item)} title="مشاهده ">
            <IconButton>
              <Icon pathName="linear/eye.svg" color="primary.main" />
            </IconButton>
          </Tooltip>
          {hasPermission(permissions, 'update') && (
            <Link href={`hierarchy-list/edit/${item.id}`}>
              <Tooltip title="ویرایش ">
                <IconButton>
                  <Icon pathName="linear/edit.svg" color="primary.main" />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {hasPermission(permissions, 'delete') && (
            <Tooltip onClick={() => handleDeleteHierarchy(item.id)} title=" حذف">
              <IconButton disabled={notAbleToDelete}>
                <Icon
                  pathName="linear/trash.svg"
                  color={notAbleToDelete ? 'text.secondary' : 'primary.main'}
                />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default HierarchiesTableBody;
