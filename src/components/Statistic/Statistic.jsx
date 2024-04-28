import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import styles from "./statistic.module.css";

const Statistic = () => {
  const [data, setData] = useState({
    highPriceColumn: false,
    priceRangeColumn: false,
    noMediaColumn: false,
  });
  const highPriceColumn = [
    { field: "price", headerName: "price", width: 170 },
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
  ];

  const priceRangeColumn = [
    { field: "price", headerName: "price", width: 170 },
    {
      field: "count",
      headerName: "Count",
      width: 150,
      editable: false,
    },
  ];

  const noMediaColumn = [
    { field: "price", headerName: "price", width: 170 },
    {
      field: "media",
      headerName: "No Media",
      width: 150,
      editable: false,
    },
    {
      field: "product_name",
      headerName: "Product name",
      width: 150,
      editable: false,
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
  ];
  const highPriceClick = () => {
    setData({
      highPriceColumn: true,
      priceRangeColumn: false,
      noMediaColumn: false,
    });
  };
  const priceRangeClick = () => {
    setData({
      highPriceColumn: false,
      priceRangeColumn: true,
      noMediaColumn: false,
    });
  };
  const noMediaClick = () => {
    setData({
      highPriceColumn: false,
      priceRangeColumn: false,
      noMediaColumn: true,
    });
  };
  return (
    <Box className={styles["details"]}>
      <Stack direction="row" gap="10px">
        <Button onClick={highPriceClick} variant="outlined">
          Category wise highest price product
        </Button>
        <Button onClick={priceRangeClick} variant="outlined">
          Price rane wise product count
        </Button>
        <Button onClick={noMediaClick} variant="outlined">
          No media product{" "}
        </Button>
      </Stack>
      {data.highPriceColumn || data.priceRangeColumn || data.noMediaColumn  ?  
      <DataGrid
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus-within":
            {
              outline: "none !important",
            },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "inherit",
          },
          marginTop: "20px"
        }}
        rows={rows}
        columns={
          data.highPriceColumn
            ? highPriceColumn
            : data.priceRangeColumn
            ? priceRangeColumn
            : data.noMediaColumn
            ? noMediaColumn
            : []
        }
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
    : null}
    </Box>
  );
};

export default Statistic;
