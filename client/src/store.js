import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from 'js-cookie';

import { productListReducer, productDetailsReducer, productDeleteReducer, productSaveReducer  } from "./reducers/productReducers";
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer, userActivationReducer, profileUpdateReducer, profileUpdateConfirmReducer } from './reducers/userReducer';
import { orderCreateReducer, orderListReducer, orderDeleteReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { cart: { cartItems, shipping: {}, payment: {} },  userSignin: { userInfo }};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userActivation: userActivationReducer,
  orderCreate: orderCreateReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrderList: myOrderListReducer,
  profileUpdate: profileUpdateReducer,
  profileUpdateConfirm: profileUpdateConfirmReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
export default store;