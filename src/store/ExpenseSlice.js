import { createSlice } from "@reduxjs/toolkit";

const ExpenseSlice = createSlice({
    name:"expense",
    initialState:{
        expenses:[],
    },
    reducers:{
        addExpense:(state,action)=>{
            console.log(action.payload)
           state.expenses.push(action.payload)
          
        },
        setExpense:(state,action)=>{
            state.expenses = action.payload;
            console.log(action)
        }
    }
})

export const {addExpense,setExpense}= ExpenseSlice.actions;
export default ExpenseSlice.reducer;