'use client';
import React, { FC, ReactNode } from 'react';
import Sidebar from '@/components/layouts/sidebar/Sidebar';
import { useGetSidebarItemsQuery } from '@/state-management/apis/sidebarApi';
import { SidebarItems, sidebarItemsMap, transformSidebarData } from '@/public/data/sidebaritems';
interface ChildrenProps {
  children: ReactNode;
}

const MainLayout: FC<ChildrenProps> = ({ children }) => {
  const { data, isLoading } = useGetSidebarItemsQuery();

  return (
    <Sidebar
      isLoading={isLoading}
      sidebarItems={transformSidebarData(data?.data as SidebarItems[], sidebarItemsMap)}
    >
      {children}
    </Sidebar>
  );
};

export default MainLayout;
