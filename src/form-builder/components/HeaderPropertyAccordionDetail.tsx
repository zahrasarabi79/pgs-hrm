import {
  Collapse,
  FormControl,
  OutlinedInput,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import {
  setHeaderSubTitle,
  setHeaderTitle,
  setIsHeader,
} from '@/state-management/slices/cardFormPropertySlice';

const HeaderPropertyAccordionDetail = () => {
  const dispatch = useAppDispatch();
  const cardFormProperties = useAppSelector((state) => state?.cardFormProperties);
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle1">سربرگ کارت</Typography>
        </Paper>
        <Switch
          checked={cardFormProperties?.isHeader}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            dispatch(setIsHeader({ isHeader: event.target.checked }))
          }
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Stack>
      <Collapse in={cardFormProperties?.isHeader}>
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
              <Typography variant="subtitle1">عنوان سربرگ</Typography>
            </Paper>
            <FormControl sx={{ flex: 1 }}>
              <OutlinedInput
                value={cardFormProperties?.titleHeader}
                onChange={(e) => dispatch(setHeaderTitle({ titleHeader: e.target.value }))}
                placeholder="عنوان سربرگ را بنویس"
              />
            </FormControl>
          </Stack>
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
              <Typography variant="subtitle1">عنوان زیر سربرگ</Typography>
            </Paper>
            <FormControl sx={{ flex: 1 }}>
              <OutlinedInput
                value={cardFormProperties?.subTitleHeader}
                onChange={(e) => dispatch(setHeaderSubTitle({ subTitleHeader: e.target.value }))}
                placeholder="عنوان زیر سربرگ را بنویس"
              />
            </FormControl>
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default HeaderPropertyAccordionDetail;
