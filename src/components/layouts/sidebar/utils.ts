import MuiDrawer from '@mui/material/Drawer';
import { styled, Theme, CSSObject } from '@mui/material/styles';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#555555',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      borderRight: 'none',
      '& .drawer-content': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
      '& .drawer-button': {
        marginTop: 'auto',
      },
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      borderRight: 'none',
      '& .drawer-content': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
      '& .drawer-button': {
        marginTop: 'auto',
      },
    },
  }),
}));
const SubItemButtonStyles = (theme: Theme) => {
  return {
    pl: 4,
    mx: 2,
    borderRadius: '25px',
    '& .MuiTypography-root': {
      fontSize: '12px !important',
    },
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.light,
    },
  };
};
const DefaultItemStyles = (open: boolean, theme: Theme) => {
  return {
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    borderRadius: '25px',
    py: 1,
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.light,
    },
  };
};
const SelectedSidebarItemStyles = (open: boolean) => {
  return {
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    borderRadius: '25px',
    py: 1,
    px: 2,
    '&.Mui-selected': {
      backgroundColor: 'rgba(255, 255, 255, 0.20)',
      borderRadius: '25px',
    },
  };
};

const SidebarIConStyles = (open: boolean) => {
  return {
    minWidth: 0,
    mr: open ? 2.25 : 'auto',
    justifyContent: 'center',
  };
};

export {
  DrawerHeader,
  Drawer,
  SubItemButtonStyles,
  SidebarIConStyles,
  SelectedSidebarItemStyles,
  DefaultItemStyles,
};
