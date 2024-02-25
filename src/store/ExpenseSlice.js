import { createSlice } from "@reduxjs/toolkit";

const ExpenseSlice = createSlice({
    name: "expense",
    initialState: {
        expenses: [],
    },
    reducers: {
        addExpense: (state, action) => {
       
            state.expenses.push(action.payload)
            console.log(action.payload)
        },
        setExpense: (state, action) => {
            state.expenses = action.payload;
            console.log(action)
        },
        downloadexpenses: (state) => {
            console.log(state.expenses)
            const csvData = state.expenses.map(expense => `${expense.title},${expense.amount},${expense.description}`).join('/n');
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = "expense.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
})

export const { addExpense, setExpense,downloadexpenses } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;