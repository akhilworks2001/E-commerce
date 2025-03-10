import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Auth from '../pages/admin/Auth'
import Profile from '../pages/admin/dashboard/Profile'
import ProfileEdit from '../pages/admin/dashboard/ProfileEdit'
import Orders from '../pages/admin/orders/Orders'
import OrderView from '../pages/admin/orders/OrderView'
import Products from '../pages/admin/products/Products'
import ProductAddOrEdit from '../pages/admin/products/ProductAddOrEdit'
import Categories from '../pages/admin/categories/Categories'
import CategoryAddOrEdit from '../pages/admin/categories/CategoryAddOrEdit'
import Users from '../pages/admin/users/Users'
import UserAddOrEdit from '../pages/admin/users/UserAddOrEdit'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Thankyou from '../pages/Thankyou'

export default function Router() {
  return (
    <Routes>
        {/* home page */}
        <Route path='/' element={<Home />} />

        {/* product details */}
        <Route path='/product-details/:id' element={<ProductDetail />} />

        {/* cart */}
        <Route path='/cart' element={<Cart />} />

        {/* checkout */}
        <Route path='/checkout' element={<Checkout />} />

        {/* register */}
        <Route path='/register' element={<Register />} />

        {/* login */}
        <Route path='/login' element={<Login />} />

        {/* thank you */}
        <Route path='/thank-you' element={<Thankyou />} />
        

        {/* admin */}
        <Route path='/admin' element={<Auth />}>
            {/* dashboard */}
            <Route path='' element={<Profile />} />
            <Route path='profile/edit' element={<ProfileEdit />} />

            {/* orders */}
            <Route path='order'>
                <Route path='' element={<Orders />} />
                <Route path='view/:id' element={<OrderView />} />
            </Route>

            {/* products */}
            <Route path='product'>
                <Route path='' element={<Products />} />
                <Route path='create' element={<ProductAddOrEdit />} />
                <Route path='edit/:id' element={<ProductAddOrEdit />} />
            </Route>

            {/* category */}
            <Route path='category'>
                <Route path='' element={<Categories />} />
                <Route path='create' element={<CategoryAddOrEdit />} />
                <Route path='edit/:id' element={<CategoryAddOrEdit />} />
            </Route>

            {/* users */}
            <Route path='user'>
                <Route path='' element={<Users />} />
                <Route path='create' element={<UserAddOrEdit />} />
                <Route path='edit/:id' element={<UserAddOrEdit />} />
            </Route>
        </Route>
    </Routes>
  )
}
