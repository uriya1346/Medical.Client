import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import ProducItem from './productItem';
import {BeatLoader} from 'react-spinners'

function SearchProducts(props){
  const [ar,setAr] = useState([]); 
  const [whatSearch,setWhatSearch] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  let location = useLocation();
  
  useEffect(() => {
    setShowLoading(true);
    doApi()
  },[location])

  const doApi = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    let searchQuery = urlParams.get("s") || "";
    setWhatSearch(searchQuery);
    let url = API_URL+"/products/search?s="+searchQuery;
    let resp = await doApiGet(url);
    setShowLoading(false);
    setAr(resp.data);
  }

  return(
    <div className='container-fluid pb-4' style={{ minHeight: "85vh" }}>
      <div className="container">
      <div style={{ minHeight: "10vh" }}></div>
        <h1 className='text-center my-4 gradi'>"{whatSearch}":</h1>
        {showLoading ? <h2 className='text-center'><div className='text-center mt-4'> <BeatLoader/> </div></h2> : ""}
        {ar.length === 0 && !showLoading ? <h2 className='text-center'>Search not match, try another query</h2> : ""}
        <div className="row">
          {ar.map(item => {
            return (
              <ProducItem key={item._id} item={item} />
            )
          })}
        </div>
        <div style={{ minHeight: "10vh" }}></div>
      </div>
    </div>
  )
}

export default SearchProducts