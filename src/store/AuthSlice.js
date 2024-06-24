import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn:localStorage.getItem("token")?true:false,
        token:null,
        userId:null
    },
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            state.token =action.payload.idToken;
            state.userId =action.payload.email;
            console.log(state.token,state.userId)
            localStorage.setItem("token",action.payload.idToken)
            localStorage.setItem("email",action.payload.email)
        },
        logout:(state)=>{
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            localStorage.removeItem("token")
            localStorage.removeItem("email")
        }
    }
})

export const  {login,logout} = authSlice.actions;
export default authSlice.reducer;