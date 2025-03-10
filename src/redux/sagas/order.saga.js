import { getOrderError, getOrderStart, getOrderSuccess, placeOrderError } from "../actions/order.action"
import { GET_ORDER_START, PLACE_ORDER_START } from "../constants/order.constant"
import { getOrderFromFirebase, placeOrderToFirebase } from "../services/order.service"
import { takeLatest, put } from "redux-saga/effects"
import { getCartStart } from "../actions/cart.action";

function* getOrder() {
    try {
        let result = yield getOrderFromFirebase()
        yield put(getOrderSuccess(result))
    } catch (error) {
        yield put(getOrderError(error.message))
    }
}

function* placeOrder({payload}) {
    try {
        yield placeOrderToFirebase(payload)
        yield put(getOrderStart())
        yield put(getCartStart())
    } catch (error) {
        yield put(placeOrderError(error.message))
    }   
}

export default function* order() {
    yield takeLatest(GET_ORDER_START, getOrder);
    yield takeLatest(PLACE_ORDER_START, placeOrder);
}