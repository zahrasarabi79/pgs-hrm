import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { sidebarItems } from '@/public/data/sidebaritems';

export const useActiveItem = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setOpenItems: Dispatch<SetStateAction<string[]>>,
) => {
  const currentRoute = usePathname();

  useEffect(() => {
    const activeItem = sidebarItems.items.find((item) => {
      if (item.items) {
        return item.items.some((child) => `/${child.route}` === currentRoute);
      }
      return false;
    });

    if (activeItem) {
      if (activeItem.items && activeItem.items.length > 0) {
        setOpen(true);
        setOpenItems([activeItem.name]);
      } else {
        setOpen(false);
        setOpenItems([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute]);
  return null;
};
