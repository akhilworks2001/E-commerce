import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams,useNavigate } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { getOrderStart } from '../../../redux/actions/order.action';

export default function OrderView() {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = useSelector(state => state.order.orders);
  const dispatch = useDispatch();

  const getOrderById = (id) => {
    let order = orders.find(order => order.id === id);

    if (order) {
      setOrder(order);
    }else{
      navigate('/admin/order');
    }
  }

  useEffect(() => {
    dispatch(getOrderStart());
    getOrderById(id)
  }, [id])
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Orders</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Orders</li>
        </ol>
      </div>

      <div className='container my-4'>
        <div className='row'>
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="card" >
              <div className="card-header d-flex justify-content-between">
                <h5>Order #</h5>
                <Link to="/admin/order" className='btn btn-primary btn-sm text-white'>Back</Link>
              </div>
              <div className="card-body">
                <div className="">
                  <h5>Order Summary</h5>
                  <hr />
                  <p className="fw-bold">Sub Total : ${order?.subTotal}</p>
                  <p className="fw-bold">Tax Total : ${order?.tax}</p>
                  <p className="fw-bold">Grand Total : ${order?.grandTotal}</p>
                </div>

                <hr />

                <div className="">
                  <h5>Billing Summary</h5>
                  <hr />
                  <p className="fw-bold">Name : {order?.address?.name}</p>
                  <p className="fw-bold">Email : {order?.address?.email}</p>
                  <p className="fw-bold">Contact Number : {order?.address?.contact}</p>
                  <p className="fw-bold">Address : {order?.address?.address}</p>
                  <p className="fw-bold">City : {order?.address?.city}</p>
                  <p className="fw-bold">State : {order?.address?.state}</p>
                  <p className="fw-bold">Country : {order?.address?.country}</p>
                  <p className="fw-bold">Zip Code : {order?.address?.zipCode}</p>
                </div>
                <hr />

                <div className="">
                  <h5>Products</h5>
                  <hr />

                  <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      order?.items?.length > 0 && order?.items.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td><img src={product.image} alt="" /></td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.quantityPurchased}</td>
                          <td>${product.price * product.quantityPurchased}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
