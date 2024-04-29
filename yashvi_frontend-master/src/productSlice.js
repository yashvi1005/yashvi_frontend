import { createSlice } from '@reduxjs/toolkit';
import { highPriceData } from './apiService';

const initialState = {
  products: [],
  categories: [],
  material: [],
  categoryWiseHighPriceProduct: [],
  rangeWiseProduct: [],
  noMediaProduct: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    AddCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    updateDeleteCategory: (state, action) => {
      state.categories = action.payload;
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
    AddMaterial: (state, action) => {
      state.material = [...state.material, action.payload];
    },
    updateDeleteMaterial: (state, action) => {
      state.material = action.payload;
    },
    AddProducts: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    updateDeleteProduct: (state, action) => {
      state.products = action.payload;
    },
    categoryWiseHighPriceProduct: (state, action) => {
      state.categoryWiseHighPriceProduct = action.payload;
    },
    rangeWiseProduct: (state, action) => {
      state.rangeWiseProduct = action.payload;
    },
    noMediaProduct: (state, action) => {
      state.noMediaProduct = action.payload;
    },
  },
});

export const {
  setCategory,
  AddCategory,
  setProducts,
  AddProducts,
  updateDeleteCategory,
  AddMaterial,
  setMaterial,
  updateDeleteMaterial,
  updateDeleteProduct,
  categoryWiseHighPriceProduct,
  rangeWiseProduct,
  noMediaProduct
} = productSlice.actions;

export default productSlice.reducer;
