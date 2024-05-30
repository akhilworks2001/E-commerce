import {
    ADD_CART_ERROR,
    ADD_CART_START,
    ADD_CART_SUCCESS,
    GET_CART_ERROR,
    GET_CART_START,
    GET_CART_SUCCESS
} from "../constants/cart.constant"

// get
export const getCartStart = () => ({
    type: GET_CART_START
})

export const getCartSuccess = (cart) => ({
    type: GET_CART_SUCCESS,
    payload: cart
})

export const getCartError = (error) => ({
    type: GET_CART_ERROR,
    payload: error
})

// add
export const addCartStart = (cart) => ({
    type: ADD_CART_START,
    payload: cart
})

export const addCartSuccess = (cart) => ({
    type: ADD_CART_SUCCESS,
    payload: cart
})

export const addCartError = (error) => ({
    type: ADD_CART_ERROR,
    payload: error
})