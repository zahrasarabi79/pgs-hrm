import { FC } from 'react';
import { LayoutWrapper } from '@/form-builder/components/LayoutWrapper';
import { ChildrenProps } from '@/components/shared/ITypes';

const FormBuilderLayout: FC<ChildrenProps> = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};
export default FormBuilderLayout;
