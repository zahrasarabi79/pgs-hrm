import React, { ChangeEvent } from 'react';
import { Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import {
  ElementFlexSection,
  InputLabelSection,
  InputPlaceholderSection,
  InputVariantSection,
  NumberSection,
} from '@/form-builder/shared';
import { handleChangeLabel } from '@/form-builder/shared/input-label-section/inputLabelSection';
import { handleChangePlaceholder } from '@/form-builder/shared/input-placeholder-section/inputPlaceholderSection';
import { handleChangeVariant } from '@/form-builder/shared/input-variant-section/inputVariantSection';
import { handleChangeFlex } from '@/form-builder/shared/element-flex-section/elementFlexSection';
import { handleChange } from '@/form-builder/shared/number-section/number-section';

const TextAreaBoxStyles = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);

  const minRows =
    properties.elementProperties[properties.listId][properties.currentIndex]?.properties?.minRows;

  const maxRows =
    properties.elementProperties[properties.listId][properties.currentIndex]?.properties?.minRows;

  return (
    <Stack gap={2} sx={{ alignItems: 'center', mx: 1 }}>
      <InputLabelSection
        properties={properties}
        dispatch={dispatch}
        handleChangeLabel={handleChangeLabel}
        name="text-area-box"
      />
      <InputPlaceholderSection
        properties={properties}
        dispatch={dispatch}
        handleChangePlaceholder={handleChangePlaceholder}
        name="text-area-box"
      />
      <InputVariantSection
        handleChangeOption={handleChangeVariant}
        properties={properties}
        dispatch={dispatch}
        name="text-area-box"
      />
      <ElementFlexSection
        handleChangeFlex={handleChangeFlex}
        properties={properties}
        dispatch={dispatch}
        name="text-area-box"
      />
      <NumberSection
        value={
          properties?.elementProperties[properties?.listId][properties?.currentIndex]?.properties
            ?.minRows
        }
        title="کمترین ردیف"
        min="2"
        max="3"
        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e, dispatch, properties, 'text-area-box', 'minRows', 'properties')
        }
      />
      <NumberSection
        value={
          properties?.elementProperties[properties?.listId][properties?.currentIndex]?.properties
            ?.maxRows
        }
        title="بیشترین ردیف"
        min={maxRows < minRows ? minRows : maxRows}
        max="12"
        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e, dispatch, properties, 'text-area-box', 'maxRows', 'properties')
        }
      />
    </Stack>
  );
};
export default TextAreaBoxStyles;
