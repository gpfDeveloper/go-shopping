import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { createTheme } from '@mui/material/styles';

import React, { useEffect, useState } from 'react';
import { getError } from 'utils/error';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Container } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ title, description, children }) {
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },

    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      primary: {
        main: '#9562ED',
      },
    },
  });

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setIsSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setIsSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Head>
        <title>{title ? `${title} - Go Shopping` : 'Go Shopping'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Sidebar
          isVisiable={isSidebarVisible}
          onClose={sidebarCloseHandler}
          categories={categories}
        />
        <Header onSidebarOpen={sidebarOpenHandler} />
        <Container
          component="main"
          sx={{
            marginTop: 2,
            minHeight: '80vh',
          }}
        >
          {children}
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
}
