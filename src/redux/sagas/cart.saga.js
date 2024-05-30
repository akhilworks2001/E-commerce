import { takeLatest, put } from "redux-saga/effects"
import { ADD_CART_START, GET_CART_START } from "../constants/cart.constant"
import { addCartError, getCartError, getCartStart, getCartSuccess } from "../actions/cart.action"
import { addCartToFirebase, getCartFromFirebase } from "../services/cart.services";

function* getCart() {
    try {
        let result = yield getCartFromFirebase()
        yield put(getCartSuccess(result))
    } catch (error) {
        yield put(getCartError(error.message))
    }
}

function* addCart({payload}) {
    try {
        yield addCartToFirebase(payload)
        yield put(getCartStart())
    } catch (error) {
        yield put(addCartError(error.message))
    }   
}

export default function* cart() {
    yield takeLatest(GET_CART_START, getCart);
    yield takeLatest(ADD_CART_START, addCart);
}