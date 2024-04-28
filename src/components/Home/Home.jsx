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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import styles from "./home.module.css";
import Navbar from "../Navbar/Navbar";
import Statistic from "../Statistic/Statistic";

const Home = () => {
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
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };
  const [open, setOpen] = useState({ isOpen: false, mode: "", data: null });
  const handleAddOpen = () =>
    setOpen({ isOpen: true, mode: "Add", data: null });
  const handleClose = () => setOpen({ isOpen: false,mode: "Add", data: null });
  const editCategoryCell = () => {
    const handleEditOpen = () =>
      setOpen({ isOpen: true, mode: "Edit", data: null });
    return (
      <Button onClick={handleEditOpen} variant="contained">
        Edit
      </Button>
    );
  };
  const columns = [
    { field: "sku", headerName: "SKU", width: 170 },
    {
      field: "productName",
      headerName: "Product name",
      width: 150,
      editable: false,
    },
    {
      field: "category_id",
      headerName: "category",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "material",
      headerName: "Material",
      sortable: false,
      width: 160,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      editable: false,
      renderCell: editCategoryCell,
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

  const rows = [
    {
      id: 1,
      sku: "Snow",
      productName: "Jon",
      category_id: 14,
      material: "fabric",
    },
    {
      id: 2,
      sku: "Lannister",
      productName: "Cersei",
      category_id: 31,
      material: "fabric",
    },
    {
      id: 3,
      sku: "Lannister",
      productName: "Jaime",
      category_id: 31,
      material: "fabric",
    },
    {
      id: 4,
      sku: "Stark",
      productName: "Arya",
      category_id: 11,
      material: "fabric",
    },
    {
      id: 5,
      sku: "Targaryen",
      productName: "Daenerys",
      category_id: 67,
      material: "fabric",
    },
    {
      id: 6,
      sku: "Melisandre",
      productName: "jshjvs",
      category_id: 150,
      material: "fabric",
    },
    {
      id: 7,
      sku: "Clifford",
      productName: "Ferrara",
      category_id: 44,
      material: "fabric",
    },
    {
      id: 8,
      sku: "Frances",
      productName: "Rossini",
      category_id: 36,
      material: "fabric",
    },
    {
      id: 9,
      sku: "Roxie",
      productName: "Harvey",
      category_id: 65,
      material: "fabric",
    },
  ];
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  return (
    <>
      <Box className={styles["product-box"]}>
        <Stack direction="row" className={styles["search-add"]}>
          <TextField
            size="small"
            id="outlined-basic"
            placeholder="search here..."
          />
          <Button variant="contained" onClick={handleAddOpen}>
            Add Product
          </Button>
        </Stack>
        <Box className={styles["product-detail"]}>
          <DataGrid
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus-within":
                {
                  outline: "none !important",
                },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "inherit",
              },
            }}
            rows={rows}
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {open.mode === "Add" ? "Add product" : "Edit product"}
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

            <TextField
              name="author"
              // onChange={editPost ? handleEdit : handleAdd}
              id="outlined-basic"
              label="Product name"
              variant="outlined"
              // value={editPost ? editPost.author : newPost.author}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Name</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={[]}
                // onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Button
            sx={{ marginLeft: "auto", marginTop: "10px" }}
            variant="contained"
            // onClick={editPost ? handleUpdate : handlePostAdd}
          >
            {open.mode !=="Add" ? "Update" : "Add"}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
