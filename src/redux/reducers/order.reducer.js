import { GET_ORDER_SUCCESS } from "../constants/order.constant";

const initialState = {
  orders: localStorage.getItem('orders') ?
      JSON.parse(localStorage.getItem('orders')) : [],
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ORDER_SUCCESS:
          return {
              ...state,
              orders: [...action.payload]
          };
      default:
          return state;
  }
}