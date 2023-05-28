import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {userLoginReducer, userSignUpReducer} from './reducer/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const middeware = [thunk];

const reducer = combineReducers({
  userSignUpReducer: userSignUpReducer,
  userLoginReducer: userLoginReducer,
});

let userdata;
const fetchUserdata = async () => {
  userdata = await AsyncStorage.getItem('userdata');
};

fetchUserdata();

const initialState = {
  userLoginReducer: {userdata: userdata},
};

const store = createStore(reducer, initialState, applyMiddleware(...middeware));

export default store;
