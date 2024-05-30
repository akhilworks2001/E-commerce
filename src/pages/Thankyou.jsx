import React from "react";
import { Link } from "react-router-dom";

export default function Thankyou() {
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Thank you</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Thank you</li>
        </ol>
      </div>

      <div className="global-container mt-5">
        <div className="card login-form">
          <div className="card-body text-center">
            <h3 className="text-center">
              Thank you for shopping with us.
            </h3>
            <Link to='/' className= 'btn btn-primary btn-lg mt-4 text-white'>Continue Shopping</Link>
          </div>
        </div>
      </div>
    </>
  );
};
