import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";


const middlewares = [thunk]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer]
const composedEnhancers = compose(...enhancers)

const store = createStore(rootReducer, composedEnhancers);

export default store;