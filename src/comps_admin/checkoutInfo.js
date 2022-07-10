import React, { useEffect, useRef, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';

function CheckoutInfo(props) {
  let [ar, setAr] = useState([]);
  let [orderInfo, setOrderInfo] = useState({});
  let params = useParams();
  let selectRef = useRef();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + "/orders/productsInfo/" + params.id;
    let resp = await doApiGet(url);
    setOrderInfo(resp.data.order);
    setAr(resp.data.products);
  }

  const onStatusChanged = async () => {
    let status = selectRef.current.value;
    let url = API_URL + "/orders/" + orderInfo._id + "?status=" + status;
    let resp = await doApiMethod(url, "PATCH", {});
    if (resp.data.modifiedCount === 1) {
      doApi();
    }
  }

  return (
    <div className='container mb-5'>
  <div style={{ minHeight: "16vh" }}></div>

      { orderInfo.name ? <article>
        <h1 className='gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Order information</h1>
        <h3><i className="fa fa-user mx-2" aria-hidden="true"></i>Name: {orderInfo.name} <br/><i className="fa fa-map-marker mx-2" aria-hidden="true"></i>Address: {orderInfo.address} <br/><i className="fa fa-phone mx-2" aria-hidden="true"></i>Phone: {orderInfo.phone}</h3>
        <h3 className='my-4'><i className="fa fa-hourglass-start mx-2" aria-hidden="true"></i>Status: {orderInfo.status}</h3>
        <div className='col-md-3'>
          <h4 className='mt-4'>Change status:</h4>
          <select cl defaultValue={orderInfo.status} ref={selectRef} onChange={() => { onStatusChanged() }} className='form-select mb-4'>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="canceld">Canceld</option>
          </select>
        </div>
      </article> : <h2>Loading...</h2>}
      <h4 className='mt-3'>Total price:{orderInfo.total_price} <i className="fa fa-ils mx-1" aria-hidden="true"></i></h4>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>short_id</th>
            <th>img</th>
            <th>Price of one item</th>
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
  )
}

export default CheckoutInfo