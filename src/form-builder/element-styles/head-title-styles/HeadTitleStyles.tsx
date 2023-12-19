import React, { ChangeEvent } from 'react';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { updateElementProperties } from '@/state-management/slices/propertiesSlice';
import HeadVariantSection from '@/form-builder/element-styles/head-title-styles/HeadVariantSection';
import { ColorSection, ElementFlexSection } from '@/form-builder/shared';
import { handleChangeFlex } from '@/form-builder/shared/element-flex-section/elementFlexSection';

export const HeadTitleStyles = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state?.properties);

  const content =
    properties?.elementProperties[properties.listId][properties.currentIndex]?.properties?.content;

  const handleContent = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(
      updateElementProperties({
        id: properties.id,
        uniqueName: `head-title-${properties.currentIndex}`,
        type: 'head-title',
        properties: {
          content: e.target.value,
        },
      }),
    );
  };

  return (
    <Stack gap={2} sx={{ alignItems: 'center', mx: 1 }}>
      <Stack spacing={1} direction="column" sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <Typography variant="subtitle1">متن</Typography>
        </Paper>
        <TextField multiline minRows={2} maxRows={6} value={content} onChange={handleContent} />
      </Stack>
      <HeadVariantSection />
      <ColorSection name="head-title" />
      <ElementFlexSection
        handleChangeFlex={handleChangeFlex}
        properties={properties}
        dispatch={dispatch}
        name="head-title"
      />
    </Stack>
  );
};
