import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import adminReducers from "./adminReducers";
import messageReducers from "./messageReducers";
import contactReducers from "./contactReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  admin: adminReducers,
  messages: messageReducers,
  contacts: contactReducers
});