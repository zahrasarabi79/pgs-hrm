'use client';
import React, { FC, ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Drawer as DrawerDesktop, DrawerHeader } from './utils';
import Link from 'next/link';
import Image from 'next/image';
import { useActiveItem } from '@/components/hooks/UseActive';
import Icon from '@/components/shared/Icon';
import { ISidebar } from '@/public/data/sidebaritems';
import HeaderComponent from '@/components/layouts/Header';
import SidebarItem from '@/components/layouts/sidebar/SidebarItem';

interface ChildrenProps {
  children: ReactNode;
}

export interface SidebarProps extends ChildrenProps {
  sidebarItems: ISidebar;
  isLoading: boolean;
}

const Sidebar: FC<SidebarProps> = ({ children, sidebarItems, isLoading }) => {
  const router = useRouter();
  const params = usePathname();
  const currentRoute = params;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(true);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const drawerWidth = { desktop: 260, mobile: 60 };
  useActiveItem(setOpen, setOpenItems);
  const theme = useTheme();

  const handleMobileSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const headerIcon = (
    <Toolbar
      sx={{
        d: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        pt: '25px',
        width: open ? drawerWidth.desktop : drawerWidth.mobile,
        bgcolor: 'background.paper',
        zIndex: 2,
        transition: `width 0.25s ${theme.transitions.easing.easeInOut}`,
      }}
    >
      <Link href={'/dashboard'}>
        <Image
          onClick={() => router.push('/dashboard')}
          priority
          alt="Logo"
          src="/logo.svg"
          width={40}
          height={40}
          style={{ margin: 'auto' }}
        />
      </Link>
      <Stack
        sx={{
          py: 0,
          opacity: open ? 1 : 0,
          transition: 'all 0.1s 0.05s ease-in-out',
        }}
      >
        <Typography variant="subtitle2">مدیریت منابع انسانی</Typography>
      </Stack>
    </Toolbar>
  );

  const sidebarList = (
    <>
      {headerIcon}
      <List sx={{ mt: open ? 14 : 11, mb: 6, transition: 'all 0.2s ease-in-out' }}>
        {isLoading ? (
          <Stack spacing={1.5} sx={{ ml: 2 }}>
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                sx={{ borderRadius: '50px' }}
                width={200}
                height={40}
              />
            ))}
          </Stack>
        ) : (
          sidebarItems.items.map((item) => (
            <SidebarItem
              key={item.name}
              setOpen={setOpen}
              setMobileOpen={setMobileOpen}
              item={item}
              currentRoute={currentRoute}
              open={open || mobileOpen}
              openItems={openItems}
              params={params}
              setOpenItems={setOpenItems}
              totalSidebarItems={sidebarItems}
            />
          ))
        )}
      </List>
    </>
  );
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const openCloseArrow = (
    <DrawerHeader
      sx={{
        position: 'fixed',
        bottom: 0,
        bgcolor: 'background.paper',
        width: mobileOpen || open ? drawerWidth.desktop : drawerWidth.mobile,
        zIndex: 2,
        transition: `width 0.25s ${theme.transitions.easing.easeInOut}`,
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        {/* version */}
        {/* <span>
          {process.env.NEXT_PUBLIC_VERSION} ({process.env.NEXT_PUBLIC_BUILD_NUMBER})
        </span> */}
        <IconButton
          onClick={() => {
            setMobileOpen(smDown && !mobileOpen);
            setOpen(!open);
          }}
          data-testid="close-btn"
        >
          <Stack
            sx={{
              transition: 'transform .4s ease-in-out',
              transform: mobileOpen || open ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          >
            <Icon pathName="linear/arrow-right.svg" />
          </Stack>
        </IconButton>
      </Stack>
    </DrawerHeader>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderComponent
        open={open}
        drawerWidth={drawerWidth}
        handleMobileSidebarToggle={handleMobileSidebarToggle}
      />
      <Box component="nav" sx={{ flexShrink: { sm: 0 } }}>
        {/* mobile sidebar */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileSidebarToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth.desktop,
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))',
            },
          }}
        >
          {sidebarList}
          {openCloseArrow}
        </Drawer>
        {/* desktop sidebar */}
        <DrawerDesktop
          variant="permanent"
          onClose={() => setOpen(!open)}
          open={open}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {sidebarList}
          {openCloseArrow}
        </DrawerDesktop>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: {
            xs: 0,
            sm: 3,
          },
          mt: 8,
          width: open
            ? `calc(100% - ${drawerWidth.desktop}px)`
            : `calc(100% - ${drawerWidth.mobile}px)`,
        }}
      >
        {/*<Card cardStyles={{ flexGrow: 1, px: 2, py: '8px', mb: 2, borderRadius: '8px' }}>*/}
        {/*  /!*<BreadCrumb />*!/*/}
        {/*</Card>*/}
        <Container disableGutters maxWidth={false}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
export default Sidebar;
