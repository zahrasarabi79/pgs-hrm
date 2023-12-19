import React from 'react';
import { Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import {
  ElementFlexSection,
  InputLabelSection,
  InputPlaceholderSection,
  InputVariantSection,
} from '@/form-builder/shared';
import { handleChangeLabel } from '@/form-builder/shared/input-label-section/inputLabelSection';
import { handleChangePlaceholder } from '@/form-builder/shared/input-placeholder-section/inputPlaceholderSection';
import { handleChangeVariant } from '@/form-builder/shared/input-variant-section/inputVariantSection';
import { handleChangeFlex } from '@/form-builder/shared/element-flex-section/elementFlexSection';

const TextBoxStyles = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);

  return (
    <Stack gap={2} sx={{ alignItems: 'center', mx: 1 }}>
      <InputLabelSection
        handleChangeLabel={handleChangeLabel}
        properties={properties}
        dispatch={dispatch}
        name="text-box"
      />
      <InputPlaceholderSection
        handleChangePlaceholder={handleChangePlaceholder}
        properties={properties}
        dispatch={dispatch}
        name="text-box"
      />
      <InputVariantSection
        handleChangeOption={handleChangeVariant}
        properties={properties}
        dispatch={dispatch}
        name="text-box"
      />
      <ElementFlexSection
        handleChangeFlex={handleChangeFlex}
        properties={properties}
        dispatch={dispatch}
        name="text-box"
      />
    </Stack>
  );
};
export default TextBoxStyles;
