import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { getOrderStart } from '../../../redux/actions/order.action';

export default function Orders() {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.order.orders); 
  console.log(orders);

  useEffect(() => {
    dispatch(getOrderStart());
  }, [orders.length])
  
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Orders</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Orders</li>
        </ol>
      </div>

      <div className='container mt-4'>
        <div className='row'>
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="card" >
              <div className="card-header d-flex justify-content-between">
                <h5>Orders</h5>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Sub Total</th>
                      <th>Tax</th>
                      <th>Grand Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.length > 0 && orders.map((order, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{order.customer.name}</td>
                          <td>${order.subTotal}</td>
                          <td>${order.tax}</td>
                          <td>${order.grandTotal}</td>
                          <td>
                            <Link to={`/admin/order/view/${order.id}`} className='btn btn-info btn-sm me-2'>view</Link>
                          </td>
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
    </>
  )
}
