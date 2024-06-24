import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {addExpense,setExpense} from "../store/ExpenseSlice"

const Dashboard = () => {

    const navigate = useNavigate();
    const amount = useRef();
    const description = useRef();
    const category = useRef();
    const [Data,setdata]= useState([]);
    const [editingExpense,setEditingExpense] = useState(null);
    const dispatch = useDispatch();
    const mail = useSelector(state=>state.auth.userId)
    console.log( mail)
  const email = mail.split("@")[0]
    
   

    
    
    const completeHandler =()=>{
        navigate("/updateProfile")
    }

    const submitHandler= async(e)=>{
        e.preventDefault();

        if(editingExpense){
            // console.log(editingExpense)
            const editData =async(category,amount,description)=>{

                console.log(category,amount,description,editingExpense.id)
                try {
                    const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/expense/${email}/${editingExpense.id}.json`,{
                        method:"PUT",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        body:JSON.stringify({
                            category:category,
                            amount:amount,
                            description:description
                        })
                    })
    
                    if(!response.ok){
                        alert("error in updating data");
                    }

          
                 
                    console.log(category,amount,description)
                    setEditingExpense(null);
                    dispatch(setExpense({
                        id:editingExpense.id,
                        category:category,
                        amount:amount,
                        description:description
                    }))
                    getData();
    
                } catch (error) {
                    console.error("Error",error);
                }
            }
            editData(category.current.value,amount.current.value,description.current.value)
        }else{
            const sendData = async (expenseAmount,expenseDescription,expenseCategory)=>{

                console.log(expenseAmount,expenseCategory,expenseDescription)
                    try {
                        const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/expense/${email}.json`,{
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
                        // console.log(data)
                    dispatch(addExpense({expenseAmount,expenseCategory,expenseDescription}))

                        getData()
                    } catch (error) {
                        console.error("Error",error)
                    }
            }
            sendData(amount.current.value,description.current.value,category.current.value)
        }
        amount.current.value="";
        description.current.value ="";
        category.current.value ="food";

    }

    const getData = async()=>{
       try {
        const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/expense/${email}.json`);

        const data = await response.json()
        let convertedData = []
        if(data){
          convertedData=  Object.entries(data).map(([id,data])=>({id,...data}))
        }

        setdata(convertedData || [])

       } catch (error) {
        console.error("error",error)
       }
    }
    
   
    useEffect(()=>{
        getData()
    },[])

    // console.log(Data)

    const deleteHandler = async (id)=>{
            console.log(id)
          try {
            const deleteData = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/expense/${email}/${id}.json`,{
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

        setEditingExpense(expense);

    }

    return (
       
        <div className="relative flex pt-5 justify-center items-center w-full mx-auto flex-col gap-2 p-8 ">
        <div className="absolute top-0 right-1 mt-2">
            <div className="flex gap-2">
                <h3 className="text-sm">Your Profile is incomplete</h3>
                <button className="bg-blue-200 px-2 py-1 rounded-md text-xs" onClick={completeHandler}>Complete Now</button>
            </div>
        </div>
        <div>
            <h2 className="text-3xl text-center">Welcome to the Board</h2>
        </div>
    
        <div className="mt-4 mb-6 border border-blue-900 rounded-lg p-6 bg-white shadow-lg w-full max-w-md">
            <h3 className="text-center text-2xl mb-4 text-black">Daily Expense Tracker</h3>
            <div>
                <h4 className="mb-4 text-black">Please enter the value of your daily expenses as you like</h4>
                <form className="flex flex-col gap-4" onSubmit={submitHandler}>
                    <div className="flex flex-col">
                        <label className="text-sm text-black">Amount:</label>
                        <input
                            type="number"
                            ref={amount}
                            placeholder="Enter the amount"
                            className={`border border-gray-300 rounded-md p-2 text-gray-900`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-black">Description:</label>
                        <textarea
                            type="text"
                            ref={description}
                            placeholder="Enter the description"
                            className="border border-gray-300 rounded-md p-2 text-gray-900"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-black">Choose a Category:</label>
                        <select name="category" ref={category} className="border border-gray-300 rounded-md p-2 text-gray-900">
                            <option value="food">Food</option>
                            <option value="petrol">Petrol</option>
                            <option value="bill">Bill</option>
                            <option value="clothes">Clothes</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-slate-900 text-white rounded-md p-2 hover:bg-slate-800 focus:outline-none">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    
        <div className="w-full max-w-md">
            <h3 className="text-2xl mb-2 text-center">Your expense Data :</h3>
            {Data.length > 0 ? (
                Data.map((expense, index) => (
                    <div key={index} className="border border-gray-300 rounded-md p-3 mb-3 flex items-center justify-between bg-white shadow-md">
                        <div className="flex flex-col sm:flex-row gap-3 text-black">
                            <div>{expense.category}</div>
                            <div>{expense.description}</div>
                            <div>{expense.amount}</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => editExpense(expense)} className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 focus:outline-none">
                                Edit
                            </button>
                            <button onClick={() => deleteHandler(expense.id)} className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 focus:outline-none">
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center">No data available here...</div>
            )}
        </div>
    </div>
    
        
        
        
    )
}

export default Dashboard
