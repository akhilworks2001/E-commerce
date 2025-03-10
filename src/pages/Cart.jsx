import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem';
export default function Cart() {

    const currentLogindedUser = useSelector(state => state.user.currentLoginedUser);
    const currentCart = useSelector(state => state.cart.currentCart);

    const navigate = useNavigate();

    useEffect (() => {
      if(!currentLogindedUser.name) {
        navigate('/login')
    }
    }, []);
  return (
    <>
    <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Cart</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active text-white">Cart</li>
            </ol>
        </div>

        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Products</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Handle</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            currentCart.items.length > 0 && currentCart.items.map((item, index) => (
                           <CartItem key={index} data={item} /> 
                            ))
                          }
                        </tbody>
                    </table>
                </div>
               
                <div className="row g-4 justify-content-end">
                    <div className="col-8"></div>
                    <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                        <div className="bg-light rounded">
                            <div className="p-4">
                                <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="mb-0 me-4">Subtotal:</h5>
                                    <p className="mb-0">$ {currentCart.subTotal.toFixed(2)}</p>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="mb-0 me-4">Tax</h5>
                                        <p className="mb-0">$ {currentCart.tax.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                <h5 className="mb-0 ps-4 me-4">Total</h5>
                                <p className="mb-0 pe-4">$ {currentCart.grandTotal.toFixed(2)}</p>
                            </div>
                            <Link className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" to='/checkout' type="button">Proceed Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
