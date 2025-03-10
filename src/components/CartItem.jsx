import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../hooks/useCart";
import { addCartStart } from "../redux/actions/cart.action";

export default function CartItem({ data }) {
  const currentLogindedUser = useSelector((state) => state.user.currentLoginedUser);
  const currentCart = useSelector((state) => state.cart.currentCart);
  const dispatch = useDispatch();

  let [quantity, setQuantity] = useState(data.quantityPurchased);
  let [, updateCart, removeItem] = useCart({ ...currentCart }, { ...currentLogindedUser });

  const incrementQuantity = () => {
    setQuantity(quantity + 1);

    let response = updateCart(data, quantity + 1);

    dispatch(addCartStart(response));
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);

      let response = updateCart(data, quantity - 1);

      dispatch(addCartStart(response));
    }
  };

  const remove = () => {
   let response = removeItem(data);

   dispatch(addCartStart(response))
  };

  return (
    <tr>
      <th scope="row">
        <div className="d-flex align-items-center">
          <img
            src={data.image}
            className="img-fluid me-5 rounded-circle"
            style={{ width: "80px", height: "80px" }}
            alt=""
          />
        </div>
      </th>
      <td>
        <p className="mb-0 mt-4">{data.name}</p>
      </td>
      <td>
        <p className="mb-0 mt-4">$ {data.price}</p>
      </td>
      <td>
        <div className="input-group quantity mt-4" style={{ width: "100px" }}>
          <div className="input-group-btn">
            <button
              onClick={decrementQuantity}
              className="btn btn-sm btn-minus rounded-circle bg-light border"
            >
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <input
            type="text"
            className="form-control form-control-sm text-center border-0"
            value={quantity}
            disabled
            onChange={() => {}}
          />
          <div className="input-group-btn">
            <button
              onClick={incrementQuantity}
              className="btn btn-sm btn-plus rounded-circle bg-light border"
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </td>
      <td>
        <p className="mb-0 mt-4">$ {+data.price * data.quantityPurchased}</p>
      </td>
      <td>
        <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={remove}>
          <i className="fa fa-times text-danger"></i>
        </button>
      </td>
    </tr>
  );
}
