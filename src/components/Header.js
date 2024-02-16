import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/Auth'

const Header = () => {

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()

  const logoutHandler =()=>{
    authCtx.logout()
    navigate("/login");
  }

  

  return (
    <div className='flex justify-between bg-slate-300 py-2'>
      <div>Expense Tracker</div>
      <div className='flex justify-between gap-3'>
        <NavLink  to='/login' >Login</NavLink>
        <NavLink to="/signUp">SignUp</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      {authCtx.token && (  <div>
        <button onClick={logoutHandler} >logout</button>
        </div>)}
      </div>
      <div></div>
    </div>
  )
}

export default Header
