import React from "react";

export default function CheckoutItem({data}) {
  return (
    <tr>
      <th scope="row">
        <div className="d-flex align-items-center mt-2">
          <img
            src={data.image}
            className="img-fluid rounded-circle"
            style={{ height: "90px", width: "90px" }}
            alt=""
          />
        </div>
      </th>
      <td className="py-5">{data.name}</td>
      <td className="py-5">$ {data.price}</td>
      <td className="py-5">{data.quantityPurchased}</td>
      <td className="py-5">$ {+data.price * +data.quantityPurchased}</td>
    </tr>
  );
}
