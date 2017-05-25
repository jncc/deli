
import { createStore, combineReducers } from 'redux';

import { productsReducer } from './products-reducer';
import { GetProductsResult } from '../../app.server/handlers/products/models';
import { Query } from '../components/models/Query';
import { config } from '../config';

interface AppState {
    ui: {
        query: Query,
    },
    products: {
        result: GetProductsResult
    }
}

export const initialState: AppState = {
    ui: {
        query: config.defaultQuery
    },
    products: {
        result: { collections: [] }
    }
};

// map our app state object to the 'reducer' functions that
// handle the relevant parts of the state tree
let reducers = {
    products: productsReducer,
};

// use redux's combineReducers helper to create the store
let allReducers = combineReducers(reducers);
export let store = createStore(allReducers);
