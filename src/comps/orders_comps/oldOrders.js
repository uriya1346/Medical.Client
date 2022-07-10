import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import AuthClientComp from '../users_comps/authClientComp';

function OldOrders(props){
  const [ar,setAr] = useState([]);
  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL+"/orders/userOrder";
    let resp = await doApiGet(url);
    let temp_ar = resp.data.filter(item => item.status !== "pending")
    setAr(temp_ar);
  }

  return(
    <div className='container' style={{ minHeight: "85vh" }}>
            <div style={{ minHeight: "12vh" }}></div>
      <AuthClientComp />
      <h2 className='text-center gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Old orders</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>Status<i className="fa fa-hourglass-start mx-2" aria-hidden="true"></i></th>
            <th>Total price<i className="fa fa-money mx-2" aria-hidden="true"></i></th>
            <th>Date<i className="fa fa-calendar-o mx-2" aria-hidden="true"></i></th>
            <th>Info<i className="fa fa-inbox mx-2" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            let date = item.date_created.replace("T"," ");
            date = date.substring(0,date.indexOf(":")+3);

            return(
             <tr key={item._id}>
               <td>{i+1}</td>
               <td>{item.status}</td>
               <td>{item.total_price}<i className="fa fa-ils mx-1" aria-hidden="true"></i></td>
               <td>{date}</td>
               <td>
            <Link className='badge btnLog' to={"/oldOrders/"+item._id}><i style={{fontSize:"28px"}} className="fa fa-info text-dark" aria-hidden="true"></i></Link>
               </td>
             </tr>
            )
          })}
        </tbody>
      </table>
    </div> 
  )
}

export default OldOrders