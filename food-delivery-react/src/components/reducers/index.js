import { combineReducers } from "redux";

import mealsReducer from "./mealsReducer";
import newsReducer from "./newsReducer";

export default combineReducers({
  mealsReducer,
  newsReducer,
});
