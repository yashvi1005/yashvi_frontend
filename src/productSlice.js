import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories:[],
  material: []
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.categories = action.payload
    },
    AddProducts  : (state, action) => {
      state.categories.push(action.payload); 
    }
   
  }
});

export const {setProducts,AddProducts } = productSlice.actions

export default productSlice.reducer
