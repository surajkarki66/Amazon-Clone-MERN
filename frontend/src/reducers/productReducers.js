import { PRODUCT_LIST_REQUEST } from "../constants/productConstants";
import { PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { PRODUCT_LIST_FAILED } from "../constants/productConstants";

import { PRODUCT_DETAILS_REQUEST } from "../constants/productConstants";
import { PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";
import { PRODUCT_DETAILS_FAILED } from "../constants/productConstants";

const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAILED:
      return { loading: false, error: action.payload };
      
    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer };
