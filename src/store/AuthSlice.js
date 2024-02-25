import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn:false,
        token:null,
        userId:null
    },
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            state.token =action.payload.idToken;
            state.userId =action.payload.email;
            console.log(state.token,state.userId)
        },
        logout:(state)=>{
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
        }
    }
})

export const  {login,logout} = authSlice.actions;
export default authSlice.reducer;