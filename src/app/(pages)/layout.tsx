import { FC } from 'react';
import { ChildrenProps } from '@/components/shared/ITypes';
import SidebarWrapper from '@/components/layouts/SidebarWrapper';

const HrmSidebarLayout: FC<ChildrenProps> = ({ children }) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};
export default HrmSidebarLayout;
