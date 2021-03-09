import { combineReducers } from "redux";
import authReducer from "./auth";
import layoutReducer from "./layout";


export default combineReducers({
  auth: authReducer,
  layout: layoutReducer
});