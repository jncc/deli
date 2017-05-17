
import { initialState } from "./store";
import { GET_PRODUCTS } from "./actions";
import { GetProductsResult } from "../../app.server/handlers/products/models";

export const productsReducer = function(state = initialState.products, action: any) {

    switch (action.type) {
        case GET_PRODUCTS:
            return Object.assign({}, state, { result: action.result });
    }

    return state;
}
