import React, { ChangeEvent } from 'react';
import { Collapse, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { Accordion, NumberSection } from '@/form-builder/shared';
import RequiredSection from '@/form-builder/shared/required-section/RequiredSection';
import MessageSection from '@/form-builder/shared/message-section/MessageSection';
import { handleChangeMessage } from '@/form-builder/shared/message-section/messageSection';
import { handleChangeRequired } from '@/form-builder/shared/required-section/requiredSection';
import { handleChange } from '@/form-builder/shared/number-section/number-section';

const TextBoxValidations = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);
  const elementValidations =
    properties.elementProperties[properties.listId][properties.currentIndex]?.validations;

  return (
    <Stack sx={{ alignItems: 'center', mx: 1, mt: 2 }}>
      <Accordion
        summaryContent={<Typography variant="subtitle2">الزامی</Typography>}
        detailsContent={
          <Stack spacing={2}>
            <RequiredSection
              checked={elementValidations?.required?.value || ''}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeRequired(
                  e,
                  dispatch,
                  properties,
                  'text-box',
                  'required',
                  'validations',
                  elementValidations?.required?.message,
                )
              }
            />
            <Collapse in={elementValidations?.required?.value}>
              <MessageSection
                label="required message"
                value={elementValidations.required.message || ''}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeMessage(
                    e,
                    dispatch,
                    properties,
                    'text-box',
                    'required',
                    'validations',
                    elementValidations?.required?.value,
                  )
                }
              />
            </Collapse>
          </Stack>
        }
      />
      <Accordion
        summaryContent={<Typography variant="subtitle2">حداقل کاراکتر</Typography>}
        detailsContent={
          <Stack spacing={2}>
            <NumberSection
              min="2"
              max="10"
              title="min"
              value={(elementValidations?.min?.value as string) || '2'}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(
                  e,
                  dispatch,
                  properties,
                  'text-box',
                  'min',
                  'validations',
                  elementValidations?.min?.message,
                )
              }
            />
            <MessageSection
              label="min message"
              value={elementValidations?.min?.message}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeMessage(
                  e,
                  dispatch,
                  properties,
                  'text-box',
                  'min',
                  'validations',
                  elementValidations?.min?.value,
                )
              }
            />
          </Stack>
        }
      />
      <Accordion
        summaryContent={<Typography variant="subtitle2">حداکثر کاراکتر</Typography>}
        detailsContent={
          <Stack spacing={2}>
            <NumberSection
              min={elementValidations?.min?.value as string}
              title="max"
              value={elementValidations?.max?.value as string}
              handleChange={(e) =>
                handleChange(
                  e,
                  dispatch,
                  properties,
                  'text-box',
                  'max',
                  'validations',
                  elementValidations?.max?.message,
                )
              }
            />
            <MessageSection
              label="max message"
              value={elementValidations?.max?.message}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeMessage(
                  e,
                  dispatch,
                  properties,
                  'text-box',
                  'max',
                  'validations',
                  elementValidations?.max?.value,
                )
              }
            />
          </Stack>
        }
      />
    </Stack>
  );
};
export default TextBoxValidations;
