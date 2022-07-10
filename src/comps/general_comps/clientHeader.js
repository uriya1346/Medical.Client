import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch, BsCart3} from "react-icons/bs";
import { checkTokenLocal } from '../../services/localService';
import {AppContext} from "../../context/shopContext"
import Hamburger from 'hamburger-react';

function ClientHeader(props) {
  const {showCart,setShowCart} = useContext(AppContext)
  let [login,setLogin] = useState("");
  let inputRef = useRef()
  let location = useLocation();
  let nav = useNavigate()

  useEffect(() => {
    setLogin(checkTokenLocal())
  },[location])

  const onKeyboardClick = (e) => {
    if(e.key === "Enter"){
      onSearchClick();
    }
  }

  const onSearchClick = () => {
    let input_val = inputRef.current.value;
    if(input_val){
      nav("/productsSearch?s="+input_val);
    }
  }
  window.addEventListener("scroll",function(){
    let header=document.querySelector("header");
    header.classList.toggle("sticky",window.scrollY > 0);
   })

  return (
    <header className='shadow header-client container-fluid position-fixed '>
      <div className="container">
          <nav className='col-md-auto navbar navbar-expand-md navbar-light '>
            <Link to="/">
           <i className="fa fa-stethoscope text-black logo me-md-5" style={{fontSize:"28px"}} aria-hidden="true"></i>
            </Link>
            <button style={{borderRadius:"24px 8px"}} className="navbar-toggler btn" data-toggle="collapse" data-target="#navbarMenu">
              <Hamburger/>
            </button>
            <div className='d-md-flex align-items-center collapse navbar-collapse' id="navbarMenu">
              <div className='links_header d-flex mx-0 mx-md-5'>
                <Link to="/"><i className="fa fa-home m-1" aria-hidden="true"></i>Home</Link>
                <Link to="/checkout"><i className="fa fa-credit-card-alt m-1" aria-hidden="true"></i>Checkout</Link>
                <Link to="/oldOrders"><i className="fa fa-sort m-1" aria-hidden="true"></i>Old orders</Link>
                <Link to="/products_favs"><i className="fa fa-star m-1" aria-hidden="true"></i>Favorites</Link>
              </div>
              <div className='search_header d-flex my-2 my-md-0 mx-0 mx-md-3'>
                <input onKeyDown={onKeyboardClick} ref={inputRef} placeholder='search...' type="text" className='form-control'/>
                <button onClick={onSearchClick} className='btn'><BsSearch className='icon1' /></button>
                <button onClick={() => { showCart === "none" ? setShowCart("block") : setShowCart("none")}} className='btn'><BsCart3 className='icon1' /></button>
              </div>
              <div className='log_in_out'>
                {login ?
                  <Link to="/logout" className='text-danger'>Sign out<i className="mx-2 fa fa-sign-out" aria-hidden="true"></i></Link>
                  :
                  <React.Fragment>
                    <Link to="/login"><i className="fa fa-sign-in mx-2" aria-hidden="true"></i>Log in</Link>/
                    <Link to="/signup"><i className="fa fa-plus mx-2" aria-hidden="true"></i>Sign up</Link>
                  </React.Fragment>
                }
              </div>
            </div>
          </nav>
      </div>
    </header>
  )
}

export default ClientHeader