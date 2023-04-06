import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import App from "./reducer/app";
import User from "./reducer/user";
import Cart from "./reducer/cart";
import Category from "./reducer/category";
import Collection from "./reducer/collection";

//1. 引入redux
//2. createStore(reducer)

const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  App,
  User,
  Cart,
  Category,
  Collection
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools());

const persist = persistStore(store);

export {store, persist};