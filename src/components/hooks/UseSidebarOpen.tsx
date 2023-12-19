import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { ISidebar } from '@/public/data/sidebaritems';

export interface useCustomSidebarHookProps {
  open: boolean;
  currentRoute: string;
  openItems: string[];
  item: any;
  setOpenItems: Dispatch<SetStateAction<string[]>>;
  setParentCollapsed: Dispatch<SetStateAction<boolean>>;
  totalSidebarItems: ISidebar;
}

const useCustomSidebarHook = ({
  open,
  currentRoute,
  openItems,
  item,
  setOpenItems,
  setParentCollapsed,
  totalSidebarItems,
}: useCustomSidebarHookProps) => {
  useEffect(() => {
    if (!open) {
      // If the parent is being collapsed, check if it is in the openItems array
      // If it is, remove it from the openItems array
      if (openItems.includes(item.title)) {
        setOpenItems((prevOpenItems: string[]) =>
          prevOpenItems.filter((openItem) => openItem !== item.title),
        );
      }
      // Collapse all other parent items with open children
      const filteredOpenItems = openItems.filter((prevOpenItem) => {
        const parentItem = totalSidebarItems.items.find(
          (sidebarItem) => sidebarItem.name === prevOpenItem,
        );
        return !parentItem || !parentItem.items || parentItem.items.length === 0;
      });
      setOpenItems(filteredOpenItems);
      setParentCollapsed(true);
    } else {
      setParentCollapsed(false);
      // Check if the currentRoute matches any of the sidebarItems
      const activeItem = totalSidebarItems.items.find((item) => {
        if (item.route) {
          return currentRoute.includes(item.route);
        }
        if (item.items) {
          return item.items.some((child) => currentRoute.includes(`/${child.route}`));
        }
        return false;
      });

      if (activeItem) {
        setOpenItems([...openItems, activeItem.name]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentRoute]);
};

export default useCustomSidebarHook;
