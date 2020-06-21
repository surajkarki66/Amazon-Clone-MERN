import axios from "axios";
import Cookie from "js-cookie";

import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
} from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const response = await axios.post("http://localhost:5000/api/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });
    Cookie.set("userInfo", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.errors });
  }
};

export { signin };
