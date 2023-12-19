import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { DefaultItemStyles, SelectedSidebarItemStyles, SidebarIConStyles } from './utils';
import useCustomSidebarHook from '@/components/hooks/UseSidebarOpen';
import Icon from '@/components/shared/Icon';
import { ISidebar, SidebarItems, SimpleSidebarItem } from '@/public/data/sidebaritems';
import { IconNames } from '@/components/shared/ITypes';
import SidebarSubItems from '@/components/layouts/sidebar/SidebarSubItems';

export interface SidebarItemProps {
  item: SidebarItems;
  currentRoute: string;
  open: boolean;
  openItems: string[];
  params: string;
  setOpenItems: Dispatch<SetStateAction<string[]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  totalSidebarItems: ISidebar;
}

const SidebarItem: FC<SidebarItemProps> = ({
  item,
  currentRoute,
  open,
  openItems,
  params,
  setOpenItems,
  setOpen,
  setMobileOpen,
  totalSidebarItems,
}) => {
  const theme = useTheme();
  const [parentCollapsed, setParentCollapsed] = useState(false);

  const router = useRouter();

  const handleItemClickInternal = () => {
    const newItem: SidebarItems = item; // Assert item as SidebarGroupItem

    const hasChildren =
      newItem._ === 'SidebarGroupItem' && newItem.items && newItem.items.length > 0;
    const itemIsOpen = openItems.includes(newItem.name);

    if (hasChildren) {
      setOpen(true);
      // Handle the open/close behavior of subItems
      setParentCollapsed(itemIsOpen);
      setOpenItems(
        itemIsOpen
          ? openItems.filter((openItem) => openItem !== newItem.name) // If the clicked item is already open, remove it from openItems to close it
          : [...openItems, newItem.name], // If the clicked item is closed, add it to openItems to open it
      );
    }

    if (newItem._ === 'SidebarItem' && newItem.route) {
      router.push(`/${newItem.route}`);
    }
  };

  const isActiveItem = (item: SidebarItems | SimpleSidebarItem): boolean => {
    if (item._ === 'SidebarItem' && item.route) {
      return currentRoute?.includes(item.route) ?? false; // Active when currentRoute includes item.route
    }
    if ('items' in item) {
      return item.items?.some(isActiveItem) ?? false; // If parent item has children, check if any child is selected
    }

    return false; // Default case: No child is selected, not active
  };
  useCustomSidebarHook({
    open,
    currentRoute,
    openItems,
    item,
    setOpenItems,
    setParentCollapsed,
    totalSidebarItems,
  });
  return (
    <>
      <ListItem disablePadding sx={{ display: 'block', px: 1 }}>
        <ListItemButton
          selected={(parentCollapsed && isActiveItem(item)) || (!item.items && isActiveItem(item))}
          role={params === item.route ? 'active-item' : undefined}
          onClick={handleItemClickInternal}
          sx={
            parentCollapsed && isActiveItem(item)
              ? SelectedSidebarItemStyles(open)
              : DefaultItemStyles(open, theme)
          }
        >
          <ListItemIcon sx={SidebarIConStyles(open)}>
            <Icon
              size={20}
              pathName={item.icon as IconNames}
              color={
                item._ !== 'SidebarGroupItem' && isActiveItem(item)
                  ? theme.palette.primary.light
                  : 'white'
              }
            />
          </ListItemIcon>
          <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          {item._ === 'SidebarGroupItem' && open && (
            <Stack
              sx={{
                transition: 'transform 0.2s ease-in-out',
                transform: openItems.includes(item.name) ? 'rotate(-90deg)' : 'rotate(0deg)',
              }}
            >
              <Icon pathName="linear/little-left-arrow.svg" />
            </Stack>
          )}
        </ListItemButton>
      </ListItem>
      {item._ === 'SidebarGroupItem' && (
        <SidebarSubItems
          setMobileOpen={setMobileOpen}
          openItems={openItems}
          item={item}
          isActiveItem={isActiveItem}
          params={params}
        />
      )}
    </>
  );
};

export default SidebarItem;
