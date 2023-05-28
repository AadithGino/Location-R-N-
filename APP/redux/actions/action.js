import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const userSignUpAction = (name, email, password) => async dispatch => {
  try {
    dispatch({type: USER_SIGNUP_REQUEST});
    const {data} = await axios.post(
      'http://192.168.47.236:5000/signup',
      {name, email, password},
      config,
    );
    dispatch({type: USER_SIGNUP_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const userLoginAction = (email, password) => async dispatch => {
  try {
    dispatch({type: USER_LOGIN_REQUEST});
    const {data} = await axios.post(
      'http://192.168.47.236:5000/login',
      {email, password},
      config,
    );
    
    AsyncStorage.setItem('userdata', JSON.stringify(data)).then(result => {
      dispatch({type: USER_LOGIN_SUCCESS, payload: data});
    }).catch((err)=>console.log(err))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const userLogoutAction = () => async dispatch => {
  AsyncStorage.removeItem('userdata');
  dispatch({type: USER_LOGOUT});
};
