import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Auth() {
  const currentLoginedUser = useSelector(state => state.user.currentLoginedUser);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentLoginedUser.name) {
      navigate('/login');
    } 
  }, [currentLoginedUser.name]);

  return (
    <>
        <Outlet />
    </>
  )
}
