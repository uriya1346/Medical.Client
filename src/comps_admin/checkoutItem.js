import React from 'react';
import {useNavigate } from 'react-router-dom';

function CheckoutItem(props){
  let nav = useNavigate();
  let item = props.item;
  return(
    <tr>
      <td>{props.index+1}</td>
      <td>{item.status}</td>
      <td>{item.name}</td>
      <td>{item.address}</td>
      <td>{item.total_price}<i className="fa fa-ils mx-1" aria-hidden="true"></i></td>
      <td>{item.products_ar.length}</td>
      <td>
        <button onClick={() => {
          nav("/admin/checkoutInfo/"+item._id);
        }} to="/" className='badge btnLog'><i style={{fontSize:"20px"}} className="fa fa-info text-dark" aria-hidden="true"></i></button>
      </td>
    </tr> 
  )
}

export default CheckoutItem;