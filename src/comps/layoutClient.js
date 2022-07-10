import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClientFooter from './general_comps/clientFooter';
import ClientHeader from './general_comps/clientHeader';
import { AppContext } from "../context/shopContext"
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import "./css/client.css"
import "./css/headerFooter.css"
import Cart from './cart_comps/cart';
import { getCartFromLocal, saveCartLocal } from '../services/localService';

function LayoutClient(props) {
  const [favs_ar, setFavsAr] = useState([]);
  const [cart_ar,setCartAr] = useState([]);
  const [showCart, setShowCart] = useState("none");

  useEffect(() => {
    doFavApi()
    setCartAr(getCartFromLocal());
  }, [])

  const updateCart = (_newAr) => {
    setCartAr(_newAr);
    saveCartLocal(_newAr);
  }

  const addToCart = (_newItem) => {
    let inCart = false;
    cart_ar.map(item => {
      if(item._id === _newItem._id){
        inCart = true;
      }
    })
    if(!inCart){
      updateCart([...cart_ar,_newItem])
    }
    setShowCart("block");
  }

  const doFavApi = async () => {
    if (localStorage["tok"]) {
      let url = API_URL + "/favs/"
      try {
        let resp = await doApiGet(url);
        if (resp.data.favs_ar) {
          setFavsAr(resp.data.favs_ar);
        }
      }
      catch (err) {
        console.log(err.response)
      }
    }
    else{
      setFavsAr([])
    }
  }
  const addRemoveFav = async(_short_id) => {
    if (localStorage["tok"]) {
      let url = API_URL+"/favs/add_remove/"+_short_id;
      try{
        let resp = await doApiMethod(url,"PATCH",{})
        if(resp.data.modifiedCount){
          doFavApi()
        }
      }
      catch (err) {
        console.log(err.response)
        toast.info("There error try again later")
      }
    }
    else{
      toast.error("You must be logged in to add to favorite!");
    }
  }

  return (
    <AppContext.Provider value={
      {
        favs_ar,
        addRemoveFav,
        doFavApi,
        showCart,
        setShowCart,
        cart_ar,
        updateCart,
        addToCart
      }
      }>
      <Cart />
      <ClientHeader />
      <Outlet />
      <ClientFooter />
    </AppContext.Provider>
  )
}

export default LayoutClient