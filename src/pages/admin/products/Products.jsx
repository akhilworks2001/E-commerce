import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductStart, getProductStart } from '../../../redux/actions/product.action';

export default function Products() {
  let products = useSelector(state => state.product.products)
  const dispatch = useDispatch();

  const deleteProduct = (product) => {
    dispatch(deleteProductStart(product))
  }

  useEffect(() => {
    dispatch(getProductStart())
  }, [products.length])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Products</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Products</li>
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
                <h5>Products</h5>
                <Link to="/admin/product/create" className='btn btn-primary btn-sm text-white'>Add Product</Link>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.length > 0 && products.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td><img src={product.image} alt="" /></td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.status === "1" ? 'Active' : 'inactive'}</td>
                          <td>
                            <Link to={`/admin/product/edit/${product.id}`} className='btn btn-warning btn-sm me-2'>Edit</Link>
                            <button className='btn btn-danger btn-sm' onClick={() => deleteProduct(product)}>Delete</button>
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
