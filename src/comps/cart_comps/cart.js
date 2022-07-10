import React, { useContext, useEffect, useState } from 'react';
import "../css/cart.css";
import CartItem from './cartItem';
import {AppContext} from "../../context/shopContext"
import { Link } from 'react-router-dom';

function Cart(props){
  const [total,setTotal] = useState(0);

  const {showCart,setShowCart,cart_ar} = useContext(AppContext);
  useEffect(()=>{
    let sumTotal = 0;
    cart_ar.forEach(item => {
      sumTotal += item.price;
    })
    setTotal(sumTotal)
  },[cart_ar])

  return(
    <div style={{display:showCart}} className='cart gradient-background pb-3'>
      <button className='btn close-btn' onClick={() => {
        setShowCart("none");
      }}><i className="fa fa-times-circle" style={{fontSize:"22px"}} aria-hidden="true"></i></button>
      <i className="fa fa-buysellads p-3" style={{fontSize:"32px"}} aria-hidden="true"></i>
      {cart_ar.map(item => {
        return(
          <CartItem key={item._id} item={item} />
        )
      })}
      <h2 className='p-2 total mt-3'>Total: {total} <i className="fa fa-ils mx-1" aria-hidden="true"></i></h2>
      <button className='btn badge'> <Link className='btnLog text-decoration-none text-dark' to="/checkout"><i className="fa fa-credit-card-alt mx-2" aria-hidden="true"></i>PAY NOW!</Link></button>

    </div> 
  )
}

export default Cart