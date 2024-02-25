import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/Auth'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/AuthSlice';

const Header = () => {

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state)=>state.auth.token)
  const expenses = useSelector(state=>state.expenses.expenses);
  console.log(expenses)
  const totalExpenses = expenses.reduce((total,expense)=> total + Number(expense.expenseAmount) ,0)

  console.log(token)


  const logoutHandler =()=>{
    // authCtx.logout()
    dispatch(logout())
    navigate("/login");
  }

  

  return (
    <div className='flex justify-between bg-slate-300 py-2'>
      <div>Expense Tracker</div>
      <div className='flex justify-between gap-3'>
        <NavLink  to='/login' >Login</NavLink>
        <NavLink to="/signUp">SignUp</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {totalExpenses > 10000 && (
          <button>Activate Premium </button>
        )}
      {token && (  <div>
        <button onClick={logoutHandler} >logout</button>
        </div>)}
      </div>
      <div></div>
    </div>
  )
}

export default Header
