import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutItem from "../components/CheckoutItem";
import { useFormData } from "../hooks/useFormData";
import { placeOrderStart } from "../redux/actions/order.action";

const initialState = {
  name: "",
  companyName: "",
  address: "",
  city: "",
  country: "",
  zipCode: "",
  contact: "",
  email: "",
};

export default function Checkout() {
  
  const [formData, setFormData, , inputChange] = useFormData(initialState, "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let {
    name,
    companyName,
    address,
    city,
    country,
    zipCode,
    contact,
    email,
  } = formData;
  
  const currentCart = useSelector((state) => state.cart.currentCart);
  console.log(currentCart)
  const submit = (event) => {
    event.preventDefault();
    dispatch(placeOrderStart({...currentCart, address: formData}))

    setTimeout(() => {
      navigate('/thank-you');
    }, 1500)
  };

  const getCustomerData = () => {
    if (currentCart) {
      setFormData((prev) => ({
        ...prev,
        name: currentCart.customer.name || '',
        email: currentCart.customer.email || '',
        contact: currentCart.customer.contact || ''
      }))
    }
  }

  useEffect(() => {
    getCustomerData();
  }, [currentCart.customer.name]);

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Checkout</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Checkout</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Billing details</h1>
          <form onSubmit={submit}>
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">
                <div className="form-item">
                  <label className="form-label my-3">
                    Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={inputChange}
                  />
                </div>

                <div className="form-item">
                  <label className="form-label my-3">
                    Company Name<sup>*</sup>
                  </label>
                  <input 
                    className="form-control"
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={inputChange}
                    />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Address <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="House Number Street Name"
                    name="address"
                    value={address}
                    onChange={inputChange}
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Town/City<sup>*</sup>
                  </label>
                  <input 
                    className="form-control" 
                    name="city"
                    value={city}
                    onChange={inputChange}
                    />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Country<sup>*</sup>
                  </label>
                  <input 
                  className="form-control" 
                  name="country"
                    value={country}
                    onChange={inputChange}
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Postcode/Zip<sup>*</sup>
                  </label>
                  <input 
                  className="form-control" 
                  type="number"
                  name="zipCode"
                    value={zipCode}
                    onChange={inputChange} 
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Mobile<sup>*</sup>
                  </label>
                  <input 
                  className="form-control" 
                  type="number" 
                  name="contact"
                    value={contact}
                    onChange={inputChange}
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Email Address<sup>*</sup>
                  </label>
                  <input className="form-control" 
                  type="email"
                  name="email"
                    value={email}
                    onChange={inputChange}
                   />
                </div>
                <div className="form-check my-3">
                  <input type="checkbox" className="form-check-input" />
                  <label className="form-check-label" htmlFor="Account-1">
                    Create an account?
                  </label>
                </div>
                <hr />
                <div className="form-check my-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Address-1"
                    name="Address"
                    value="Address"
                  />
                  <label className="form-check-label" htmlFor="Address-1">
                    Ship to a different address?
                  </label>
                </div>
                <div className="form-item">
                  <textarea
                    name="text"
                    className="form-control"
                    spellCheck="false"
                    cols="30"
                    rows="11"
                    placeholder="Oreder Notes (Optional)"
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Products</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCart.items.length > 0 &&
                        currentCart.items.map((item, index) => (
                          <CheckoutItem key={index} data={item} />
                        ))}
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-3">Subtotal</p>
                        </td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">
                              $ {currentCart.subTotal}
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-3">Tax</p>
                        </td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">
                              $ {currentCart.tax}
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-4">Shipping</p>
                                            </td>
                                            <td colspan="3" className="py-5">
                                                <div className="form-check text-start">
                                                    <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-1" name="Shipping-1" value="Shipping" />
                                                    <label className="form-check-label" htmlFor="Shipping-1">Free Shipping</label>
                                                </div>
                                                <div className="form-check text-start">
                                                    <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-2" name="Shipping-1" value="Shipping" />
                                                    <label className="form-check-label" htmlFor="Shipping-2">Flat rate: $15.00</label>
                                                </div>
                                                <div className="form-check text-start">
                                                    <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-3" name="Shipping-1" value="Shipping" />
                                                    <label className="form-check-label" htmlFor="Shipping-3">Local Pickup: $8.00</label>
                                                </div>
                                            </td>
                                        </tr> */}
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5">
                          <p className="mb-0 text-dark text-uppercase py-3">
                            TOTAL
                          </p>
                        </td>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">
                              ${currentCart.grandTotal}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Transfer-1"
                        name="Transfer"
                        value="Transfer"
                      />
                      <label className="form-check-label" htmlFor="Transfer-1">
                        Direct Bank Transfer
                      </label>
                    </div>
                    <p className="text-start text-dark">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Payments-1"
                        name="Payments"
                        value="Payments"
                      />
                      <label className="form-check-label" htmlFor="Payments-1">
                        Check Payments
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Delivery-1"
                        name="Delivery"
                        value="Delivery"
                      />
                      <label className="form-check-label" htmlFor="Delivery-1">
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Paypal-1"
                        name="Paypal"
                        value="Paypal"
                      />
                      <label className="form-check-label" htmlFor="Paypal-1">
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button
                    type="submit"
                    className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
