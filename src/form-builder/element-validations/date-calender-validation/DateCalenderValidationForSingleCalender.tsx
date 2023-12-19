// we created this validation component just for 'single-calender' because in this situation we dont have from and to calenders and all the min and max configs shout be set based on single property(calender-peropertty)
import React, { FC, useState } from 'react';
import { Accordion } from '../../shared';
import { Collapse, Stack, Typography } from '@mui/material';

import DisablePastFutureSection from '../../shared/date-picker/DisablePastFutureSection';
import MultipleSelectChip from '../../shared/date-picker/MultipleSelectChip';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import {
  handleChangeDisabledFutureDays,
  handleChangeDisabledPastDays,
  handleChangeDisableFuture,
  handleChangeDisablePast,
  handleChangeErrorMessages,
  handleSelectDisableDays,
} from '@/form-builder/element-validations/date-range-validation/dateRangeValidation';
import MessageSection from '@/form-builder/shared/message-section/MessageSection';

interface DateCalenderValidationProps {
  elementValidations: any;
  selectedRangeItem: 'to' | 'from' | 'calender';
}

const DateCalenderValidationForSingleCalender: FC<DateCalenderValidationProps> = ({
  elementValidations,
  selectedRangeItem,
}) => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);
  const conditionalValue = useAppSelector((state) => state.conditionalValue?.value);

  const persianDaysOfWeek = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  const [item, setItem] = useState<string[]>([]);

  const onSelectDays = (disabledDays: string[]) => {
    handleSelectDisableDays(
      dispatch,
      properties,
      disabledDays,
      selectedRangeItem,
      conditionalValue,
    );
  };

  return (
    <Stack gap={2} sx={{ alignItems: 'center', mx: 1, mt: 2 }}>
      <Accordion
        summaryContent={<Typography variant="subtitle2">disable past</Typography>}
        detailsContent={
          <Stack gap={2}>
            <DisablePastFutureSection
              mode={'past'}
              checked={elementValidations?.isPastDisabled}
              handleChange={(e) =>
                handleChangeDisablePast(
                  e,
                  dispatch,
                  properties,
                  selectedRangeItem,
                  conditionalValue,
                )
              }
              numberOfDisabledDays={elementValidations?.disabledPastDays}
              handleChangeDisabledDays={(e) =>
                handleChangeDisabledPastDays(
                  e,
                  dispatch,
                  properties,
                  selectedRangeItem,
                  conditionalValue,
                )
              }
            />
            <Collapse in={elementValidations?.isPastDisabled}>
              <MessageSection
                label="disable past error message"
                value={elementValidations?.errorMessages['minDate']}
                handleChange={(e: any) =>
                  handleChangeErrorMessages(
                    e,
                    dispatch,
                    properties,
                    'minDate',
                    selectedRangeItem,
                    conditionalValue,
                  )
                }
              />
            </Collapse>
          </Stack>
        }
      />
      <Accordion
        summaryContent={<Typography variant="subtitle2">disable future</Typography>}
        detailsContent={
          <Stack gap={2}>
            <DisablePastFutureSection
              mode={'future'}
              checked={elementValidations?.isFutureDisabled}
              handleChange={(e) =>
                handleChangeDisableFuture(
                  e,
                  dispatch,
                  properties,
                  selectedRangeItem,
                  conditionalValue,
                )
              }
              numberOfDisabledDays={elementValidations?.disabledFutureDays}
              handleChangeDisabledDays={(e) =>
                handleChangeDisabledFutureDays(
                  e,
                  dispatch,
                  properties,
                  selectedRangeItem,
                  conditionalValue,
                )
              }
            />
            <Collapse in={elementValidations?.isFutureDisabled}>
              <MessageSection
                label="disable fuature error message"
                value={elementValidations?.errorMessages['maxDate']}
                handleChange={(e: any) =>
                  handleChangeErrorMessages(
                    e,
                    dispatch,
                    properties,
                    'maxDate',
                    selectedRangeItem,
                    conditionalValue,
                  )
                }
              />
            </Collapse>
          </Stack>
        }
      />
      <Accordion
        summaryContent={<Typography variant="subtitle2">disable days</Typography>}
        detailsContent={
          <Stack gap={2}>
            <MultipleSelectChip
              item={elementValidations?.disabledDays || item}
              setItem={setItem}
              selectItems={persianDaysOfWeek}
              handleSelectChips={onSelectDays}
            />
            <MessageSection
              label="disable some days"
              value={elementValidations?.errorMessages['shouldDisableDate']}
              handleChange={(e: any) =>
                handleChangeErrorMessages(
                  e,
                  dispatch,
                  properties,
                  'shouldDisableDate',
                  selectedRangeItem,
                  conditionalValue,
                )
              }
            />
          </Stack>
        }
      />
    </Stack>
  );
};

export default DateCalenderValidationForSingleCalender;
