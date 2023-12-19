import React, { FC } from 'react';
import { Stack, TextField } from '@mui/material';
import { MessageSectionProps } from '@/types/form-builder/messageSection';

const MessageSection: FC<MessageSectionProps> = ({ value, handleChange, label }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      <TextField size="small" fullWidth label={label} value={value} onChange={handleChange} />
    </Stack>
  );
};
export default MessageSection;
