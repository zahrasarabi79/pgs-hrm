import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetEmployeeQuery } from '@/state-management/apis/employeeApi';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { typographyStyle } from '@/components/modals/HierarchiItemPreviewModal';
import { renderPositionAndHierarchy } from '@/components/forms/employee-modifier/utils';
import { LoadingPage } from '@/components/shared';
import Image from 'next/image';

const EmployeePreviewContent = () => {
  const router = useRouter();
  const { employeeId } = useParams();
  const { data: employeeData, isLoading } = useGetEmployeeQuery(employeeId as string);
  if (isLoading) {
    return <LoadingPage height="60vh" />;
  }
  if (employeeData && !isLoading) {
    const { gender, lastname, description, firstname, roles, id, profileImage } =
      employeeData?.data;

    const openInNewTab = (url: string) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    };

    return (
      <>
        <Grid container gap={2}>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="subtitle1" sx={typographyStyle}>
              نام: <span style={{ color: '#fff', marginRight: 1 }}>{firstname}</span>
            </Typography>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="subtitle1" sx={typographyStyle}>
              نام خانوادگی: <span style={{ color: '#fff', marginRight: 1 }}>{lastname}</span>
            </Typography>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="subtitle1" sx={typographyStyle}>
              جنسیت:{' '}
              <span style={{ color: '#fff', marginRight: 1 }}>
                {gender === 'male' ? 'مرد' : 'زن'}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={typographyStyle}>
              نقش ها:{' '}
              <Stack direction={'column'}>
                {roles?.map((role, i) => (
                  <div style={{ color: '#fff', marginRight: 1 }} key={i}>
                    {renderPositionAndHierarchy(role as any)}
                  </div>
                ))}
              </Stack>
            </Typography>
          </Grid>
          {description?.value && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={typographyStyle}>
                توضیحات : <span style={{ color: '#fff', marginRight: 1 }}>{description.value}</span>
              </Typography>
            </Grid>
          )}
          {profileImage && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={typographyStyle}>
                عکس :{' '}
                <span style={{ color: '#fff', marginRight: 1 }}>
                  <div onClick={() => openInNewTab(profileImage as string)}>
                    <Image
                      priority
                      alt="profile-image"
                      src={profileImage as string}
                      width={350}
                      height={250}
                      style={{ display: 'flex', cursor: 'pointer', borderRadius: '6px' }}
                    />
                  </div>
                </span>
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} sx={{ textAlign: 'end' }}>
            <Button
              onClick={() => router.push(`/employee-management/employees-list/edit/${id}`)}
              type="submit"
              variant="contained"
              color="success"
            >
              ویرایش
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default EmployeePreviewContent;
