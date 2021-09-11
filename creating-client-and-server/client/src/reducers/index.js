import { combineReducers } from "redux";
import { chatReducer } from "./ChatReducer"

export const rootReducer = combineReducers({
    chat: chatReducer,
});