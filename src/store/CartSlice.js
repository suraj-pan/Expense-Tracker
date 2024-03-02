import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name:"cart",
    initialState:{
        isVisible:false,
        items:[],
    
    },
    reducers:{
        toggleCartVisibility:(state)=>{
            state.isVisible = !state.isVisible;
            console.log(state.isVisible)
        },
        addToCart:(state,action)=>{
           const {id,quantity,amount,name} = action.payload;
           console.log(id,quantity,amount);
           const existingItem = state.items.find(item =>item.id === id);
          
           if(existingItem){
            existingItem.quantity += quantity; 
            existingItem.amount =  existingItem.quantity * amount;         
           }else{
            state.items.push({id,quantity,amount,name})
           }
           console.log("added cart", JSON.stringify(state.items) )
        },
        removeFromCart:(state,action)=>{
            const itemIdToRemove = action.payload;
            console.log(action.payload)
            state.items.filter(item =>item.id !== itemIdToRemove);
            console.log("remove cart", JSON.stringify(state.items) )
        },
        updatedQunatity: (state,action)=>{
            const {id,quantity,amount} =action.payload;
            console.log(action.payload)
            const existingItem = state.items.find(item=>item.id === id);

            if(existingItem){
                existingItem.quantity = quantity
                existingItem.amount =  existingItem.quantity * amount;  

            }
            console.log("updated cart", JSON.stringify(state.items) )
        }
    }
})

export const {toggleCartVisibility,addToCart,removeFromCart,updatedQunatity} = CartSlice.actions;
export default CartSlice.reducer;