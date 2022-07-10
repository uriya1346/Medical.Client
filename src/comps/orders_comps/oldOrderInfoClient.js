import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import {BeatLoader} from 'react-spinners'

function OldOrderInfoClient(props){
  let [ar, setAr] = useState([]);
  let [orderInfo, setOrderInfo] = useState({});
  let [orderDate,setOrderDate] = useState("");
  let params = useParams();
  let nav = useNavigate()
 
  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + "/orders/productsInfo/" + params.idOrder;
    let resp = await doApiGet(url);
    let date = resp.data.order.date_created.replace("T"," ");
    date = date.substring(0,date.indexOf(":")+3);
    setOrderDate(date);
    setOrderInfo(resp.data.order);
    setAr(resp.data.products);
  }

  return(
    <div className='container-fluid' style={{ minHeight: "85vh" }}>
            <div style={{ minHeight: "14vh" }}></div>
      <div className='container'>
        { orderInfo.name ? <article>
        <h3 className='my-4'><i className="fa fa-hourglass-start mx-2" aria-hidden="true"></i>Status: {orderInfo.status}</h3>
        <h3 className='my-4'><i className="fa fa-calendar-o mx-2" aria-hidden="true"></i>Date: {orderDate}</h3>
      </article> : <div className='text-center mt-4'> <BeatLoader/> </div>}
 
      <h4 className='my-4'>Total price: {orderInfo.total_price}<i className="fa fa-ils mx-1" aria-hidden="true"></i></h4>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name<i className="fa fa-user mx-2" aria-hidden="true"></i></th>
            <th>Short ID<i className="fa fa-id-card-o mx-2" aria-hidden="true"></i></th>
            <th>Image<i className="fa fa-picture-o mx-2" aria-hidden="true"></i></th>
            <th>Price<i className="fa fa-money mx-1" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td title={item.info}>{item.name}</td>
                <td>{item.short_id}</td>
                <td>
                  <img src={item.img_url} alt="pic" height="50" />
                </td>
                <td>{item.price}<i className="fa fa-ils mx-1" aria-hidden="true"></i></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={() => {
            nav(-1);
          }} className='btn btn-dark mt-3'><i className="fa fa-chevron-left" aria-hidden="true"></i></button>   
      </div>
    </div>
  )
}

export default OldOrderInfoClient