import React, { FC } from 'react';
import { OrganizationLevelTableBodyProps } from '@/types/component-types';
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';
import Icon from '../shared/Icon';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setOpenModal } from '@/state-management/slices/modalSlice';
import DeleteModal from '@/components/modals/DeleteModal';
import { MainCard } from '@/components/shared';
import { useDeleteOrganizationLevelMutation } from '@/state-management/apis/organizationLevelApi';
import { OrganizationLevelsRes } from '@/state-management/apis/types';
import OrganizationLevelItemPreviewModal from '@/components/modals/OrganizationLevelItemPreviewModal';
import Link from 'next/link';
import { IPermissions, hasPermission } from '@/public/utility-functions';

const OrganizationLevelTableBody: FC<OrganizationLevelTableBodyProps> = ({ items, index }) => {
  const dispatch = useAppDispatch();
  const { allDataPermissions: permissions } = useAppSelector(
    (state) => state.organizationLevelName,
  );
  const [deleteOrganizationLevel, { isLoading }] = useDeleteOrganizationLevelMutation();

  const handleDeleteModal = (id: string) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard cardStyles={{ px: 2, pb: 2 }} title="آیا از  درخواست حذف خود مطمئن هستید؟">
            <DeleteModal
              isLoading={isLoading}
              deleteFunction={() => deleteOrganizationLevel(id).unwrap()}
            />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  const handlePreviewModal = (item: OrganizationLevelsRes['data'][0]) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard closeBtn divider cardStyles={{ px: 2, pb: 2 }} title="مشاهده جزییات">
            <OrganizationLevelItemPreviewModal item={item} />
          </MainCard>
        ),
        maxWidth: 'sm',
      }),
    );
  };
  return (
    <TableRow>
      <TableCell sx={{ width: '10%', minWidth: '60px' }} align="left">
        {index + 1}
      </TableCell>
      <TableCell sx={{ width: '80%', minWidth: '140px' }} align="left">
        <div style={{ width: 'max-content' }}>{items.name.value}</div>
      </TableCell>
      <TableCell sx={{ width: '10%', minWidth: '50px' }} align="center">
        <Stack direction="row" justifyContent="center">
          <Tooltip title="مشاهده " onClick={() => handlePreviewModal(items)}>
            <IconButton>
              <Icon pathName="linear/eye.svg" color="primary.main" />
            </IconButton>
          </Tooltip>
          {hasPermission(permissions as IPermissions, 'update') && (
            <Link href={`organization-level-list/edit/${items.id}`}>
              <Tooltip title="ویرایش ">
                <IconButton>
                  <Icon pathName="linear/edit.svg" color="primary.main" />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {hasPermission(permissions as IPermissions, 'delete') && (
            <Tooltip title=" حذف" onClick={() => handleDeleteModal(items.id)}>
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
export default OrganizationLevelTableBody;
