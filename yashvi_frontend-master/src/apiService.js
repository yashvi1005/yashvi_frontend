import {
  AddCategory,
  AddMaterial,
  AddProducts,
  categoryWiseHighPriceProduct,
  deleteCategory,
  noMediaProduct,
  rangeWiseProduct,
  setCategory,
  setMaterial,
  setProducts,
  updateCategory,
  updateDeleteCategory,
  updateDeleteMaterial,
  updateDeleteProduct,
} from './productSlice';

const baseURL = 'https://9b8c-150-107-232-56.ngrok-free.app/';
export const fetchCategoriesAction = () => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}category`, {
      method:"GET",
      headers: {
        'ngrok-skip-browser-warning': '123',
      },
    });
    const data = await response.json();
    dispatch(setCategory(data));
  } catch (error) {
    console.log(error);
  }
};
export const addCategoryAction = (dataa) => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '123',
      },
      body: JSON.stringify({ categoryName: dataa.category_name }),
    });
    const data = await response.json();
    dataa.onSuccess();
    dispatch(
      AddCategory({ category_id: data.id, category_name: data.categoryName })
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCategoryAction = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const response = await fetch(`${baseURL}category/${data.category_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '123',
      },
      body: JSON.stringify({ categoryName: data.category_name }),
    });
    const dataa = await response.json();
    data.onSuccess();
    let updatedCategory = [];
    updatedCategory = state.products.categories.map((category) => {
      if (category.category_id === Number(dataa.categoryId)) {
        return {
          ...category,
          category_id: Number(dataa.categoryId),
          category_name: dataa.categoryName,
        };
      } else {
        return category;
      }
    });

    dispatch(updateDeleteCategory(updatedCategory));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryAction =
  (category_id) => async (dispatch, getState) => {
    try {
      const state = getState();
      const response = await fetch(`${baseURL}category/${category_id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '123',
        },
      });
      const data = await response.json();
      let updatedData = [];
      updatedData = state.products.categories.filter((category) => {
        return +category.category_id !== +data.categoryId;
      });
      dispatch(updateDeleteCategory(updatedData));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const addMaterialAction = (dataa) => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}material`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '123',
      },
      body: JSON.stringify({ materialName: dataa.material_name }),
    });
    const data = await response.json();
    dataa.onSuccess();
    dispatch(
      AddMaterial({ material_id: data.id, material_name: data.materialName })
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMaterialAction = () => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}material`, {
      method:"GET",
      headers: {
        'ngrok-skip-browser-warning': '123',
      },
    });
    const data = await response.json();
    dispatch(setMaterial(data));
  } catch (error) {
    console.log(error);
  }
};
export const updateMaterialAction = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const response = await fetch(`${baseURL}material/${data.material_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '123',
      },
      body: JSON.stringify({ materialName: data.material_name }),
    });
    const dataa = await response.json();
    data.onSuccess();
    let updatedMaterial = [];
    updatedMaterial = state.products.material.map((material) => {
      if (material.material_id === Number(dataa.materialId)) {
        return {
          ...material,
          material_id: Number(dataa.materialId),
          material_name: dataa.materialName,
        };
      } else {
        return material;
      }
    });

    dispatch(updateDeleteMaterial(updatedMaterial));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMaterialAction =
  (material_id) => async (dispatch, getState) => {
    try {
      const state = getState();
      const response = await fetch(`${baseURL}material/${material_id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '123',
        },
      });
      const data = await response.json();
      let updatedData = [];
      updatedData = state.products.material.filter((material) => {
        return +material.material_id !== +data.materialId;
      });
      dispatch(updateDeleteMaterial(updatedData));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const addProductAction = (productData) => async (dispatch) => {
  try {
    const apiData = {
      sku: productData.sku,
      productName: productData.productName,
      productPrice: productData.price,
      categoryId: productData.categoryId,
      materials: productData.materials,
      media: productData.media,
    };
    const response = await fetch(`${baseURL}product `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '123',
      },
      body: JSON.stringify(apiData),
    });
    const data = await response.json();
    productData.onSuccess();
    dispatch(
      AddProducts(apiData)
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsAction = () => async (dispatch) => {
  try {
    
    const response = await fetch(`${baseURL}product`, {
      method:"GET",
      headers: {
        'ngrok-skip-browser-warning': '123',
      },
    });
    const data = await response.json();
    dispatch(setProducts(data.results));
  } catch (error) {
    console.log(error);
  }
};

export const updateProductAction = (productData) => async (dispatch, getState) => {
  try {
    const apiData = {
      sku: productData.sku,
      productName: productData.productName,
      productPrice: productData.price,
      categoryId: productData.category_id,
      materials: productData.materials,
      media: productData.media,
    };
    const state = getState();
    const response = await fetch(`${baseURL}product/${productData.product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '123',
      },
      body: JSON.stringify(apiData),
    });
    const data= await response.json();
    productData.onSuccess();
    let updatedCategory = [];
    // updatedCategory = state.products.categories.map((category) => {
    //   if (category.category_id === Number(dataa.categoryId)) {
    //     return {
    //       ...category,
    //       category_id: Number(dataa.categoryId),
    //       category_name: dataa.categoryName,
    //     };
    //   } else {
    //     return category;
    //   }
    // });

    // dispatch(updateDeleteCategory(updatedCategory));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductAction =
  (product_id) => async (dispatch, getState) => {
    try {
      const state = getState();
      const response = await fetch(`${baseURL}product/${product_id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '123',
        },
      });
      const data = await response.json();
      let updatedData = [];
      updatedData = state.products.products.filter((product) => {
        return +product.product_id !== +data.productId;
      });
      dispatch(updateDeleteProduct(updatedData));
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  export const highPriceData = () => async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}stats/1`, {
        method:"GET",
        headers: {
          'ngrok-skip-browser-warning': '123',
        },
      });
      const data = await response.json();
      dispatch(categoryWiseHighPriceProduct(data));
    } catch (error) {
      console.log(error);
    }
  };

  export const priceRangeData = () => async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}stats/2`, {
        method:"GET",
        headers: {
          'ngrok-skip-browser-warning': '123',
        },
      });
      const data = await response.json();
      dispatch(rangeWiseProduct(data));
    } catch (error) {
      console.log(error);
    }
  };

  export const noMediaData = () => async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}stats/3`, {
        method:"GET",
        headers: {
          'ngrok-skip-browser-warning': '123',
        },
      });
      const data = await response.json();
      dispatch(noMediaProduct(data));
    } catch (error) {
      console.log(error);
    }
  };