import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMaterialAction,
  deleteMaterialAction,
  fetchMaterialAction,
  updateMaterialAction,
} from '../../apiService';
import styles from '../Category/category.module.css';
import { useForm } from 'react-hook-form';

const Material = () => {
  const dispatch = useDispatch();
  const { material } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchMaterialAction());
  }, []);
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

  const { watch, setValue } = useForm({
    defaultValues: {
      material_id: '',
      material_name: '',
    },
    mode: 'all',
  });

  const { material_id, material_name } = watch();
  const [open, setOpen] = useState({ isOpen: false, mode: '' });
  const handleAddOpen = () => {
    setOpen({ isOpen: true, mode: 'Add' });
    setValue('material_name', null);
  };
  const handleClose = () => setOpen({ isOpen: false, mode: 'Add' });
  const EditMaterialCell = ({ row }) => {
    const handleEditOpen = () => {
      setOpen({ isOpen: true, mode: 'Edit' });
      setValue('material_name', row.material_name);
      setValue('material_id', row.material_id || row.id);
    };
    return (
      <Button onClick={handleEditOpen} variant='contained'>
        Edit
      </Button>
    );
  };
  const handleAddUpdateMaterial = (e) => {
    setValue('material_name', e.target.value);
  };

  const handleMaterialAdd = () => {
    const data = {
      material_name: material_name,
      onSuccess: () => setOpen({ isOpen: false }),
    };
    dispatch(addMaterialAction(data));
  };

  const handleMaterialUpdate = () => {
    const data = {
      material_id: material_id,
      material_name: material_name,
      onSuccess: () => setOpen({ isOpen: false }),
    };
    dispatch(updateMaterialAction(data));
  };

  const DeleteMaterialCell = ({ row }) => {
    const handleDeleteMaterial = () => {
      dispatch(deleteMaterialAction(row.material_id));
    };
    return (
      <Button
        onClick={handleDeleteMaterial}
        size='small'
        variant='contained'
        color='error'
      >
        Delete
      </Button>
    );
  };

  const columns = [
    {
      field: 'material_name',
      headerName: 'Material name',
      width: 200,
      editable: false,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      editable: false,
      renderCell: EditMaterialCell,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      editable: false,
      renderCell: DeleteMaterialCell,
    },
  ];

  return (
    <>
      <Box className={styles['category-box']}>
        <Button
          className={styles['category-add']}
          variant='contained'
          onClick={handleAddOpen}
        >
          Add Material
        </Button>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            autoHeight
            sx={{
              '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'inherit',
              },
            }}
            getRowId={(value) => value.material_id}
            rows={material}
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
      <Modal
        open={open.isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {open.mode === 'Add' ? 'Add material' : 'Edit material'}
          </Typography>

          <Stack direction='column' gap='10px' marginTop='10px'>
            <TextField
              value={material_name}
              onChange={handleAddUpdateMaterial}
              id='outlined-basic'
              name='title'
              label='Material name'
              variant='outlined'
            />
          </Stack>
          <Button
            sx={{ marginLeft: 'auto', marginTop: '10px' }}
            variant='contained'
            onClick={
              open.mode === 'Edit' ? handleMaterialUpdate : handleMaterialAdd
            }
          >
            {open.mode === 'Add' ? 'Add' : 'Edit'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Material;
