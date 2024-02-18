import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate();
    const amount = useRef();
    const description = useRef();
    const category = useRef();
    const [Data,setdata]= useState([]);
    
    const completeHandler =()=>{
        navigate("/updateProfile")
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        const sendData = async(expenseAmount,expenseDescription,expenseCategory)=>{

            console.log(expenseAmount,expenseAmount,expenseDescription)
                try {
                    const response = await fetch('https://expense-tracker-65763-default-rtdb.firebaseio.com/expense.json',{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            category:expenseCategory,
                            description:expenseDescription,
                            amount:expenseAmount
                        })
                    });

                    if (!response.ok) {
                      throw new Error('Failed to fetch expenses');
                    }
            
                    const data = await response.json();
                    console.log(data)
                    getData()
                } catch (error) {
                    console.error("Error",error)
                }
        }
        sendData(amount.current.value,description.current.value,category.current.value)
        amount.current.value="";
        description.current.value ="";
        category.current.value ="";

    }

    const getData = async()=>{
       try {
        const response = await fetch("https://expense-tracker-65763-default-rtdb.firebaseio.com/expense.json");

        const data = await response.json()
        // console.log(Object.entries(data).map(([id,data])=>({id,...data})) )

        setdata(Object.entries(data).map(([id,data])=>({id,...data})))

       } catch (error) {
        console.error("error",error)
       }
    }
    
   
    useEffect(()=>{
        getData()
    },[])

    console.log(Data)

    const deleteHandler = async (id)=>{
            console.log(id)
          try {
            const deleteData = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/expense/${id}.json`,{
                method:"DELETE",});

                if(deleteData.ok){
                    alert("expense deleted successfully")
                    getData()
                }
          } catch (error) {
            console.error("error",error)
          }

                
    }

    const editExpense =(expense)=>{

        console.log(expense)
        amount.current.value = expense.amount;
        description.current.value = expense.description;
        category.current.value= expense.category;

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
            <div className='mt-4 mb-6'>
                <h3 className=' text-center text-2xl'>Daily Expense Tracker</h3>
                <div>
                    <h4>Please enter the value of your daily expenses as you like</h4>
                    <form className='flex flex-col gap-2' onSubmit={submitHandler} >
                        <label>
                            Amount:
                        <input type='number' ref={amount} placeholder='enter the amount' />
                        </label>
                        <label>
                            Description:
                        <textarea type='text' ref={description} placeholder='enter the description' />
                        </label>
                        <label>
                          Choose a  Category:
                            <select name='category' ref={category} >
                                <option value="food">Food</option>
                                <option value="petrol">Petrol</option>
                                <option value="bill">Bill</option>
                                <option value="clothes">Clothes</option>
                            </select>
                        </label>
                        <button type='submit' className='bg-slate-900 rounded-md text-white'>submit</button>
                    </form>
                </div>
            </div>
         <div>
         <h3 className='text-2xl'>Your expense Data :</h3>
         {Data.length > 0 ?(
            Data.map((expense,index)=>(
                <div key={index} className='flex gap-3'>
                    <div>{expense.category}</div>
                    <div>{expense.description}</div>
                    <div>{expense.amount}</div>
                    <div className='flex gap-2'>
                        <button onClick={()=>editExpense(expense)} >Edit</button>
                        <button onClick={()=>deleteHandler(expense.id)} >Delete</button>
                    </div>
                </div>
            ))
         ):(<div>No data available here...</div>)}
         </div>
          
        </div>
    )
}

export default Dashboard
