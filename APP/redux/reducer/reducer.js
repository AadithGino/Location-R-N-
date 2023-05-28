import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/constants';

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {loading: true};

    case USER_SIGNUP_SUCCESS:
      return {loading: false, userdata: action.payload};

    case USER_SIGNUP_FAIL:
      return {loading: false, usersignuperror: action.payload};
    default:
      return state;
  }
};


export const userLoginReducer = (state = {}, action) => {
 
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return {loading: true};
  
      case USER_LOGIN_SUCCESS:
        console.log(action.payload);
        return {loading: false, userdata:action.payload};
  
      case USER_LOGIN_FAIL:
        return {loading: false, userloginerror: action.payload};

      case USER_LOGOUT:
        return {userdata:false}
      default:
        return state;
    }
  };
  