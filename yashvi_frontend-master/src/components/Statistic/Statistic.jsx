import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import styles from "./statistic.module.css";
import { useDispatch, useSelector } from "react-redux";
import { highPriceData, noMediaData, priceRangeData } from "../../apiService";

const Statistic = () => {
  const dispatch = useDispatch();
  const { categoryWiseHighPriceProduct, rangeWiseProduct, noMediaProduct } = useSelector(
    (state) => state.products
  );
  const [data, setData] = useState({
    highPriceColumn: false,
    priceRangeColumn: false,
    noMediaColumn: false,
  });
  const highPriceColumn = [
   
    {
      field: "category_name",
      headerName: "Category name",
      width: 150,
      editable: false,
    },
    
    { field: "max_price", headerName: "price", width: 170 },
  ];

  const priceRangeColumn = [
    { field: "price_range", headerName: "price", width: 170 },
    {
      field: "count",
      headerName: "Count",
      width: 150,
      editable: false,
    },
  ];

  const noMediaColumn = [
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
  ];
  const highPriceClick = () => {
    setData({
      highPriceColumn: true,
      priceRangeColumn: false,
      noMediaColumn: false,
    });
    dispatch(highPriceData());
  };
  const priceRangeClick = () => {
    setData({
      highPriceColumn: false,
      priceRangeColumn: true,
      noMediaColumn: false,
    });
    dispatch(priceRangeData());
  };
  const noMediaClick = () => {
    setData({
      highPriceColumn: false,
      priceRangeColumn: false,
      noMediaColumn: true,
    });
    dispatch(noMediaData());
  };
  return (
    <Box className={styles["details"]}>
      <Stack direction="row" gap="10px">
        <Button onClick={highPriceClick} variant="outlined">
          Category wise highest price product
        </Button>
        <Button onClick={priceRangeClick} variant="outlined">
          Price range wise product count
        </Button>
        <Button onClick={noMediaClick} variant="outlined">
          No media product{" "}
        </Button>
      </Stack>
      {data.highPriceColumn || data.priceRangeColumn || data.noMediaColumn  ?  
      <DataGrid
      autoHeight
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
        rows={data.highPriceColumn
          ? categoryWiseHighPriceProduct
          : data.priceRangeColumn
          ? rangeWiseProduct
          : data.noMediaColumn
          ? noMediaProduct
          : []}
        columns={
          data.highPriceColumn
            ? highPriceColumn
            : data.priceRangeColumn
            ? priceRangeColumn
            : data.noMediaColumn
            ? noMediaColumn
            : []
        }
        getRowId={(value) => value.category_id || Math.random()}
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
