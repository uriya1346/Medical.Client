import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import { addProdVisitedToLocal } from '../services/localService';
import InfoProductsList from './infoProductsList';
import { BsCartPlus} from "react-icons/bs"
import {AppContext} from "../context/shopContext"

function ProductInfo(props){
  const {addToCart } = useContext(AppContext);
  const [product,setProduct] = useState({});
  let params = useParams();
  let nav = useNavigate();
  let location = useLocation();

  useEffect(() => {
    doApi();
  },[location])

  const doApi = async() => {
    let url = API_URL + "/products/single/"+params.id;
    let resp = await doApiGet(url);
     setProduct(resp.data)
     addProdVisitedToLocal(resp.data.short_id)
  }

  const onAddToCartClick = () => {
    addToCart(product)
  }

  return(
    <div className='container p-4' style={{minHeight:"85vh"}}>
          <div style={{ minHeight: "10vh" }}></div>
      <div className="row">
        <div className="col-md-4">
            <img src={product.img_url || "/images/cover.jpg"} alt={product.name} className='img-fluid img-thumbnail shadow' />
        </div>
        <div className="col-md-8">
        <h1 className='text-center gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>{product.name}</h1>
          <p className='h3 mb-5 mt-2 text-center'> {product.info}</p>
          <h3 className='text-center'>Price: {product.price} <i className="fa fa-ils mx-1" aria-hidden="true"></i></h3>
          <h4 className='mb-5 text-center'>Quantity: {product.qty} </h4>
          <div className='text-center'>
          <button onClick={() => {
            nav(-1);
          }} className='btn btn-dark '><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
          {product.qty > 0 ? 
          <button onClick={onAddToCartClick} className="btn btn-info ms-2"> 
          <BsCartPlus/>
          </button> :
           <button  className="btn btn-danger ms-2">SOLD OUT!!!          
           </button>
          }
          </div>
        </div>
      </div>
      {product.cat_short_id ? 
      <InfoProductsList cat_short_id={product.cat_short_id} />
      : "" }
    </div> 
  )
}

export default ProductInfo