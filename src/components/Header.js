import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/AuthSlice';
import { toggleTheme } from '../store/ThemeSlice';
import { downloadexpenses } from '../store/ExpenseSlice';
import { MdDarkMode } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { toggleCartVisibility } from '../store/CartSlice';


const Header = () => {

  // const authCtx = useContext(AuthContext);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state)=>state.auth.isLoggedIn)
  const expenses = useSelector(state=>state.expenses.expenses);
  // console.log(token)
  // const totalExpenses = expenses.reduce((total,expense)=> total + Number(expense.expenseAmount) ,0)
  

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

  const handlecart =()=>{
    dispatch(toggleCartVisibility())
    navigate("/cart")
  }

  

  return (
    <div className='flex justify-between bg-slate-300 py-2'>
      <div>Expense Tracker</div>
      <div className='flex justify-between gap-3'>
      {!token && (
       <>
       <NavLink  to='/login' >Login</NavLink>
        <NavLink to="/signUp">SignUp</NavLink>
       </>
      )}
      
        {/* {totalExpenses > 10000 && (
          <button>Activate Premium </button>
        )} */}
      {token && (  <div className='flex gap-2'>
      <NavLink to="/dashboard">Dashboard</NavLink>
        {/* <NavLink to="/product">Product</NavLink> */}
        <button onClick={handleThemeMode} ><MdDarkMode /></button>
        <button onClick={handleDownloadexpenses} ><FaCloudDownloadAlt /></button>
        {/* <button onClick={handlecart} ><FaShoppingCart /></button> */}

        <button onClick={logoutHandler} >logout</button>
        </div>)}
      </div>
      <div></div>
    </div>
  )
}

export default Header
