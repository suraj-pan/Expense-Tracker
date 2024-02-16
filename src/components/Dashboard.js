import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()
    
    const completeHandler =()=>{
        navigate("/updateProfile")
    }
    return (
        <div className='flex pt-5 justify-center items-center mx-auto flex-col gap-2 bg-slate-200'>
            <div>
                <h2 className='text-3xl'>Welcome to the Board</h2>
            </div>
            <div className='flex gap-2'>
                <h3>Your Profile is incomplete</h3>
                <button className='bg-slate-800 text-white px-3 py-1 rounded-md' onClick={completeHandler} >Complete Now</button>
            </div>
            <div className='mt-4'>
                <h3 className=' text-center text-2xl'>Daily Expense Tracker</h3>
                <div>
                    <h4>Please enter the value of your daily expenses as you like</h4>
                    <form className='flex flex-col gap-2'>
                        <label>
                            Amount:
                        <input type='number' placeholder='enter the amount' />
                        </label>
                        <label>
                            Description:
                        <textarea type='text' placeholder='enter the description' />
                        </label>
                        <label>
                          Choose a  Category:
                            <select name='category'>
                                <option value="food">Food</option>
                                <option value="petrol">Petrol</option>
                                <option value="bill">Bill</option>
                                <option value="clothes">Clothes</option>
                            </select>
                        </label>
                        <button type='submit'>submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
