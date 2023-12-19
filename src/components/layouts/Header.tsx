import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Stack, Tooltip, useTheme } from '@mui/material';
import Icon from '@/components/shared/Icon';
import HeaderMenu from '@/components/shared/HeaderMenu';
import { HeaderComponentProps } from '@/types/component-types';

const HeaderComponent: FC<HeaderComponentProps> = ({
  open,
  handleMobileSidebarToggle,
  drawerWidth,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          sm: open
            ? `calc(100% - ${drawerWidth.desktop}px)`
            : `calc(100% - ${drawerWidth.mobile}px)`,
        },
        ml: `${drawerWidth.desktop}px`,
        transition: 'all 0.25s ease-in-out',
        bgcolor: theme.palette.background.default,
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ justifyContent: { xs: 'space-between', sm: 'flex-end' } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleMobileSidebarToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Icon pathName="linear/menu.svg" />
        </IconButton>
        {/*<MainHeader-items />*/}
        <Stack direction={'row'} gap={2}>
          <IconButton>
            <Icon pathName={'linear/notification.svg'} />
          </IconButton>
          <Tooltip title="پروفایل">
            <IconButton onClick={handleClick}>
              <Icon pathName={'linear/profile.svg'} />
            </IconButton>
          </Tooltip>
        </Stack>
        <HeaderMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
