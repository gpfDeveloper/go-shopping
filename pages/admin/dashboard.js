import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useContext, useReducer } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { getError } from 'utils/error';
import { Store } from 'store/Store';
import Layout from 'components/layouts/Layout';
import AdminNav from 'components/admin/AdminNav';
import AdminNavCard from 'components/admin/AdminNavCard';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
  const { state } = useContext(Store);
  const router = useRouter();

  const { userInfo } = state;

  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  if (!userInfo) {
    router.push('/login');
    return <CircularProgress />;
  }
  if (!userInfo.isAdmin) {
    router.push('/');
    return <CircularProgress />;
  }
  return (
    <Layout title="Admin Dashboard">
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <AdminNav path="dashboard" />
        </Grid>
        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography color="error">{error}</Typography>
                ) : (
                  <Grid container spacing={5}>
                    <Grid item md={3}>
                      <AdminNavCard
                        categoryName="Sales"
                        categoryValue={summary.ordersPrice}
                        href="/admin/orders"
                        buttonText="View sales"
                      />
                    </Grid>
                    <Grid item md={3}>
                      <AdminNavCard
                        categoryName="Orders"
                        categoryValue={summary.ordersCount}
                        href="/admin/orders"
                        buttonText="View orders"
                      />
                    </Grid>
                    <Grid item md={3}>
                      <AdminNavCard
                        categoryName="Products"
                        categoryValue={summary.productsCount}
                        href="/admin/products"
                        buttonText="View products"
                      />
                    </Grid>
                    <Grid item md={3}>
                      <AdminNavCard
                        categoryName="Users"
                        categoryValue={summary.usersCount}
                        href="/admin/users"
                        buttonText="View users"
                      />
                    </Grid>
                  </Grid>
                )}
              </ListItem>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Sales Chart
                </Typography>
              </ListItem>
              <ListItem>
                <Bar
                  data={{
                    labels: summary.salesData.map((x) => x._id),
                    datasets: [
                      {
                        label: 'Sales',
                        backgroundColor: '#9562ED',
                        data: summary.salesData.map((x) => x.totalSales),
                      },
                    ],
                  }}
                  options={{
                    legend: { display: true, position: 'right' },
                  }}
                ></Bar>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
