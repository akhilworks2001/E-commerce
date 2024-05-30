import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUserStart } from '../redux/actions/user.action';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logoutUserStart());

    setTimeout(() => {
      navigate('/login');
    })
  }
  return (
    <ul className="list-group">
      <li className="list-group-item active" aria-current="true">Menu</li>
      <li className="list-group-item">
        <Link to="/admin">Profile</Link>
      </li>
      <li className="list-group-item">
        <Link to="/admin/order">Order</Link>
      </li>
      <li className="list-group-item">
        <Link to="/admin/category">Category</Link>
      </li>
      <li className="list-group-item">
        <Link to="/admin/product">Product</Link>
      </li>
      <li className="list-group-item">
        <Link to="/admin/user">User</Link>
      </li>

      <li className="list-group-item">
        <Link onClick={logoutUser}>Logout</Link>
      </li>
    </ul>
  )
}
