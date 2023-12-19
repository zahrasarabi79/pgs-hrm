import { FC } from 'react';
import { TableRow, TableCell, Tooltip, IconButton, Stack, Avatar } from '@mui/material';
import { StructuresTableBodyProps } from '@/types/component-types';
import Icon from '@/components/shared/Icon';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setOpenModal } from '@/state-management/slices/modalSlice';
import { MainCard } from '@/components/shared';
import { useDeleteStructureMutation } from '@/state-management/apis/structureApi';
import StructureItemPreviewModal from '@/components/modals/StructureItemPreviewModal';
import { StructureData } from '@/state-management/apis/types';
import { renderOrganizationalPath } from '@/components/pages/role/utils';
import DeleteModal from '@/components/modals/DeleteModal';
import { hasPermission } from '@/public/utility-functions';
import Link from 'next/link';

const StructuresTableBody: FC<StructuresTableBodyProps> = ({ item, index, page }) => {
  const dispatch = useAppDispatch();
  const [deleteStructure, { isLoading: deleteLoading }] = useDeleteStructureMutation();
  const { allDataPermissions: permissions } = useAppSelector((state) => state.structureApi);
  const handleDeleteStructure = async (structureId: string) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard cardStyles={{ px: 2, pb: 2 }} title="آیا از  درخواست حذف خود مطمئن هستید؟">
            <DeleteModal
              isLoading={deleteLoading}
              deleteFunction={() => deleteStructure(structureId).unwrap()}
            />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  const handleOpenPreview = (structureItem: StructureData) => {
    dispatch(
      setOpenModal({
        open: true,
        content: (
          <MainCard closeBtn divider cardStyles={{ px: 2, pb: 2 }} title="مشاهده جزئیات">
            <StructureItemPreviewModal structureItem={structureItem} />
          </MainCard>
        ),
        maxWidth: 'xs',
      }),
    );
  };

  const notAbleToDelete = item.rolesCount > 0 || item.subsetsCount > 0;
  return (
    <TableRow key={item.id}>
      <TableCell align={'left'} style={{ width: '5%' }}>
        {index + 1 + (page - 1) * 10}
      </TableCell>
      <TableCell align={'left'} style={{ width: '5%' }}>
        <div style={{ width: 'max-content' }}>{item.organizationalHierarchyName.value}</div>
      </TableCell>
      <TableCell align={'left'} style={{ width: '5%' }}>
        {item.logo ? (
          <Avatar alt="logo-picture" src={item.logo} sx={{ width: 36, height: 36 }} />
        ) : null}
      </TableCell>
      <TableCell align={'left'} style={{ width: '20%' }}>
        <div style={{ width: 'max-content' }}>{item.name.value}</div>
      </TableCell>
      <TableCell align={'left'} style={{ width: '50%' }}>
        <Stack direction={'row'} justifyContent={'left'}>
          <div style={{ width: 'max-content' }}>
            {renderOrganizationalPath(item as unknown as any)}
          </div>
        </Stack>
      </TableCell>
      <TableCell align={'center'} style={{ width: '10%' }}>
        <Stack direction={'row'} justifyContent={'center'}>
          <Tooltip onClick={() => handleOpenPreview(item)} title="مشاهده ">
            <IconButton>
              <Icon pathName="linear/eye.svg" color="primary.main" />
            </IconButton>
          </Tooltip>
          {/* comment */}
          {hasPermission(permissions, 'update') && (
            <Link href={`structure-list/edit/${item.id}`}>
              <Tooltip title=" ویرایش ساختار">
                <IconButton>
                  <Icon pathName="linear/edit.svg" color="primary.main" />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {hasPermission(permissions, 'delete') && (
            <Tooltip onClick={() => handleDeleteStructure(item.id)} title=" حذف">
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

export default StructuresTableBody;
