import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cart.reducer";
import { categoryReducer } from "./category.reducer";
import { orderReducer } from "./order.reducer";
import { productReducer } from "./product.reducer";
import { userReducer } from "./user.reducer";

export const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer
})