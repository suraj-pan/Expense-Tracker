import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/Auth'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/AuthSlice';
import { toggleTheme } from '../store/ThemeSlice';
import { downloadexpenses } from '../store/ExpenseSlice';
import { MdDarkMode } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";


const Header = () => {

  // const authCtx = useContext(AuthContext);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state)=>state.auth.token)
  const expenses = useSelector(state=>state.expenses.expenses);
  console.log(expenses)
  const totalExpenses = expenses.reduce((total,expense)=> total + Number(expense.expenseAmount) ,0)
  const darkMode = useSelector(state=>state.theme.darkMode)

  const logoutHandler =()=>{
    // authCtx.logout()
    dispatch(logout())
    navigate("/login");
  }

  const handleThemeMode =()=>{
    dispatch(toggleTheme());
  }

  const handleDownloadexpenses =()=>{
    dispatch(downloadexpenses());
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

        <button onClick={handleThemeMode} ><MdDarkMode /></button>
        <button onClick={handleDownloadexpenses} ><FaCloudDownloadAlt /></button>
        <button onClick={logoutHandler} >logout</button>
        </div>)}
      </div>
      <div></div>
    </div>
  )
}

export default Header
