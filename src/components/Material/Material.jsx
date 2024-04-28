import {
    Box,
    Button,
    Modal,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchPosts } from "../../apiService";
  import styles from "../Category/category.module.css";
  
  const Material = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    useEffect(() => {
      dispatch(fetchPosts());
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
  
    const [open, setOpen] = useState({ isOpen: false, mode: "", data: null });
    const handleAddOpen = () =>
      setOpen({ isOpen: true, mode: "Add", data: null });
    const handleClose = () => setOpen({ isOpen: false, mode: "Add", data: null });
    const editMaterialCell = () => {
      const handleEditOpen = () =>
      setOpen({ isOpen: true, mode: "Edit", data: null });
      return <Button onClick={handleEditOpen} variant="contained">Edit</Button>
    };
    const columns = [
      { field: "material_id", headerName: "ID", width: 90 },
      {
        field: "material_name",
        headerName: "Cateogry name",
        width: 200,
        editable: false,
      },
      {
        field: "edit",
        headerName: "Edit",
        width: 150,
        editable: false,
        renderCell: editMaterialCell,
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 150,
        editable: false,
        renderCell: () => (
          <Button size="small" variant="contained" color="error">
            Delete
          </Button>
        ),
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
            Add Material
          </Button>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "inherit",
                },
              }}
              getRowId={(value) => value.category_id}
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
        <Modal
          open={open.isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {open.mode === "Add" ? "Add material" : "Edit material"}
            </Typography>
  
            <Stack direction="column" gap="10px" marginTop="10px">
              <TextField
                // onChange={editPost ? handleEdit : handleAdd}
                id="outlined-basic"
                name="title"
                label="SKU"
                variant="outlined"
                // value={editPost ? editPost.title : newPost.title}
              />
            </Stack>
            <Button
              sx={{ marginLeft: "auto", marginTop: "10px" }}
              variant="contained"
              // onClick={editPost ? handleUpdate : handlePostAdd}
            >
              {open.mode=== "Add" ? "Add" : "Edit"}
            </Button>
          </Box>
        </Modal>
      </>
    );
  };
  
  export default Material;
  