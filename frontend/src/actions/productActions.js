import axios from "axios";

import { PRODUCT_LIST_REQUEST } from "../constants/productConstants";
import { PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { PRODUCT_LIST_FAILED } from "../constants/productConstants";

import { PRODUCT_DETAILS_REQUEST } from "../constants/productConstants";
import { PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";
import { PRODUCT_DETAILS_FAILED } from "../constants/productConstants";



const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAILED, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get("http://localhost:5000/api/products/" + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAILED, payload: error.message });
  }
} 

export { listProducts, detailsProduct };