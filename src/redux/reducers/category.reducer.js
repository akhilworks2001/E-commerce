import { GET_CATEGORY_SUCCESS } from "../constants/category.constant";

const initialState = {
    categories: []
}

export const categoryReducer = (state = initialState , action) => {

    switch (action.type) {
        case GET_CATEGORY_SUCCESS: 
            return {
                ...state,
                categories: [...action.payload]
            }
        default:
            return state;
    }
}