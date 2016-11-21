import { combineReducers } from "redux";

import socket from "./socketReducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
    socket,
    routing: routerReducer,
});
