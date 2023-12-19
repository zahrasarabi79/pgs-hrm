import React, { FC } from 'react';
import { FormHelperText, Stack } from '@mui/material';
import { DropzoneErrorMessageProps } from '@/components/shared/ITypes';

const DropzoneErrorMessage: FC<DropzoneErrorMessageProps> = ({ errors, watch, inputName }) => {
  // when we choose image from local , the watch(inputName) has File type
  // when image came from server , the watch(inputName) has string type(pathname)
  if (typeof watch(inputName) === 'string') {
    return (
      !!errors[inputName]?.message && (
        <Stack sx={{ width: '100%', flexDirection: 'row-reverse' }}>
          <FormHelperText error sx={{ fontSize: '12px' }}>
            {errors[inputName]?.message}
          </FormHelperText>
        </Stack>
      )
    );
  } else {
    return (
      //whenever new item added , the error would be gone
      !watch(inputName)?.length ||
      //whenever we had error message
      (!!errors[inputName]?.message && (
        <Stack sx={{ width: '100%', flexDirection: 'row-reverse' }}>
          <FormHelperText error sx={{ fontSize: '12px' }}>
            {errors[inputName]?.message}
          </FormHelperText>
        </Stack>
      ))
    );
  }
};

export default DropzoneErrorMessage;
