import { combineReducers } from "redux";
import userReducer from "./user";
import authReducer from "./auth";

const buildRootReducer = () =>
  combineReducers({
    user: userReducer,
    auth: authReducer
  });

export default buildRootReducer;
