import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import AuthAdminComp from '../misc_comps/authAdminComp';
import PageLinks from '../misc_comps/pageLinks';
import { API_URL, doApiGet } from '../services/apiService';
import CheckoutItem from './checkoutItem';

function CheckoutListAdmin(props){
  const [ar,setAr] = useState([]);
  const [query] = useSearchParams()
  const location = useLocation();
  const [page,setPage] = useState(0);

  useEffect(() => {
    doApi();
  },[location])

  const doApi = async() => {
    let pageQ = query.get("page") || 1;
    setPage(pageQ-1)

    let url = API_URL+"/orders/allOrders?page="+pageQ;
    let resp = await doApiGet(url);
    setAr(resp.data); 
  }

  return(
    <div className='container'>
      <AuthAdminComp />
      <div style={{ minHeight: "15vh" }}></div>
      <h1 className='mb-4 gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Checkout panel</h1>      <PageLinks perPage="5" apiUrlAmount={API_URL+"/orders/allOrdersCount"} urlLinkTo={"/admin/checkout"} clsCss="btn btn-dark me-1" />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>Status<i className="fa fa-hourglass-start mx-2" aria-hidden="true"></i></th>
            <th>Name<i className="fa fa-user mx-2" aria-hidden="true"></i></th>
            <th>Address<i className="fa fa-map-marker mx-2" aria-hidden="true"></i></th>
            <th>Total price<i className="fa fa-money mx-2" aria-hidden="true"></i></th>
            <th>Amount<i className="fa fa-angle-double-right mx-2" aria-hidden="true"></i></th>
            <th>Info<i className="fa fa-inbox mx-2" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
            <CheckoutItem key={item._id} item={item} index={i + page * 5}/>
            )
          })}
        </tbody>
      </table>
    </div> 
  )
}

export default CheckoutListAdmin