import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ExpenseReducer from "./ExpenseSlice";
import PremiumReducer from "./PremiumSlice";
import ThemeReducer from "./ThemeSlice";



const store = configureStore({
    reducer:{
        auth:AuthReducer,
        expenses:ExpenseReducer,
        premium:PremiumReducer,
        theme:ThemeReducer
    }
})

export default store;