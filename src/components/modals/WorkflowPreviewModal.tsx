import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useGetWorkflowQuery } from '@/state-management/apis/workflowApi';
import { useParams, useRouter } from 'next/navigation';
import { Icon } from '@/components/shared';

export const typographyStyle = {
  borderBottom: 1,
  borderColor: 'GrayText',
  color: 'GrayText',
  py: 1.6,
  wordBreak: 'break-all',
};

const WorkflowPreviewModal = () => {
  const router = useRouter();
  const { previewId } = useParams();
  const { data: workflowData } = useGetWorkflowQuery(previewId as string);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          نام:{' '}
          <span style={{ color: '#fff', marginRight: 1 }}>{workflowData?.data.name.value}</span>
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          سرویس:{' '}
          <span style={{ color: '#fff', marginRight: 1 }}>{workflowData?.data.service.name}</span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          توضیحات:{' '}
          <span style={{ color: '#fff', marginRight: 1 }}>
            {workflowData?.data?.description?.value || '_'}
          </span>
        </Typography>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
          width: '100%',
          gap: 2,
        }}
      >
        <Typography>نسخه ای وجود ندارد</Typography>
        <IconButton onClick={() => router.push(`/workflow/${previewId}`)}>
          <Icon pathName="bold/add.svg" size={30} />
        </IconButton>
      </Box>
      {/*<FlowsContent flows={workflowData?.data.flows as IFlows[]} />*/}
    </Grid>
  );
};
export default WorkflowPreviewModal;
