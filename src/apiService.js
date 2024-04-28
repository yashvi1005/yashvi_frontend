import { setProducts } from "./productSlice";

const baseURL = "https://c2a2-150-107-232-56.ngrok-free.app/"
export const fetchPosts = () => async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}category`, {
        headers: {
          "ngrok-skip-browser-warning": "123"
        }
      });
      const data = await response.json();
      dispatch(setProducts(data));
console.log("data", data)
    } catch (error) {
      console.log(error);
    }
  };