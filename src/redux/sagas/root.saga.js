import {all, fork} from "redux-saga/effects"
import cart from "./cart.saga"
import category from "./category.saga"
import order from "./order.saga"
import product from "./product.saga"
import user from "./user.saga"

export default function* root() {
    yield all([
        fork(category),
        fork(product),
        fork(user),
        fork(cart),
        fork(order),
    ])
}