import { OverridableStringUnion } from '@mui/types';
import { ButtonPropsColorOverrides, TypographyPropsVariantOverrides } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { v4 as uuid } from 'uuid';

export interface ISelectOptions {
  value: string;
  label: string;
}

export interface ITextVariantProperties {
  name: OverridableStringUnion<'inherit' | Variant, TypographyPropsVariantOverrides>;
}

export interface IColors {
  name: OverridableStringUnion<
    'error' | 'inherit' | 'primary' | 'secondary' | 'success' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
  themeName: string;
}

export type SelectOptions = ISelectOptions[];

export const cardVariantProperties: ISelectOptions[] = [
  {
    value: 'outlined',
    label: 'outlined',
  },
  {
    value: 'elevation',
    label: 'elevation',
  },
];
export const TextFieldVariantProperties: ISelectOptions[] = [
  {
    value: 'outlined',
    label: 'outlined',
  },
  {
    value: 'filled',
    label: 'filled',
  },
  {
    value: 'standard',
    label: 'standard',
  },
];
export const textVariantProperties: ITextVariantProperties[] = [
  {
    name: 'h3',
  },
  {
    name: 'h4',
  },
  {
    name: 'h5',
  },
  {
    name: 'h6',
  },
  {
    name: 'body1',
  },
  {
    name: 'body2',
  },
  {
    name: 'subtitle1',
  },
  {
    name: 'subtitle2',
  },
  {
    name: 'caption',
  },
  {
    name: 'overline',
  },
];

export const colors: IColors[] = [
  {
    name: 'inherit',
    themeName: 'inherit.main',
  },
  {
    name: 'primary',
    themeName: 'primary.main',
  },
  {
    name: 'secondary',
    themeName: 'secondary.main',
  },
  {
    name: 'warning',
    themeName: 'warning.main',
  },
  {
    name: 'info',
    themeName: 'info.main',
  },
  {
    name: 'success',
    themeName: 'success.main',
  },
  {
    name: 'error',
    themeName: 'error.main',
  },
];

export const inputSizeProperties: ISelectOptions[] = [
  {
    value: 'small',
    label: 'small',
  },
  {
    value: 'medium',
    label: 'medium',
  },
];

export interface ISidebarItems {
  id: string;
  label: string;
}

export const sidebarItems: ISidebarItems[] = [
  { id: uuid(), label: 'ورودی ها' },
  { id: uuid(), label: 'متن ها' },
  { id: uuid(), label: 'x' },
];

export interface ISidebarPopoverItems {
  id: string;
  type: string;
  uniqueName: string;
  elType: string;
  properties?: any;
  validations?: any;
}

