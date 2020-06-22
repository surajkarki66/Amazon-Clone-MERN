import axios from "axios";
import Cookie from "js-cookie";

import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_ACTIVATION_REQUEST,
  USER_ACTIVATION_SUCCESS,
  USER_ACTIVATION_FAIL
} from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const response = await axios.post("http://localhost:5000/api/signin", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });
    Cookie.set("userInfo", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.errors });
  }
};

const activation = (token) => async(dispatch) => {
  dispatch({ type: USER_ACTIVATION_REQUEST , payload: { token }});
  try {
    const response =  await axios.post("http://localhost:5000/api/activation", { token });
    dispatch({ type: USER_ACTIVATION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_ACTIVATION_FAIL, payload: error });
  }
};

export { signin, activation };
