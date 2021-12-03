import NextLink from 'next/link';
import { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Box,
  useMediaQuery,
} from '@mui/material';
import UserMenu from 'components/UIs/UserMenu';
import SidebarMenu from 'components/UIs/SidebarMenu';
import Brand from 'components/UIs/Brand';
import Cart from 'components/UIs/Cart';
import { Store } from 'store/Store';
import SearchBar from 'components/UIs/SearchBar';

export default function Header({ onSidebarOpen }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const isDesktop = useMediaQuery('(min-width:600px)');
  let flexDirection;
  if (isDesktop) {
    flexDirection = 'row';
  } else {
    flexDirection = 'column';
  }
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#342c44',
        '& a': {
          color: '#ffffff',
          marginLeft: 1,
        },
        padding: isDesktop ? '' : '1rem 0',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          flexDirection,
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SidebarMenu onClick={onSidebarOpen} />
          <Brand />
        </Box>
        <SearchBar />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {userInfo ? (
            <UserMenu />
          ) : (
            <NextLink href="/login" passHref>
              <Link>
                <Typography component="span">Login</Typography>
              </Link>
            </NextLink>
          )}
          <Cart />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
