import {
  GET_CART_SUCCESS
} from "../constants/cart.constant";

export let defaultValue = {
  customer: {},
  items: [],
  subTotal: 0,
  tax: 0,
  grandTotal: 0,
}

const initialState = {
  currentCart: localStorage.getItem('currentCart') ?
      JSON.parse(localStorage.getItem('currentCart')) : defaultValue,
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_CART_SUCCESS:
          return {
              ...state,
              currentCart: {
                  ...action.payload
              }
          };
      default:
          return state;
  }
}