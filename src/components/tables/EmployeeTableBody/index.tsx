import React, { FC } from 'react';
import { EmployeesTableBodyProps } from '@/types/component-types';
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';
import Icon from '@/components/shared/Icon';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setOpenModal } from '@/state-management/slices/modalSlice';
import DeleteModal from '@/components/modals/DeleteModal';
import { MainCard } from '@/components/shared';
import { useDeleteEmployeeMutation } from '@/state-management/apis/employeeApi';
import { RoleData } from '@/state-management/apis/types';
import { renderEmployeeRoles } from './utils';
import { hasPermission } from '@/public/utility-functions';
import Link from 'next/link';

const EmployeesTableBody: FC<EmployeesTableBodyProps> = ({ item, page, index }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [deleteEmployee, { isLoading: deleteLoading }] = useDeleteEmployeeMutation();
  const { allDataPermissions: permissions } = useAppSelector((state) => state.employeesSlice);
  const handleDeleteStructure = async (employeeId: string) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard cardStyles={{ px: 2, pb: 2 }} title="آیا از  درخواست حذف خود مطمئن هستید؟">
            <DeleteModal
              isLoading={deleteLoading}
              deleteFunction={() => deleteEmployee(employeeId).unwrap()}
            />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  return (
    <>
      <TableRow key={item.id}>
        <TableCell align={'left'} style={{ width: '10%' }}>
          {index + 1 + (page - 1) * 10}
        </TableCell>
        <TableCell align={'left'} style={{ width: '10%' }}>
          {item.firstname}
        </TableCell>
        <TableCell align={'left'} style={{ width: '15%' }}>
          {item.lastname}
        </TableCell>
        <TableCell align={'left'} style={{ width: '5%' }}>
          {item.gender ? (item.gender === 'male' ? 'مرد' : 'زن') : ''}
        </TableCell>
        <TableCell align={'left'} style={{ width: '50%' }}>
          <Stack direction={'row'} justifyContent={'left'} sx={{ width: 'max-content' }}>
            {renderEmployeeRoles(item.role as unknown as RoleData)}{' '}
            {item.rolesCount > 1 ? ` و  ${item.rolesCount - 1} نقش دیگر` : null}
          </Stack>
        </TableCell>
        <TableCell align={'center'} style={{ width: '10%' }}>
          <Stack direction={'row'} justifyContent={'center'}>
            <Tooltip onClick={() => router.push(`employees-list/${item.id}`)} title="مشاهده ">
              <IconButton>
                <Icon pathName="linear/eye.svg" color="primary.main" />
              </IconButton>
            </Tooltip>
            {hasPermission(permissions, 'update') && (
              <Link href={`employees-list/edit/${item.id}`}>
                <Tooltip title=" ویرایش کارمند">
                  <IconButton>
                    <Icon pathName="linear/edit.svg" color="primary.main" />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
            {hasPermission(permissions, 'delete') && (
              <Tooltip onClick={() => handleDeleteStructure(item.id)} title=" حذف">
                <IconButton>
                  <Icon pathName="linear/trash.svg" color={'primary.main'} />
                </IconButton>
              </Tooltip>
            )}
            {hasPermission(permissions, 'account') && (
              <Link href={`employees-list/user/${item.id}`}>
                <Tooltip title="کاربر">
                  <IconButton disabled={false}>
                    <Icon pathName="linear/user.svg" color={'primary.main'} />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EmployeesTableBody;
