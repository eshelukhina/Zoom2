import { combineReducers, createStore } from "redux";
import reducer1 from "./reducers/reducer1";

export const store = createStore(combineReducers({
    data: reducer1,
}))