import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'

export default function Profile() {
  const currentLoginedUser = useSelector(state => state.user.currentLoginedUser);

  console.log(currentLoginedUser)
  
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Profile</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Profile</li>
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
                <h5>Profile</h5>
                <Link to='/admin/profile/edit' className='btn btn-primary text-white'>Edit Profile</Link>
              </div>
              <div className="card-body">
               <h5>Name: {currentLoginedUser.name}</h5>
               <hr />
               <h5>Email: {currentLoginedUser.email}</h5>
               <hr />
               <h5>Image: <img className="img-fluid" style={{ width: '100px', height: '100px',objectFit: 'cover' }} src={currentLoginedUser.image} alt="" /></h5>
               <hr />
               <h5>Contact Number: {currentLoginedUser.contact}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
