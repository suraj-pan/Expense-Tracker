import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-between'>
      <div>Expense Tracker</div>
      <div className='flex justify-between gap-3'>
        <NavLink  to='/login' >Login</NavLink>
        <NavLink to="/signUp">SignUp</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
      <div></div>
    </div>
  )
}

export default Header
