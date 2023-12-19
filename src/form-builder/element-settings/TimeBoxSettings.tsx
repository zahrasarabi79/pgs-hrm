import { ChangeEvent, useState } from 'react';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { updateElementProperties } from '@/state-management/slices/propertiesSlice';

const TimeBoxSettings = () => {
  const [error, setError] = useState(false);
  const properties = useAppSelector((state) => state.properties);
  const fieldName =
    properties.elementProperties[properties.listId][properties.currentIndex]?.uniqueName;
  const dispatch = useAppDispatch();

  const handleUniqueName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(
      updateElementProperties({
        type: 'text-box',
        id: properties.id,
        uniqueName: e.target.value,
      }),
    );
    setError(
      properties.elementProperties[properties.listId]?.some(
        (element) => element.uniqueName === e.target.value,
      ),
    );
  };

  return (
    <Stack sx={{ alignItems: 'center', mx: 1 }}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle2">نام فیلد</Typography>
        </Paper>
        <TextField
          size="small"
          value={fieldName}
          sx={{ flex: 1 }}
          onChange={handleUniqueName}
          error={error}
          helperText={error && 'این نام تکراری است'}
        />
      </Stack>
    </Stack>
  );
};
export default TimeBoxSettings;
