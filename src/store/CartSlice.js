import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name:"cart",
    initialState:{
        isVisible:false,
    },
    reducers:{
        toggleCartVisibility:(state)=>{
            state.isVisible = !state.isVisible;
        }
    }
})

export const {toggleCartVisibility} = CartSlice.actions;
export default CartSlice.reducer;