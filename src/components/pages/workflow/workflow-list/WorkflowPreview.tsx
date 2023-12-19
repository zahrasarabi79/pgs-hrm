'use client';
import React from 'react';
import { MainCard } from '@/components/shared';
import WorkflowPreviewModal from '@/components/modals/WorkflowPreviewModal';

const WorkflowPreview = () => {
  return (
    <MainCard closeBtn divider cardStyles={{ px: 2, pb: 2 }} title="مشاهده جزئیات">
      <WorkflowPreviewModal />
    </MainCard>
  );
};
export default WorkflowPreview;
