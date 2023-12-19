import React, { FC, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Divider, Skeleton, Stack } from '@mui/material';
import Icon from '@/components/shared/Icon';
import { HeaderMenuProps } from '@/types/component-types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useGetProfileQuery, useLogoutMutation } from '@/state-management/apis/authApi';
import { useAppDispatch } from '@/state-management/store/store';
import { setCredentials } from '@/state-management/slices/authSlice';

const HeaderMenu: FC<HeaderMenuProps> = ({ anchorEl, setAnchorEl }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const [logout, { isSuccess }] = useLogoutMutation();
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout({}).unwrap();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials({ access_token: null, refresh_token: null }));
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      router.replace('/login');
    }
  }, [isSuccess, Cookies, router]);

  const { data: profileData, isLoading } = useGetProfileQuery();
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            gap: 2,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Stack direction={'row'}>
            {isLoading ? (
              <Skeleton variant="text" width={100} />
            ) : (
              <>
                <Avatar alt="logo-picture" src={profileData?.data.profileImage} />
                <span>
                  {profileData?.data.firstname} {profileData?.data.lastname}
                </span>
              </>
            )}
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseMenu}>
          <Stack direction={'row'} gap={1}>
            <Icon pathName={'linear/key.svg'} />
            <span>تغییر رمز کاربری</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Stack direction={'row'} gap={1}>
            <Icon pathName={'linear/logout.svg'} />
            <span>خروج</span>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderMenu;
