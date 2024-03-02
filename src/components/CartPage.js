import React from 'react'
import { useSelector } from 'react-redux'

const CartPage = () => {

  const cartItems = useSelector(state=>state.cart.items);

  console.log(cartItems)
    
  return (
    <div className='w-[800px] mx-auto'>
    {cartItems.map(item=>(
      <div className='flex justify-between' key={item.id}>
        <span>{item.name}</span>
        <span>{item.quantity}</span>
        <span>{item.amount}</span>
      </div>
    ))}
    </div>
  )
}

export default CartPage