export const popoverItems: ISidebarPopoverItems[] = [
  {
    id: uuid(),
    uniqueName: '',
    type: 'text-box',
    elType: 'ورودی ها',
    properties: {
      inputVariant: 'outlined',
      inputFlex: '12',
      inputLabel: ``,
      inputPlaceholder: ``,
    },
    validations: {
      required: {
        value: true,
        message: 'این فیلد الزامی است',
      },
      min: {
        value: 1,
        message: 'کمتر از یک کاراکتر نباشد',
      },
      max: {
        value: 20,
        message: 'بیشتر از بیست کاراکتر نباشد',
      },
    },
  },
  {
    id: uuid(),
    type: 'text-area-box',
    uniqueName: '',
    elType: 'ورودی ها',
    properties: {
      inputVariant: 'outlined',
      inputFlex: '12',
      inputLabel: ``,
      inputPlaceholder: ``,
      minRows: '2',
      maxRows: '12',
    },
    validations: {
      required: {
        value: true,
        message: 'این فیلد الزامی است',
      },
      min: {
        value: 1,
        message: 'کمتر از یک کاراکتر نباشد',
      },
      max: {
        value: 20,
        message: 'بیشتر از بیست کاراکتر نباشد',
      },
    },
  },
  {
    id: uuid(),
    uniqueName: '',
    type: 'time-box',
    elType: 'ورودی ها',
    properties: {
      hourly: {
        inputSize: 'medium',
        calender: {
          inputLabel: ``,
          inputVariant: 'outlined',
          requiredMessage: 'این فیلد الزامی است',
        },
        from: {
          inputLabel: ``,
          inputVariant: 'outlined',
        },
        to: {
          inputLabel: ``,
          inputVariant: 'outlined',
        },
      },
      daily: {
        inputSize: 'medium',
        from: {
          inputLabel: '',
          inputVariant: 'outlined',
          requiredMessage: 'این فیلد الزامی است',
        },
        to: {
          inputLabel: '',
          inputVariant: 'outlined',
          requiredMessage: 'این فیلد الزامی است',
        },
      },
    },
    validations: {
      hourly: {
        calender: {
          isRequired: true,
          isPastDisabled: true,
          isFutureDisabled: false,
          disabledPastDays: 0,
          disabledFutureDays: 0,
          disabledDays: [],
          errorMessages: {
            requiredMessage: 'این فیلد الزامی است',
            disablePast: 'زمان گذشته معتبر نمی باشد',
            maxDate: 'زمان آینده معتبر نمی باشد',
            minDate: 'زمان گذشته معتبر نمی باشد',
            invalidDate: 'زمان واردشده معتبر نمی باشد',
          },
        },
        from: {
          isRequired: true,
          disabledTimeTo: {
            hours: 18,
            minutes: 30,
          },
          disabledTimeFrom: {
            hours: 8,
            minutes: 0,
          },
          ampm: true,
          errorMessages: {
            requiredMessage: 'این فیلد الزامی است',
            minTime: 'تاریخ معتبر نمی باشد',
            maxTime: 'زمان معتبر نمی باشد',
            invalidDate: 'تاریخ واردشده معتبر نمی باشد',
          },
        },
        to: {
          isRequired: true,
          disabledTimeTo: {
            hours: 18,
            minutes: 30,
          },
          disabledTimeFrom: {
            hours: 8,
            minutes: 0,
          },
          ampm: true,
          errorMessages: {
            requiredMessage: 'این فیلد الزامی است',
            minTime: 'تاریخ معتبر نمی باشد',
            maxTime: 'زمان معتبر نمی باشد',
            invalidDate: 'تاریخ واردشده معتبر نمی باشد',
          },
        },
      },
      daily: {
        from: {
          isRequired: true,
          isPastDisabled: true,
          isFutureDisabled: false,
          disabledPastDays: 0,
          disabledFutureDays: 0,
          disabledDays: [],
          errorMessages: {
            requiredMessage: 'این فیلد الزامی است',
            disablePast: 'تاریخ گذشته معتبر نمی باشد',
            maxDate: 'تاریخ آینده معتبر نمی باشد',
            minDate: 'تاریخ گذشته معتبر نمی باشد',
            invalidDate: 'تاریخ واردشده معتبر نمی باشد',
            shouldDisableDate: 'روزهای غیرمجاز',
          },
        },
        to: {
          isRequired: true,
          isPastDisabled: true,
          isFutureDisabled: false,
          disabledPastDays: 0,
          disabledFutureDays: 0,
          disabledDays: [],
          errorMessages: {
            requiredMessage: 'این فیلد الزامی است',
            disablePast: 'تاریخ گذشته معتبر نمی باشد',
            maxDate: 'تاریخ آینده معتبر نمی باشد',
            minDate: 'تاریخ گذشته معتبر نمی باشد',
            invalidDate: 'تاریخ واردشده معتبر نمی باشد',
            shouldDisableDate: 'روزهای غیرمجاز',
          },
        },
      },
    },
  },
  {
    id: uuid(),
    uniqueName: '',
    type: 'head-title',
    elType: 'متن ها',
    properties: { textVariant: 'h3', color: 'inherit', content: '' },
  },
  {
    id: uuid(),
    uniqueName: '',
    type: 'divider',
    elType: 'x',
  },
];
