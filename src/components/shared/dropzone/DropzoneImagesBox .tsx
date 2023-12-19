import React, { FC } from 'react';
import { Chip, Grid, Typography } from '@mui/material';
import { DropzoneImagesBoxProps } from '@/components/shared/ITypes';

const DropzoneImagesBox: FC<DropzoneImagesBoxProps> = ({ inputName, removeFile, watch }) => {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };
  // the type of the inputName can be different ; when we choose the files from storage it take them as File ;
  // when we receive them from server , we get them as string:

  if (typeof watch(inputName) === 'string') {
    let filePath = watch(inputName);
    return (
      <Grid item sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Chip
          size="medium"
          label={
            <Typography variant="caption">
              {filePath?.length > 20 ? `...${filePath?.substring(0, 20)}` : filePath}
            </Typography>
          }
          clickable
          color="primary"
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => openInNewTab(filePath)}
          onDelete={() => removeFile(filePath)}
        />
      </Grid>
    );
  } else {
    return (
      <>
        {!!watch(inputName)?.length && (
          <Grid container spacing={3} sx={{ justifyContent: 'end' }}>
            {watch(inputName)?.map((file: any, index: number) => (
              <Grid
                item
                key={index}
                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
              >
                <Chip
                  size="medium"
                  label={
                    <Typography variant="caption">
                      {file.name.length > 20 ? `...${file.name.substring(0, 20)}` : file.name}
                    </Typography>
                  }
                  clickable
                  color="primary"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  onDelete={() => removeFile(file)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </>
    );
  }
};
// };

export default DropzoneImagesBox;
