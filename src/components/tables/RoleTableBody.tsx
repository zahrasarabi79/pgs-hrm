import { FC } from 'react';
import { RoleTableBodyProps } from '@/types/component-types';
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';
import { RoleRes } from '@/state-management/apis/types';
import Icon from '../shared/Icon';
import { setOpenModal } from '@/state-management/slices/modalSlice';
import { MainCard } from '@/components/shared';
import DeleteModal from '@/components/modals/DeleteModal';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { useDeleteRoleMutation } from '@/state-management/apis/roleApi';
import RoleItemPreviewModal from '@/components/modals/RoleItemPreviewModal';
import { renderOrganizationalPath } from '@/components/pages/role/utils';
import { hasPermission } from '@/public/utility-functions';
import Link from 'next/link';

const RoleTableBody: FC<RoleTableBodyProps> = ({ index, item }) => {
  const dispatch = useAppDispatch();
  const [deleteRole, { isLoading }] = useDeleteRoleMutation();
  const { allDataPermissions: permissions } = useAppSelector((state) => state.roleSlice);
  const handleDeleteModal = (id: string) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard cardStyles={{ px: 2, pb: 2 }} title="آیا از درخواست حذف خود مطمئن هستید؟">
            <DeleteModal isLoading={isLoading} deleteFunction={() => deleteRole(id).unwrap()} />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  const handlePreviewModal = (item: RoleRes['data'][0]) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard closeBtn divider cardStyles={{ px: 2, pb: 2 }} title="مشاهده جزئیات">
            <RoleItemPreviewModal item={item} />
          </MainCard>
        ),
        maxWidth: 'md',
      }),
    );
  };

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <div style={{ width: 'max-content' }}>{item.positionName?.value}</div>
      </TableCell>
      <TableCell>
        <div style={{ width: 'max-content' }}>{renderOrganizationalPath(item)}</div>
      </TableCell>
      <TableCell>{item.rank}</TableCell>
      <TableCell>{item.requiredEmployeesCount}</TableCell>
      <TableCell>
        <Stack direction="row" justifyContent="center">
          <Tooltip title="مشاهده " onClick={() => handlePreviewModal(item)}>
            <IconButton>
              <Icon pathName="linear/eye.svg" color="primary.main" />
            </IconButton>
          </Tooltip>
          {hasPermission(permissions, 'update') && (
            <Link href={`role-list/edit/${item.id}`}>
              <Tooltip title="ویرایش ">
                <IconButton>
                  <Icon pathName="linear/edit.svg" color="primary.main" />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {hasPermission(permissions, 'delete') && (
            <Tooltip title=" حذف" onClick={() => handleDeleteModal(item.id)}>
              <IconButton disabled={item.employeesCount > 0}>
                <Icon
                  pathName="linear/trash.svg"
                  color={item.employeesCount > 0 ? 'text.secondary' : 'primary.main'}
                />
              </IconButton>
            </Tooltip>
          )}
          {hasPermission(permissions, 'permission') && (
            <Link href={`role-list/access-level/${item.id}`}>
              <Tooltip title="دسترسی">
                <IconButton>
                  <Icon pathName="linear/key-square.svg" color="primary.main" />
                </IconButton>
              </Tooltip>
            </Link>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};
export default RoleTableBody;
