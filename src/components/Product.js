import React from 'react'
import YourComponent from './YourComponent'



const Product = () => {

  return (
    <div>
       <div id='1'>
    
        <YourComponent productId={1} productName="Product 1" productPrice={200} />
      </div>
      <div id='2'>
    
        <YourComponent productId={2} productName="Product 2" productPrice={300} />
      </div>
      <div id='3'>
     
        <YourComponent productId={3} productName="Product 3" productPrice={500} />
      </div>
    </div>
  )
}

export default Product
