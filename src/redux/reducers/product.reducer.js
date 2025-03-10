import { GET_PRODUCT_SUCCESS } from "../constants/product.constant";

const initialState = {
    products: []
}

export const productReducer = (state = initialState , action) => {
    switch (action.type) {
        case GET_PRODUCT_SUCCESS: 
            return {
                ...state,
                products: [...action.payload]
            }
        default:
            return state;
    }
}