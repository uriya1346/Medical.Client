import React, { useContext } from 'react';
import {AppContext} from "../../context/shopContext"

function CartItem(props){
  const {cart_ar, updateCart} = useContext(AppContext);
  let item = props.item;

  const onRemoveItemClick = () => {
    let temp_ar = cart_ar.filter(prod => prod._id !== item._id);
    updateCart(temp_ar);
  }

  return(
    <div className='border pt-2 px-2 overflow-hidden'>
      <button onClick={onRemoveItemClick} className='float-end ms-2 btn '><i className="fa fa-times-circle mb-3 text-danger" aria-hidden="true" style={{fontSize:"18px"}}></i></button>
      <div className='float-end'>{item.price} <i className="fa fa-ils mx-1" aria-hidden="true"></i></div>
      <h5>{item.name} </h5>
    </div> 
  )
}

export default CartItem