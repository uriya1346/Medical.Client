import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import ProducItem from '../productItem';
import AuthClientComp from './authClientComp';
import {BeatLoader} from 'react-spinners'

function FavsProducts(props) {
  const [ar,setAr] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
   
    doApiListFav()
  },[])

  const doApiListFav = async() => {
    setLoading(true)
    let url = API_URL+"/favs/productsInfo";
    let resp = await doApiGet(url)
    setAr(resp.data)
    setLoading(false)
  }

  return (
    <div className='container-fluid mb-5' style={{ minHeight: "85vh" }}>
            <div style={{ minHeight: "15vh" }}></div>
      <div className="container">
        <AuthClientComp />
        <h1 className='text-center gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>favorites Products</h1>
        {loading ?<div className='text-center mt-4'> <BeatLoader/> </div>: ""}
        {ar.length === 0 && !loading?<div className='mt-5' style={{height:"300px", maxWidth:"600px",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",margin:"0 auto",background:"linear-gradient(rgba(73, 73, 73, 0.18),rgba(0, 0, 0, 0.18))"}}>you didn't have favorites product's yet...</div>: ""} 
        <div className="row">
          {ar.map(item => {
            return (
              <ProducItem key={item._id} item={item} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FavsProducts