import { IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@/components/shared';
import { useAddOrganizationLevelMutation } from '@/state-management/apis/organizationLevelApi';
import { useAppSelector } from '@/state-management/store/store';

const NotFoundOrganizationLevel = () => {
  const [addOrganizationLevel] = useAddOrganizationLevelMutation();

  const name = useAppSelector((state) => state?.organizationLevelName?.name);

  const handleAddOrganizationLevel = async () => {
    await addOrganizationLevel({ name: { _: 'StaticText', value: name.value } }).unwrap();
  };

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="subtitle2">موردی یافت نشد</Typography>
      <IconButton onClick={handleAddOrganizationLevel}>
        <Icon pathName="bold/add.svg" />
      </IconButton>
    </Stack>
  );
};
export default NotFoundOrganizationLevel;
