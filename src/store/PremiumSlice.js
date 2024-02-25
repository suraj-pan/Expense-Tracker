import { createSlice } from "@reduxjs/toolkit";


const premiumSlice = createSlice({
    name:"premium",
    initialState:{
        isPremiumActivated:false,
    },
    reducers:{
        activatePremium:(state)=>{
            state.isPremiumActivated = true
        }
    }
})

export const {activatePremium} = premiumSlice.actions;
export default premiumSlice.reducer;