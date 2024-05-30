import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useFormData } from '../../../hooks/useFormData';
import { addUserStart, updateUserStart } from '../../../redux/actions/user.action'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase-config';


const initialState = {
  name: '',
  image: '',
  email: '',
  contact: '',
  password: '',
  status: 0
}

export default function UserAddOrEdit() {
  const users = useSelector(state => state.user.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let [formData, setFormData, uploadImage, inputChange, uploadFile] = useFormData(initialState, 'user')

  let { name, image, password, email, contact, status } = formData;

  const submit = (event) => {
    event.preventDefault()

    if (id) {
      dispatch(updateUserStart(formData))
    } else {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          let uid = userCredential.user.uid

          dispatch(addUserStart({...formData, uid: uid}))
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

    setTimeout(() => {
      navigate("/admin/user")
    }, 1000)
  }

  const getUserById = (id) => {
    let user = users.find(user => user.id === id)

    if (user) {
      setFormData(user)
    } else {
      navigate("/admin/user")
    }
  }

  useEffect(() => {
    if (id)
      getUserById(id)
  }, [id])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">{id ? 'Edit' : "Add"} User</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">{id ? 'Edit' : "Add"} User</li>
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
                <h5>{id ? 'Edit' : "Add"} User</h5>
                <Link to="/admin/user" className='btn btn-primary btn-sm text-white'>Back</Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="User Name"
                      value={name}
                      name='name'
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">user Image</label>
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
                    <label htmlFor="email" className="form-label">User Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="User email"
                      value={email}
                      name='email'
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">User password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="User password"
                      value={password}
                      name='password'
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">User contact</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      placeholder="User contact"
                      value={contact}
                      name='contact'
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">User Status</label>
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
