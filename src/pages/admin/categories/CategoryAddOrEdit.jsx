import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryStart, updateCategoryStart } from '../../../redux/actions/category.action'
import { useFormData } from '../../../hooks/useFormData';

const initialState = {
  name: '',
  image: '',
  status: 0
}

export default function CategoryAddOrEdit() {
  const categories = useSelector(state => state.category.categories)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let [formData, setFormData, uploadImage, inputChange, uploadFile] = useFormData(initialState, 'category')

  let { name, image, status } = formData;

  const submit = (event) => {
    event.preventDefault()

    if (id) {
      dispatch(updateCategoryStart(formData))
    } else {
      dispatch(addCategoryStart(formData))
    }

    setTimeout(() => {
      navigate("/admin/category")
    }, 1000)
  }

  const getCategoryById = (id) => {
    let category = categories.find(category => category.id === id)

    if (category) {
      setFormData(category)
    } else {
      navigate("/admin/category")
    }
  }

  useEffect(() => {
    if (id)
      getCategoryById(id)
  }, [id])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Add Category</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Add Category</li>
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
                <Link to="/admin/category" className='btn btn-primary btn-sm text-white'>Back</Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Category Name"
                      value={name}
                      name='name'
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Category Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"

                      name='image'
                      onChange={uploadFile} />
                    {image && <div className='mt-2'>
                      <img src={image} />
                    </div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Category Status</label>
                    <select
                      name="status"
                      id="status"
                      className='form-control'
                      value={status}
                      onChange={inputChange}>
                      <option value="" hidden>Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  <div className='row'>
                    <div className="col-sm-6 d-grid">
                      <button type='submit' className='btn btn-primary text-white' disabled={uploadImage}>Submit</button>
                    </div>
                    <div className="col-sm-6 d-grid">
                      <button type='reset' className='btn btn-warning text-white' disabled={uploadImage}>Reset</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
