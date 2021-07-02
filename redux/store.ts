import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const middleware = [thunk];
const initialState = {};

const store = createStore(
    rootReducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    // applyMiddleware(...[thunk])
    );

export default store;
