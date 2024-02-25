import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ExpenseReducer from "./ExpenseSlice";
import PremiumReducer from "./PremiumSlice";



const store = configureStore({
    reducer:{
        auth:AuthReducer,
        expenses:ExpenseReducer,
        premium:PremiumReducer
    }
})

export default store;