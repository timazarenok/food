import axios from 'axios';

import {
    FILTER_ITEMS,
    SIGN_INPOPPED,
    HOVERED,
    HANDLE_CLICK,
    CHECKED_OUT,
    CLOSE_MODAL,
    INVOKE_BOT,
    SET_FOODITEMS,
    FETCH_FOODITEMS_FAILED,
    SET_RESTAURANTS,
    ORDER_FORM,
    CLOSE_ADDRESS
} from './types'

import {setAuthToken} from "../utility";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, USER_LOADING} from "./types";
             

export const filterItems = (filteredFood) =>{
    return{
        type: FILTER_ITEMS,
        filteredFood:filteredFood
    }
}

export const signIn = (isSignInPopped) =>{
    return{
        type: SIGN_INPOPPED,
        isSignInPopped:isSignInPopped
    }
}

export const onHover = (isHovered) =>{
    return{
        type: HOVERED,
        isHovered:isHovered
    }
}

export const handleClick = (anchorEl)=>{
    return{
        type: HANDLE_CLICK,
        anchorEl:anchorEl
    }
}

export const checkOut = (isCheckedOut)=>{
    return{
        type: CHECKED_OUT,
        isCheckedOut:isCheckedOut,
    }
}

export const closeModal = (isCheckedOut)=>{
    return{
        type: CLOSE_MODAL,
        isCheckedOut:isCheckedOut
    }
}

export const closeAddressModal = (isOrdered)=>{
    return{
        type: CLOSE_ADDRESS,
        isOrdered:isOrdered
    }
}

export const orderForm = (isOrdered, items)=>{
    return{
        type: ORDER_FORM,
        isCheckedOut:false,
        isOrdered:isOrdered,
        items: items
    }
}

export const invokeBot = (IsBotEnabled)=>{
    return{
        type: INVOKE_BOT,
        isBotEnabled:IsBotEnabled
    }
}

export const setFoodItems =(lists)=>{
    return{
        type: SET_FOODITEMS,
        lists:lists
    }
}

export const fetchFoodItemsFailed = ()=>{
    return{
        type: FETCH_FOODITEMS_FAILED,
        error:true
    }
};

export const getFoodItems = () => {
    return dispatch => {
        const url="https://api.jsonbin.io/b/5ec694b118c8475bf16da1e3";
        axios.get(url)
		    .then(response => {
                dispatch(setFoodItems(response.data))
            })
            .catch(error =>{
                dispatch(fetchFoodItemsFailed())
            })
    }
};

export const setRestaurants = (restaurants)=>{
    return{
        type: SET_RESTAURANTS,
        restaurants:restaurants
    }
}


export const getRestaurants = ()=>{
    return dispatch => {
        const url="https://api.jsonbin.io/b/5ec69449e91d1e45d10e96bc";
        axios.get(url)
			.then(response => {
                dispatch(setRestaurants(response.data))
            })
            .catch(error =>{
                dispatch(fetchFoodItemsFailed())
            });
    }
}

export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
  
  // User loading
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err => console.log(err.response.data));
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err.response.data));
};

// Set logged in user
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};