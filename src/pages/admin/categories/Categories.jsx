import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryStart, getCategoryStart } from '../../../redux/actions/category.action'

export default function Categories() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categories)

  useEffect(() => {
    dispatch(getCategoryStart())
  }, [categories.length])
  
  const deleteCategory = (category) => {
     dispatch(deleteCategoryStart(category))
  }
  
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Categories</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Categories</li>
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
                <h5>Category</h5>
                <Link to="/admin/category/create" className='btn btn-primary btn-sm text-white'>Add Category</Link>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.length > 0 && categories.map((category, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td><img src={category.image} /></td>
                          <td>{category.name}</td>
                          <td>{category.status === "1" ? 'Active' : 'inactive'}</td>
                          <td>
                            <Link to={`/admin/category/edit/${category.id}`} className='btn btn-warning btn-sm me-2'>Edit</Link>
                            <button className='btn btn-danger btn-sm' onClick={() => deleteCategory(category)}>Delete</button>
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
