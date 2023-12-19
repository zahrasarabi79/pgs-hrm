import { FC } from 'react';
import { Avatar, Badge, Grid, IconButton } from '@mui/material';
import { DropzoneprofileBoxProps } from '@/components/shared/ITypes';
import { Icon } from '@/components/shared';
import { FileWithPath } from 'react-dropzone';

const DropzoneProfileBox: FC<DropzoneprofileBoxProps> = ({ inputName, removeFile, watch ,errors }) => {
  const openInNewTab = (image: any) => {
    if (typeof image === 'string') {
      // opening picture that image is came from server
      const newWindow = window.open(image, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    } else {
      // opening picture that image is created from Local selected picture
      const newWindow = window.open(image.preview, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    }
  };

  // the type of the inputName can be different ; when we choose the files from storage it take them as File ;
  // when we receive them from server , we get them as string:
  const profileAvatar = (src: string, removeFileSrc: FileWithPath) => {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        badgeContent={
          <IconButton onClick={() => removeFile(removeFileSrc)}>
            <Icon pathName="linear/trash.svg" size={24} color="red" />
          </IconButton>
        }
      >
        <Avatar
          alt="profile-pic"
          onClick={() => openInNewTab(src)}
          src={src}
          sx={{
            width: 120,
            height: 120,
            cursor: 'pointer',
            boxShadow: errors[inputName] ? '-3px 5px 55px -10px rgba(255,0,0,0.55)' : null,
          }}
        />
      </Badge>
    );
  };

  if (typeof watch(inputName) === 'string') {
    let filePath = watch(inputName);
    return (
      <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
        {profileAvatar(filePath, filePath)}
      </Grid>
    );
  } else {
    return (
      <>
        {!!watch(inputName)?.length && (
          <Grid container sx={{ justifyContent: 'center' }}>
            {watch(inputName)?.map((file: any, index: number) => (
              <div key={index}>{profileAvatar(file.preview, file)}</div>
            ))}
          </Grid>
        )}
      </>
    );
  }
};
// };

export default DropzoneProfileBox;
