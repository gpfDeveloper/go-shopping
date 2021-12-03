import { useState, useContext } from 'react';
import router from 'next/router';
import Cookies from 'js-cookie';
import { Button, Menu, MenuItem } from '@mui/material';
import { Store } from 'store/Store';

export default function UserMenu() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const userClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const userMenuCloseHandler = (e, redirectPath) => {
    setAnchorEl(null);
    if (redirectPath && redirectPath !== 'backdropClick') {
      router.push(redirectPath);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippinhAddress');
    Cookies.remove('paymentMethod');
    router.push('/');
  };
  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={userClickHandler}
        sx={{
          color: '#ffffff',
          textTransform: 'initial',
        }}
      >
        {userInfo.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={userMenuCloseHandler}
      >
        <MenuItem onClick={(e) => userMenuCloseHandler(e, '/profile')}>
          Profile
        </MenuItem>
        <MenuItem onClick={(e) => userMenuCloseHandler(e, '/order-history')}>
          Order Hisotry
        </MenuItem>
        {userInfo.isAdmin && (
          <MenuItem
            onClick={(e) => userMenuCloseHandler(e, '/admin/dashboard')}
          >
            Admin Dashboard
          </MenuItem>
        )}
        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
}
