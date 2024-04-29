import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './home.module.css';
import Navbar from '../Navbar/Navbar';
import Statistic from '../Statistic/Statistic';
import { useForm } from 'react-hook-form';
import {
  addProductAction,
  deleteProductAction,
  fetchCategoriesAction,
  fetchMaterialAction,
  fetchProductsAction,
  updateProductAction,
} from '../../apiService';

const Home = () => {
  const dispatch = useDispatch();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const {
    products,
    categories = [],
    material: allMaterials,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchCategoriesAction());
    dispatch(fetchMaterialAction());
  }, []);

  const { watch, setValue } = useForm({
    defaultValues: {
      sku: '',
      product_name: '',
      product_media: [],
      category: '',
      category_id:"",
      material: [],
      price: '',
      product_id:""
    },
    mode: 'all',
  });
  const {product_id,category_id, sku, product_name, product_media, category, material, price } =
    watch();

  const [open, setOpen] = useState({ isOpen: false, mode: '', data: null });
  const [materials, setMaterials] = useState([]);
  const [urls, setUrls] = useState([]);
  const handleAddOpen = () => {
    setOpen({ isOpen: true, mode: 'Add', data: null });
    setValue("sku",null)
    setValue("product_name",null )
    setValue("product_media",null )
    setValue("category", null)
    setValue('category_id', null);
    setValue("material",null)
    setValue("price", null )
    setValue("product_id", null )
  };
  const handleClose = () => setOpen({ isOpen: false, mode: 'Add', data: null });
  const editCategoryCell = ({ row }) => {
    console.log(95,row)
    const handleEditOpen = () => {
      setOpen({ isOpen: true, mode: 'Edit', data: null });
      setValue('sku', row.sku);
      setValue('product_name', row.product_name);
      setValue('product_media', row.media);
      setValue('category', row.category_name);
      setValue('category_id', row.category_id);
      setValue('material', [row.materials]);
      setValue('price', row.product_price);
      setValue('product_id', row.product_id);
    };
    return (
      <Button onClick={handleEditOpen} variant='contained'>
        Edit
      </Button>
    );
  };
  const handleProductAdd = () => {
    const data = {
      sku: sku,
      productName: product_name,
      price: Number(price),
      categoryId: category_id,
      materials: material,
      media: urls,
      onSuccess: () => setOpen({ isOpen: false }),
    };
    dispatch(addProductAction(data));
  };

  const handleProductUpdate = () => {
    const data = {
      sku: sku,
      productName: product_name,
      price: Number(price),
      categoryId: category,
      materials: material,
      media: urls,
      product_id:product_id,
      onSuccess: () => setOpen({ isOpen: false }),
    };
    dispatch(updateProductAction(data));
  }
  const handleMaterialChange = (e) => {
    setMaterials(e.target.value);
    setValue('material', e.target.value);
  };

  const handleMediaChange = (e) => {
    const newUrl = e.target.value;
    const splitUrl = newUrl.split(',');
    setUrls(splitUrl);
    setValue('product_media', e.target.value);
  };
  const DeleteProductCell = ({ row }) => {
    const handleDeleteCategory = () => {
      dispatch(deleteProductAction(row.product_id));
    };
    return (
      <Button
        onClick={handleDeleteCategory}
        size='small'
        variant='contained'
        color='error'
      >
        Delete
      </Button>
    );
  };

  const columns = [
    { field: 'sku', headerName: 'SKU', width: 170 },
    {
      field: 'product_name',
      headerName: 'Product name',
      width: 150,
      editable: false,
    },
    {
      field: 'category_id',
      headerName: 'category',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'materials',
      headerName: 'Material',
      sortable: false,
      width: 160,
    },
    {
      field: 'media',
      headerName: 'Media',
      width: 150,
      editable: false,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      editable: false,
      renderCell: editCategoryCell,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      editable: false,
      renderCell: DeleteProductCell,
    },
  ];

  return (
    <>
      <Box className={styles['product-box']}>
        <Stack direction='row' className={styles['search-add']}>
          <TextField
            size='small'
            id='outlined-basic'
            placeholder='search here...'
          />
          <Button variant='contained' onClick={handleAddOpen}>
            Add Product
          </Button>
        </Stack>
        <Box className={styles['product-detail']}>
          <DataGrid
            autoHeight
            sx={{
              '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus-within':
                {
                  outline: 'none !important',
                },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'inherit',
              },
            }}
            getRowId={(value) => value.product_id || Math.random()}
            rows={products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection={false}
            disableColumnMenu={true}
            disableColumnSorting={true}
            disableRowSelectionOnClick={true}
            disableMultipleRowSelection={true}
          />
        </Box>
      </Box>
      <Statistic />
      <Modal
        open={open.isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {open.mode === 'Add' ? 'Add product' : 'Edit product'}
          </Typography>

          <Stack direction='column' gap='10px' marginTop='10px'>
            <TextField
              onChange={(e) => setValue('sku', e.target.value)}
              id='outlined-basic'
              name='title'
              label='SKU'
              variant='outlined'
              value={sku}
            />

            <TextField
              name='author'
              onChange={(e) => setValue('product_name', e.target.value)}
              id='outlined-basic'
              label='Product name'
              value={product_name}
              variant='outlined'
            />
            <TextField
              name='media'
              onChange={handleMediaChange}
              id='outlined-basic'
              label='Product Media'
              variant='outlined'
              value={product_media}
              // value={urls}
            />
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={category}
                label='Category'
                renderValue={() => category}
                onChange={(e) => setValue('category', e.target.value)}
              >
                {categories.length ? (
                  categories.map((category) => (
                    <MenuItem
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem> No categories found </MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id='demo-multiple-name-label'>Material</InputLabel>
              <Select
                labelId='demo-multiple-name-label'
                id='demo-multiple-name'
                multiple
                value={[""]}
                renderValue={() => material}
                onChange={handleMaterialChange}
                input={<OutlinedInput label='Material' />}
                MenuProps={MenuProps}
              >
                {allMaterials.length ? (
                  allMaterials.map((material) => (
                    <MenuItem
                      key={material.material_id}
                      value={material.material_id}
                    >
                      {material.material_name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem> No material found </MenuItem>
                )}
              </Select>
            </FormControl>
            <TextField
              value={price}
              name='price'
              onChange={(e) => setValue('price', e.target.value)}
              id='outlined-basic'
              label='Price'
              variant='outlined'
              type='number'
            />
          </Stack>
          <Button
            sx={{ marginLeft: 'auto', marginTop: '10px' }}
            variant='contained'
            onClick={open.mode === 'Edit' ? handleProductUpdate : handleProductAdd}
          >
            {open.mode !== 'Add' ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
