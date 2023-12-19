import React, { FC } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, Drawer, IconButton, Stack, Toolbar } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import { ChildrenProps } from '@/components/shared/ITypes';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { sidebarItems } from '@/public/data/otherData';
import FormBuilderSidebarItem from '@/form-builder/components/FormBuilderSidebarItem';
import { setOpenProperties } from '@/state-management/slices/propertiesSlice';
import { onDragEnd } from '@/form-builder/utils/dragHelper';

const drawerWidth = 240;

const FormBuilderDrawer: FC<ChildrenProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);
  const elType = useAppSelector((state) => state.sidebarElementType.sidebarElementType);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = sidebarItems.map((item, index) => (
    <FormBuilderSidebarItem key={item.id} sidebarItem={item} index={index} />
  ));

  const handleFormData = () => {};

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, properties, elType, dispatch)}>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            direction: 'rtl',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: '50px',
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ minHeight: '50px !important' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack direction="row" gap={1}>
              <Button onClick={handleFormData}>ثبت فرم</Button>
              <Button onClick={() => dispatch(setOpenProperties(!properties.openProperties))}>
                {!properties.openProperties ? 'نمایش بخش تنظیمات' : 'مخفی کردن بخش تنظیمات'}
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="items"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Container
            disableGutters
            maxWidth={false}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </DragDropContext>
  );
};

export default FormBuilderDrawer;
