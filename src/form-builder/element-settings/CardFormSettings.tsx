import { Paper, Stack, TextField, Typography } from '@mui/material';

const CardFormSettings = () => {
  return (
    <Stack sx={{ alignItems: 'center', mx: 1 }}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle2">نام فیلد</Typography>
        </Paper>
        <TextField size="small" disabled value="root" sx={{ flex: 1 }} />
      </Stack>
    </Stack>
  );
};
export default CardFormSettings;
