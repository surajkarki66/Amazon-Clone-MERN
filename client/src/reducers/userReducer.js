import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_ACTIVATION_REQUEST,
  USER_ACTIVATION_SUCCESS,
  USER_ACTIVATION_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_CONFIRM_REQUEST,
  PROFILE_UPDATE_CONFIRM_SUCCESS,
  PROFILE_UPDATE_CONFIRM_FAIL
} from "../constants/userConstants";

const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


const userActivationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIVATION_REQUEST:
      return { loading: true };
    case USER_ACTIVATION_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_ACTIVATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, data: action.payload};
    case PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const profileUpdateConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_CONFIRM_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_CONFIRM_SUCCESS:
      return { loading: false, data: action.payload};
    case PROFILE_UPDATE_CONFIRM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }

}

export { userSigninReducer, userActivationReducer, profileUpdateReducer, profileUpdateConfirmReducer };
