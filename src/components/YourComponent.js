import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updatedQunatity } from '../store/CartSlice';
import { NotificationManager} from 'react-notifications';

const YourComponent = ({ productId, productName, productPrice }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleAddToCart = async() => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
      dispatch(updatedQunatity({ id: productId, quantity: existingItem.quantity + 1 ,amount:productPrice }));

      try {
        const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/cart/${existingItem.id}.json`,{
          method:"PATCH",
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quantity:existingItem.quantity +1,
            amount:existingItem.amount + productPrice
          })
        })

        if(!response.ok){
          throw new Error("Failed to add item to cart");
        }

        const data = await response.json();
        console.log("Item added to cart", data);
        NotificationManager.success( 'Cart item send to backend');

      } catch (error) {
        console.error("Error adding item to cart", error);
        NotificationManager.warning('Error in sending data');
      }



    } else {
      dispatch(addToCart({ id: productId, quantity: 1,name:productName, amount:productPrice }));
      try {
        const response = await fetch("https://expense-tracker-65763-default-rtdb.firebaseio.com/cart.json",{
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            id:productId,
            quantity:1,
            name:productName,
            price:productPrice
          })
        })
  
        if(!response.ok){
          throw new Error("Failed to send data")
        }
        
        NotificationManager.success( 'Cart item send to backend');
        const data = await response.json();
        console.log("Item added to cart",data);
  
  
      } catch (error) {
        console.error("error in sending data",error)
        NotificationManager.warning('Error in sending data');
      }
    }

    };

  const handleRemoveFromCart = async() => {
    dispatch(removeFromCart(productId));

    try {
      const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/cart/${productId}.json`,{
        method:"DELETE"
      })

      if(!response.ok){
        throw new Error("Failed to delete the data")
      }

      NotificationManager.success( 'Cart item deleted to backend successfully');
      console.log("data deleted successfully")
    } catch (error) {
      console.error("Error in deleting data",error)
      NotificationManager.warning('Error in sending data');
    }
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