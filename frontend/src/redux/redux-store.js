import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import catalogReducer from "./catalog-reducer";
import productReducer from "./product-reducer";
import cartReducer from "./cart-reducer";
import authReducer from "./authentication";

let reducers = combineReducers({
    catalog: catalogReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;
