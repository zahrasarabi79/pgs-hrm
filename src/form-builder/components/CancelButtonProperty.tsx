import React, { ChangeEvent } from 'react';
import {
  Collapse,
  FormControl,
  OutlinedInput,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setCancelButtonTitle, setIsCancel } from '@/state-management/slices/cardFormPropertySlice';

const CancelButtonProperty = () => {
  const dispatch = useAppDispatch();
  const cardFormProperties = useAppSelector((state) => state?.cardFormProperties);
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle1">دکمه انصراف</Typography>
        </Paper>
        <Switch
          checked={cardFormProperties?.isCancelButton}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            dispatch(setIsCancel({ isCancelButton: event.target.checked }))
          }
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Stack>
      <Collapse in={cardFormProperties?.isCancelButton}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: '100%',
            }}
          >
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Typography variant="subtitle1">عنوان دکمه</Typography>
            </Paper>
            <FormControl sx={{ flex: 1 }}>
              <OutlinedInput
                value={cardFormProperties?.cancelButtonTitle}
                onChange={(e) =>
                  dispatch(setCancelButtonTitle({ cancelButtonTitle: e.target.value }))
                }
              />
            </FormControl>
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default CancelButtonProperty;
