import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updatedQunatity } from '../store/CartSlice';

const YourComponent = ({ productId, productName, productPrice }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleAddToCart = () => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
      dispatch(updatedQunatity({ id: productId, quantity: existingItem.quantity + 1 ,amount:productPrice }));
    } else {
      dispatch(addToCart({ id: productId, quantity: 1,name:productName, amount:productPrice }));
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className='flex justify-between'>
      <h3>{productName}</h3>
      <p>Price: ${productPrice}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleRemoveFromCart}>Remove from Cart</button>
    </div>
  );
};

export default YourComponent;