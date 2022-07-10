import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsStar, BsStarFill } from "react-icons/bs"
import { AppContext } from "../context/shopContext"

function ProducItem(props) {
  let item = props.item;
  let { favs_ar, addRemoveFav } = useContext(AppContext)

  return (
    <div className='product-item col-md-3 p-2'>
      <div className="shadow">
        <div style={{ backgroundImage: `url(${item.img_url || "/images/cover.jpg"})` }} className='product-img'>
          {item.qty === 0 ?
            <div className='sold-out'>Sold out!</div> : ""
          }
        </div>
        <div className='p-2'>

          <h4>{item.name}</h4>
          <div>Price: {item.price} <i className="fa fa-ils mx-1" aria-hidden="true"></i></div>
          <div className='text-center my-2'>
            {favs_ar.includes(item.short_id) ?
              <button onClick={() => {
                addRemoveFav(item.short_id)
              }} className='btn btn-warning'>
                <BsStarFill className='mb-1' />
              </button> :
              <button onClick={() => {
                addRemoveFav(item.short_id)
              }} className='btn btn-dark'>
                <BsStar className='mb-1' />
              </button>
            }
            <Link className='badge btnLog mt-3' style={{paddingBottom:"11px",paddingTop:"5px"}} to={"/productInfo/" + item._id}><i style={{fontSize:"20px"}} className="fa fa-info text-dark" aria-hidden="true"></i></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProducItem