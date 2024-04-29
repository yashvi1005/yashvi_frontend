import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAction, deleteCategoryAction, fetchCategoriesAction, updateCategoryAction } from "../../apiService";
import styles from "./category.module.css";
import { useForm } from "react-hook-form";

const Category = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const {
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      category_id:"",
      category_name: ""
    },
    mode: "all",
  });

  const {
    category_id,
    category_name
  } = watch();

  const [open, setOpen] = useState({ isOpen: false, mode: "" });
  const handleAddOpen = () =>{
    setOpen({ isOpen: true, mode: "Add"});
    setValue("category_name", null)}
  const handleClose = () => setOpen({ isOpen: false, mode: "Add"});
  
  const EditCategoryCell = ({row}) => {
    const handleEditOpen = () =>{
        setOpen({ isOpen: true, mode: "Edit"});
        setValue("category_name", row.category_name)
        setValue("category_id", row.category_id || row.id)
      }
      return (
        <Button onClick={handleEditOpen} variant="contained">
        Edit
      </Button>
    );
  };

  const DeleteCategoryCell =({row}) => {
    const handleDeleteCategory =() =>{
      dispatch(deleteCategoryAction(row.category_id))
    }
   return (
    <Button onClick={handleDeleteCategory} size="small" variant="contained" color="error">
      Delete
    </Button>
  )}


  const handleAddUpdate = (e) => {
    setValue("category_name", e.target.value);
  }; 

  const handleCategoryAdd = () => {
    const data= {
      category_name:category_name,
      onSuccess : () => setOpen({isOpen: false})
    }
    dispatch(addCategoryAction(data))
  }

  const handleUpdate = () => {
    const data={category_id: category_id, category_name:category_name, onSuccess : () => setOpen({isOpen: false})}
    dispatch(updateCategoryAction(data))
  }
  const columns = [
    {
      field: "category_name",
      headerName: "Category name",
      width: 200,
      editable: false,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      editable: false,
      renderCell: EditCategoryCell,

    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      editable: false,
      renderCell: DeleteCategoryCell
    },
  ];

  return (
    <>
      <Box className={styles["category-box"]}>
        <Button
          className={styles["category-add"]}
          variant="contained"
          onClick={handleAddOpen}
        >
          Add category
        </Button>
        <Box sx={{ width: "100%" }}>
          <DataGrid
          autoHeight
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "inherit",
              },
            }}
            getRowId={(value) => value.category_id || Math.random()}
            rows={categories}
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {open.mode === "Add" ? "Add category" : "Edit category"}
          </Typography>

          <Stack direction="column" gap="10px" marginTop="10px">
            <TextField
            value={category_name}
              onChange={handleAddUpdate}
              id="outlined-basic"
              name="title"
              label="Category name"
              variant="outlined"
            />
          </Stack>
          <Button
            sx={{ marginLeft: "auto", marginTop: "10px" }}
            variant="contained"
            onClick={open.mode === "Edit" ? handleUpdate : handleCategoryAdd}
          >
            {open.mode === "Add" ? "Add" : "Edit"}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Category;
