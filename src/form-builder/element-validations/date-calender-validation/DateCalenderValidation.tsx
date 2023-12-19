// as you see in the validations , in both to and from situations '
// we are refering the max and min date based of 'from' calender
// it is because the second calender must be relevant to first calender
// in validation forms when we are changing the max and min date , in both conditions are changing the validations of the 'from'
// in simple words we should change always one index and depend the other calender to that
// in previous version , we had set the min and max for both calenders ;
// that manner made conflicts ; in current version we just change the one calender validations and other one adjusts with that calender configs ;
// so this is why we are measuring everything based on 'from-time' validations
import React, { FC, useState } from "react";
import { Accordion } from "../../shared";
import { Collapse, Stack, Typography } from "@mui/material";

import DisablePastFutureSection from "../../shared/date-picker/DisablePastFutureSection";
import MultipleSelectChip from "../../shared/date-picker/MultipleSelectChip";
import { useAppDispatch, useAppSelector } from "@/state-management/store/store";
import {
  handleChangeDisabledFutureDays,
  handleChangeDisabledPastDays,
  handleChangeDisableFuture,
  handleChangeDisablePast,
  handleChangeErrorMessages,
  handleSelectDisableDays
} from "@/form-builder/element-validations/date-range-validation/dateRangeValidation";
import MessageSection from "@/form-builder/shared/message-section/MessageSection";

interface DateCalenderValidationProps {
  elementValidations: any;
  selectedRangeItem: 'to' | 'from' | 'calender';
  allElementValidations: any;
}

const DateCalenderValidation: FC<DateCalenderValidationProps> = ({
  elementValidations,
  selectedRangeItem,
  allElementValidations,
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
              checked={allElementValidations?.from.isPastDisabled}
              handleChange={(e) =>
                handleChangeDisablePast(e, dispatch, properties, 'from', conditionalValue)
              }
              numberOfDisabledDays={allElementValidations?.from?.disabledPastDays}
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
            <Collapse in={allElementValidations?.from?.isPastDisabled}>
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
                    'daily',
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
              checked={allElementValidations?.from.isFutureDisabled}
              handleChange={(e) =>
                handleChangeDisableFuture(e, dispatch, properties, 'from', conditionalValue)
              }
              numberOfDisabledDays={allElementValidations?.from?.disabledFutureDays}
              handleChangeDisabledDays={(e) =>
                handleChangeDisabledFutureDays(e, dispatch, properties, 'from', conditionalValue)
              }
            />
            <Collapse in={allElementValidations?.from?.isFutureDisabled}>
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
                    'daily',
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
                  'daily',
                )
              }
            />
          </Stack>
        }
      />
    </Stack>
  );
};

export default DateCalenderValidation;
