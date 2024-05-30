import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useFormData } from '../../../hooks/useFormData'
import { useSelector, useDispatch } from 'react-redux'
import { getCategoryStart } from './../../../redux/actions/category.action';
import { addProductStart, updateProductStart } from '../../../redux/actions/product.action'

const initialState = {
  name: '',
  slug: '',
  shortDescription: '',
  description: '',
  price: 0,
  quantity: 1,
  category: '',
  image: '',
  status: '',
}

export default function ProductAddOrEdit() {
  const categories = useSelector(state => state.category.categories)
  const products = useSelector(state => state.product.products)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();

  let [formData, setFormData, uploadImage, inputChange, uploadFile] = useFormData(initialState, 'product')

  let { name, slug, shortDescription, description, price, quantity, category, image, status } = formData;

  const submit = (event) => {
    event.preventDefault()

    if(id) {
      dispatch(updateProductStart(formData))
    }else {
      dispatch(addProductStart(formData))
    }

    setTimeout(() => {
      navigate("/admin/product")
    }, 1000)
  }

  const getProductById = (id) => {
    let product = products.find(product => product.id === id)

    if (product) {
      setFormData(product)
    } else {
      navigate("/admin/product")
    }
  }

  useEffect(() => {
    dispatch(getCategoryStart())
    if (id)
      getProductById(id)
  }, [categories.length])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">{id ? 'Edit' : "Add"} Product</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">{id ? 'Edit' : "Add"}  Product</li>
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
                <h5>{id ? 'Edit' : "Add"}  Product</h5>
                <Link to="/admin/product" className='btn btn-primary btn-sm text-white'>Back</Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Product Name"
                      value={name}
                      name='name'
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Product Slug</label>
                    <input
                      type="text"
                      className="form-control"
                      id="slug"
                      placeholder="Product Slug"
                      value={slug}
                      name='slug'
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="shortDescription" className="form-label">Product Short Description</label>
                    <textarea name="shortDescription" id="shortDescription" rows="5" className='form-control' value={shortDescription} onChange={inputChange}></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Product Description</label>
                    <textarea name="description" id="description" rows="10" className='form-control' value={description} onChange={inputChange}></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Product price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      placeholder="Product price"
                      value={price}
                      name='price'
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Product quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      placeholder="Product quantity"
                      value={quantity}
                      name='quantity'
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Product Image</label>
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
                    <label htmlFor="category" className="form-label">Product Category</label>
                    <select
                      name="category"
                      id="category"
                      className='form-control'
                      value={category}
                      onChange={inputChange}>
                      <option value="" hidden>Select category</option>
                      {
                        categories.length > 0 && categories.map((cat, index) => {
                          if (cat.status === '1') {
                            return <option key={index}>{cat.name}</option>
                          }
                        })
                      }
                    </select>
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
