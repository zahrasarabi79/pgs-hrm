import React, { ChangeEvent, FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { Accordion } from '@/form-builder/shared';
import DisableHoursSection from '@/form-builder/shared/time-picker/time-range/disable-hours-section/DisableHoursSection';
import {
  handleChangeDisabledFutureHours,
  handleChangeDisabledPastHours,
} from '@/form-builder/shared/time-picker/time-range/disable-hours-section/disableHoursSection';
import MessageSection from '@/form-builder/shared/message-section/MessageSection';
import { handleChangeErrorMessages } from '@/form-builder/element-validations/date-range-validation/dateRangeValidation';

interface TimeCalenderValidationProps {
  elementValidations: any;
  selectedRangeItem: 'to' | 'from' | 'calender';
  allElementValidations?: any;
}

const TimeCalenderValidation: FC<TimeCalenderValidationProps> = ({
  elementValidations,
  selectedRangeItem,
  allElementValidations,
}) => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);

  return (
    <Stack gap={2} sx={{ alignItems: 'center', mx: 1, mt: 2 }}>
      <Accordion
        summaryContent={<Typography variant="subtitle2">disable past</Typography>}
        detailsContent={
          <Stack gap={2}>
            <DisableHoursSection
              mode={'past'}
              disabledTime={allElementValidations?.from?.disabledTimeFrom}
              handleChangeDisabledHours={(e: ChangeEvent<HTMLInputElement>, timeUnit) =>
                handleChangeDisabledPastHours(e, dispatch, properties, timeUnit)
              }
            />
            <MessageSection
              label="disable past error message"
              value={elementValidations?.errorMessages['minTime']}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeErrorMessages(
                  e,
                  dispatch,
                  properties,
                  'minTime',
                  selectedRangeItem,
                  'hourly',
                )
              }
            />
          </Stack>
        }
      />
      <Accordion
        summaryContent={<Typography variant="subtitle2">disable future</Typography>}
        detailsContent={
          <Stack gap={2}>
            <DisableHoursSection
              mode={'future'}
              disabledTime={allElementValidations?.from?.disabledTimeTo}
              handleChangeDisabledHours={(e: ChangeEvent<HTMLInputElement>, timeUnit) =>
                handleChangeDisabledFutureHours(e, dispatch, properties, timeUnit)
              }
            />
            <MessageSection
              label="disable future error message"
              value={elementValidations?.errorMessages['maxTime']}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeErrorMessages(
                  e,
                  dispatch,
                  properties,
                  'maxTime',
                  selectedRangeItem,
                  'hourly',
                )
              }
            />
          </Stack>
        }
      />
    </Stack>
  );
};

export default TimeCalenderValidation;
