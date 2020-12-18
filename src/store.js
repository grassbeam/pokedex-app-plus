import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ReducerStorage from './data/DataStorage.js';

import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import * as Config from "./config";
import { Log } from "./utility";

const rootPersistConfig = {
    key: Config.STOR_KEY.RootAllStorage,
    storage: storage
  };

let persitedReducer= persistCombineReducers(rootPersistConfig, ReducerStorage);

export default function configureStore(initialState={}) {
  let store = createStore(persitedReducer,applyMiddleware(thunk)); 
  let persistor= persistStore(store);
  return {store,persistor};
}
