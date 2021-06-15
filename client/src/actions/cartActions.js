import axios from "axios";
import Cookie from "js-cookie";

import { CART_ADD_ITEM } from "../constants/cartConstants";
import { CART_REMOVE_ITEM } from "../constants/cartConstants";
import { CART_SAVE_SHIPPING } from "../constants/cartConstants";
import {  CART_SAVE_PAYMENT } from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/products/" + productId
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInstock: data.countInstock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (errror) {}
};
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}

export { addToCart, removeFromCart, saveShipping, savePayment };
