import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import { BsCartX } from "react-icons/bs";
import CartItems from "../cartItmes/CartItems";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";


import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

function Cart({ onClose }) {
  // here we created a overlay when cart is opened and it turns the bg little darker and cart component is shown
  // here we also accepting prop from parent which will close the component when the clicked on overlay part and also close btn

  const cart = useSelector((state) => state.cartReducer.cart);
  let totalAmount = 0;
  cart.forEach((item) => (totalAmount += item.quantity * item.price));
  const isCartEmpty = cart.length === 0;

  async function handleCheckout(){ 
    
    try {
      
    
    const response = await axiosClient.post('/orders',{
      products :cart
    });
  
    // console.log("response",response);
    const stripe =  await stripePromise;
    const data = await stripe.redirectToCheckout({
           sessionId: response.data.stripeId
     })
     
    console.log('stripe Data', data);
   

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Cart">
      <div className="overlay" onClick={onClose}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div className="close-btn" onClick={onClose}>
            <AiOutlineClose /> Close
          </div>
        </div>

        <div className="cart-items">
          {cart.map((item) => (
            <CartItems key={item.key} cart={item} />
          ))}
        </div>
        {isCartEmpty && (
          <div className="empty-cart-info">
            <div className="icon">
              <BsCartX />
            </div>
            <h4>Cart is Empty</h4>
          </div>
        )}

        {!isCartEmpty && (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-message">Total:</h3>
              <h3 className="total-value">$ {totalAmount}</h3>
            </div>
            <div className="checkout btn-primary" onClick={handleCheckout}>Checkout now</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
