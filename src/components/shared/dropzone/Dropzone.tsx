import React, { FC, useState } from 'react';

import { Button, Stack, Typography } from '@mui/material';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { DropzoneComponentProps, FileRejection } from '@/components/shared/ITypes';

const Dropzone: FC<DropzoneComponentProps> = ({
  setValue,
  register,
  watch,
  label,
  inputName,
  disabled,
  multiple = false,
  required = false,
}) => {
  const [_, setRejectedFiles] = useState<FileRejection[]>([]);
  const [isMessage, setIsMessage] = useState<boolean>(false);
  const onDrop = (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles?.length) {
      const currentPreInvoices = watch(inputName) || [];
      let newPreInvoices;
      if (multiple) {
        newPreInvoices = [
          ...currentPreInvoices,
          ...acceptedFiles.map((file: FileWithPath) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ];
      } else {
        newPreInvoices = [
          ...acceptedFiles.map((file: FileWithPath) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ];
      }

      setValue(inputName, newPreInvoices, { shouldDirty: true });
      setIsMessage(false);
    }
    if (rejectedFiles?.length) {
      setIsMessage(true);
      setTimeout(() => {
        setIsMessage(false);
      }, 4000);
      setRejectedFiles((previousRejected) => [...previousRejected, ...rejectedFiles]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    onDrop,
    multiple,
  });

  return (
    <>
      <Button
        disabled={disabled}
        sx={{
          padding: '10px 40px',
          cursor: 'pointer',
          textAlign: 'end',
          alignSelf: 'end',
          display: 'flex',
          flexDirection: 'column',
          border: '2px dashed #8c8c8c',
          width: '100%',
          height: '80px',
        }}
        {...getRootProps({})}
      >
        <input
          disabled={disabled}
          type="file"
          {...register(inputName, {
            required: { value: required, message: 'این فیلد الزامی است' },
            validate: (value) => {
              // don't know why this validation doesn't work onChange !
              if (multiple && value?.length > 10) {
                return 'تعداد فایل ها نباید بیشتر از  10 عدد باشد';
              }

              return true;
            },
          })}
          {...getInputProps()}
        />
        <Stack direction={'row'} sx={{ flexDirection: 'row-reverse', gap: 2 }}>
          <Typography
            sx={{
              textAlign: 'left',
              color: disabled ? 'text.secondary' : 'primary.main',
              alignSelf: 'end',
              fontSize: '14px',
            }}
          >
            {label}
          </Typography>
        </Stack>
      </Button>
      {isMessage && (
        <Typography variant="caption" sx={{ color: 'red', fontSize: '12px', textAlign: 'end' }}>
          فرمت فایل مورد نظر مجاز نمی باشد
          <span
            style={{ fontSize: '24px', cursor: 'pointer', paddingRight: '4px' }}
            onClick={() => setIsMessage(false)}
          >
            {' '}
            &times;
          </span>
        </Typography>
      )}
    </>
  );
};

export default Dropzone;
