import React, { ReactNode } from 'react';
import TextBox from '@/form-builder/elements/TextBox';
import TextAreaBox from '@/form-builder/elements/TextAreaBox';
import HeadTitle from '@/form-builder/elements/HeadTitle';
import TimeBox from '@/form-builder/elements/TimeBox';
import Divider from '@/form-builder/elements/Divider';
import { ViewProps } from '@/form-builder/elements/Element';

export type IRenderView = (args: ViewProps) => ReactNode;

const renderElement: IRenderView = ({ item, control, index, errors, watch }) => {
  switch (item.type) {
    case 'text-box':
      return <TextBox control={control} index={index} errors={errors} />;
    case 'text-area-box':
      return <TextAreaBox control={control} index={index} errors={errors} />;
    case 'head-title':
      return <HeadTitle index={index} />;
    case 'time-box':
      return <TimeBox control={control} index={index} errors={errors} watch={watch} />;
    case 'divider':
      return <Divider />;
    default:
      return null;
  }
};

export default renderElement;
