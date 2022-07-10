import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HeaderAdmin(props){
  let nav = useNavigate()

  const onLogOutClick = () => {
    if(window.confirm("Are you sure you want to logout?")){
      nav("/admin/logout");
    }
  }

  return(
    <header className='shadow header-client container-fluid position-fixed'>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className='logo col-md-auto'>
            <Link to="/admin/products">
            <h2>Admin panel</h2>
            </Link>
          </div>
          <nav className='col-md-auto'>
            <div className='d-md-flex align-items-center'>
              <div className='links_header me-md-3'>
                 <Link to="/admin/products" ><i className="fa fa-eercast m-1" aria-hidden="true"></i>Products</Link>
                 <Link to="/admin/categories" ><i className="fa fa-bars m-1" aria-hidden="true"></i>Categories</Link>
                 <Link to="/admin/users" ><i className="fa fa-users m-1" aria-hidden="true"></i>Users</Link>
                 <Link to="/admin/checkout" ><i className="fa fa-credit-card-alt m-1" aria-hidden="true"></i>Checkout</Link>
              </div>
              {localStorage["tok"] ? 
        <button onClick={onLogOutClick} className='btn'><i className="mx-2 fa fa-sign-out" aria-hidden="true"></i></button> : "" }
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default HeaderAdmin