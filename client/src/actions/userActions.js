import axios from "axios";
import Cookie from "js-cookie";

import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_ACTIVATION_REQUEST,
  USER_ACTIVATION_SUCCESS,
  USER_ACTIVATION_FAIL,
  USER_LOGOUT,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_CONFIRM_REQUEST,
  PROFILE_UPDATE_CONFIRM_SUCCESS,
  PROFILE_UPDATE_CONFIRM_FAIL
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
    dispatch({ type: USER_SIGNIN_FAIL, payload: error });
  }
};

const activation = (token) => async(dispatch) => {
  dispatch({ type: USER_ACTIVATION_REQUEST , payload: { token }});
  try {
    const response =  await axios.patch("http://localhost:5000/api/activation", { token });
    dispatch({ type: USER_ACTIVATION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_ACTIVATION_FAIL, payload: error });
  }
};

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
};

const update = ({ userId, firstName, lastName, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: PROFILE_UPDATE_REQUEST, payload: { userId, firstName, lastName, email, password } });
  try {
    const { data } = await axios.post("http://localhost:5000/api/user/" + userId,
      { firstName, lastName, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: PROFILE_UPDATE_FAIL, payload: error.response.data.message});
   
  }
};

const updateConfirmation = (token) => async(dispatch) => {
  dispatch({ type: PROFILE_UPDATE_CONFIRM_REQUEST , payload: { token }});
  try {
    const response =  await axios.put("http://localhost:5000/api/profile/confirm", { token });
    dispatch({ type: PROFILE_UPDATE_CONFIRM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: PROFILE_UPDATE_CONFIRM_FAIL, payload: error.response.data.error });
  }
};




export { signin, activation, logout, update, updateConfirmation };
