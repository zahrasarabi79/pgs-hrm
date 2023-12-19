import React, { ChangeEvent, FC } from 'react';
import { Stack } from '@mui/material';
import { NumberSection } from '@/form-builder/shared';

export interface DisablePastFutureSection {
  mode: 'past' | 'future';
  disabledTime: { hours: string; minutes: string };
  handleChangeDisabledHours: (
    e: ChangeEvent<HTMLInputElement>,
    timeUnit: 'hours' | 'minutes',
  ) => void;
}

const DisableHoursSection: FC<DisablePastFutureSection> = ({
  disabledTime,
  handleChangeDisabledHours,
  mode,
}) => {
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}></Stack>
      {mode === 'past' ? (
        <Stack direction={'row'} gap={5} alignItems={'center'}>
          <NumberSection
            min="0"
            max="60"
            value={disabledTime?.['minutes']}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeDisabledHours(e, 'minutes')
            }
          />
          :
          <NumberSection
            min="0"
            max="24"
            value={disabledTime?.['hours']}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeDisabledHours(e, 'hours')
            }
          />
        </Stack>
      ) : (
        <Stack direction={'row'} gap={5} alignItems={'center'}>
          <NumberSection
            min="0"
            max="60"
            value={disabledTime?.['minutes']}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeDisabledHours(e, 'minutes')
            }
          />
          :
          <NumberSection
            min="0"
            max="24"
            value={disabledTime?.['hours']}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeDisabledHours(e, 'hours')
            }
          />
        </Stack>
      )}
    </>
  );
};

export default DisableHoursSection;
