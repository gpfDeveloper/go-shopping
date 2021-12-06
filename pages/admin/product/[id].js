import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getSlug } from 'utils';
import React, { useEffect, useContext, useReducer, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  TextField,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { getError } from 'utils/error';
import { Store } from 'store/Store';
import Layout from 'components/layouts/Layout';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Form from 'components/UIs/Form';
import AdminNav from 'components/admin/AdminNav';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    case 'UPLOAD_FEATURED_REQUEST':
      return { ...state, loadingFeaturedUpload: true, errorUpload: '' };
    case 'UPLOAD_FEATURED_SUCCESS':
      return {
        ...state,
        loadingFeaturedUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FEATURED_FAIL':
      return {
        ...state,
        loadingFeaturedUpload: false,
        errorUpload: action.payload,
      };

    default:
      return state;
  }
}

function ProductEdit() {
  const router = useRouter();
  const productId = router.query.id;
  const { state } = useContext(Store);
  const [
    { loading, error, loadingUpdate, loadingUpload, loadingFeaturedUpload },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isFeatured, setIsFeatured] = useState(false);
  const { userInfo } = state;

  const [productName, productCategory, productBrand] = watch([
    'name',
    'category',
    'brand',
  ]);
  if (productName && productCategory && productBrand) {
    const slug = getSlug(productName, productCategory, productBrand);
    setValue('slug', slug);
  }

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('price', data.price);
        setValue('image', data.image);
        setValue('featuredImage', data.featuredImage);
        setIsFeatured(data.isFeatured);
        setValue('category', data.category);
        setValue('brand', data.brand);
        setValue('countInStock', data.countInStock);
        setValue('description', data.description);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [productId]);
  if (!userInfo) {
    router.push('/login');
    return <CircularProgress />;
  }
  if (!userInfo.isAdmin) {
    router.push('/');
    return <CircularProgress />;
  }
  const uploadHandler = async (e, imageField = 'image') => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      if (imageField === 'image') {
        dispatch({ type: 'UPLOAD_REQUEST' });
      } else {
        dispatch({ type: 'UPLOAD_FEATURED_REQUEST' });
      }
      const { data } = await axios.post('/api/admin/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (imageField === 'image') {
        dispatch({ type: 'UPLOAD_SUCCESS' });
      } else {
        dispatch({ type: 'UPLOAD_FEATURED_SUCCESS' });
      }
      setValue(imageField, data.secure_url);
      enqueueSnackbar('File uploaded successfully', { variant: 'success' });
    } catch (err) {
      if (imageField === 'image') {
        dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      } else {
        dispatch({ type: 'UPLOAD_FEATURED_FAIL', payload: getError(err) });
      }
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const submitHandler = async ({
    name,
    price,
    category,
    slug,
    image,
    featuredImage,
    brand,
    countInStock,
    description,
  }) => {
    closeSnackbar();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/admin/products/${productId}`,
        {
          name,
          slug,
          price,
          category,
          image,
          isFeatured,
          featuredImage,
          brand,
          countInStock,
          description,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      enqueueSnackbar('Product updated successfully', { variant: 'success' });
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <AdminNav path="products" />
        </Grid>
        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Product ID: {productId}
                </Typography>
              </ListItem>
              <ListItem>
                {loading && <CircularProgress></CircularProgress>}
                {error && <Typography color="error">{error}</Typography>}
              </ListItem>
              <ListItem>
                <Form onSubmit={handleSubmit(submitHandler)}>
                  <List>
                    <ListItem>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            label="Name"
                            error={Boolean(errors.name)}
                            helperText={errors.name ? 'Name is required' : ''}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="category"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="category"
                            label="Category"
                            error={Boolean(errors.category)}
                            helperText={
                              errors.category ? 'Category is required' : ''
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="brand"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="brand"
                            label="Brand"
                            error={Boolean(errors.brand)}
                            helperText={errors.brand ? 'Brand is required' : ''}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="slug"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            disabled
                            id="slug"
                            label="Slug"
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="price"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="price"
                            label="Price"
                            error={Boolean(errors.price)}
                            helperText={errors.price ? 'Price is required' : ''}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="image"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="image"
                            label="Image"
                            error={Boolean(errors.image)}
                            helperText={errors.image ? 'Image is required' : ''}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" onChange={uploadHandler} hidden />
                      </Button>
                      {loadingUpload && <CircularProgress />}
                    </ListItem>
                    <ListItem>
                      <FormControlLabel
                        label="Is Featured"
                        control={
                          <Checkbox
                            onClick={(e) => setIsFeatured(e.target.checked)}
                            checked={isFeatured}
                            name="isFeatured"
                          />
                        }
                      ></FormControlLabel>
                    </ListItem>
                    {isFeatured && (
                      <>
                        <ListItem>
                          <Controller
                            name="featuredImage"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="featuredImage"
                                label="Featured Image"
                                error={Boolean(errors.featuredImage)}
                                helperText={
                                  errors.featuredImage
                                    ? 'Featured Image is required'
                                    : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Button variant="contained" component="label">
                            Upload Featured Image
                            <input
                              type="file"
                              onChange={(e) =>
                                uploadHandler(e, 'featuredImage')
                              }
                              hidden
                            />
                          </Button>
                          {loadingFeaturedUpload && <CircularProgress />}
                        </ListItem>
                      </>
                    )}
                    <ListItem>
                      <Controller
                        name="countInStock"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="countInStock"
                            label="Count in stock"
                            error={Boolean(errors.countInStock)}
                            helperText={
                              errors.countInStock
                                ? 'Count in stock is required'
                                : ''
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            id="description"
                            label="Description"
                            error={Boolean(errors.description)}
                            helperText={
                              errors.description
                                ? 'Description is required'
                                : ''
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                      >
                        Update
                      </Button>
                      {loadingUpdate && <CircularProgress />}
                    </ListItem>
                  </List>
                </Form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(ProductEdit), { ssr: false });
