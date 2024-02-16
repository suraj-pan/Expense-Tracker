import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()
    
    const completeHandler =()=>{
        navigate("/updateProfile")
    }
    return (
        <div>
            <div>
                <h3>Welcome to the Board</h3>
            </div>
            <div>
                <h3>Your Profile is incomplete</h3>
                <button onClick={completeHandler} >Complete Now</button>
            </div>
        </div>
    )
}

export default Dashboard
