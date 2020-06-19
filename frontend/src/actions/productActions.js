import axios from "axios";

import { PRODUCT_LIST_REQUEST } from "../constants/productConstants";
import { PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { PRODUCT_LIST_FAILED } from "../constants/productConstants";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAILED, payload: error.message });
  }
};

export { listProducts };