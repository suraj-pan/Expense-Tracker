import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
 const auth = useSelector(state=>state.auth.isLoggedIn)
//  console.log(auth)
 if(auth){
    return children
 }else{
    return <Navigate to="/login" />
 }
}

export default ProtectedRoute
