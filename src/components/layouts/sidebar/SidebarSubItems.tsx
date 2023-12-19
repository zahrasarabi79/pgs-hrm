import { Dispatch, FC, SetStateAction } from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { SubItemButtonStyles } from '@/components/layouts/sidebar/utils';
import { useTheme } from '@mui/material/styles';
import { SidebarItems, SimpleSidebarItem } from '@/public/data/sidebaritems';
import Link from 'next/link';

export interface SidebarSubItemsProps {
  item: SidebarItems;
  isActiveItem(item: SimpleSidebarItem): boolean;
  openItems: string[];
  params: string;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarSubItems: FC<SidebarSubItemsProps> = ({
  item,
  params,
  isActiveItem,
  openItems,
  setMobileOpen,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickSubItem = () => {
    // router.push(child.route ? `/${child.route}` : '');
    if (smDown) {
      setMobileOpen(false);
    }
  };

  return (
    <Collapse
      in={openItems.includes(item.name)}
      timeout="auto"
      unmountOnExit
      data-testid="collapse"
    >
      <List component="div" disablePadding>
        {item.items?.map((child) => (
          <Link key={child.route} href={child.route ? `/${child.route}` : ''}>
            <ListItem
              sx={{ py: 0 }}
              onClick={() => {
                handleClickSubItem();
              }}
            >
              <ListItemButton
                sx={SubItemButtonStyles(theme)}
                selected={isActiveItem(child)}
                role={params === child.route ? 'active-item' : undefined}
              >
                <ListItemText primary={child.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Collapse>
  );
};

export default SidebarSubItems;
