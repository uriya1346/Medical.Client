import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PageLinks from '../misc_comps/pageLinks';
import { API_URL, doApiGet } from '../services/apiService';
import ProducItem from './productItem';
import {BeatLoader} from 'react-spinners'

function ProductsListPage(props) {
  const [ar, setAr] = useState([])
  const [shortId, setShortId] = useState(0)
  const [amount,setAmount] = useState(0)
  const location = useLocation();

  let params = useParams();

  useEffect(() => {
    setAr([]);
    doApi();
  }, [location]);

  const doApi = async () => {
    let urlCategory = API_URL + "/categories/single/" + params.cat_url;
    let resp1 = await doApiGet(urlCategory);
    let short_id = resp1.data?.short_id;
    setShortId(short_id)
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    let urlProds = API_URL + "/products/?perPage=8&cat=" + short_id + "&page=" + pageQuery;
    let resp2 = await doApiGet(urlProds)
    setAr(resp2.data)
    let urlAmounts = API_URL + "/products/amount?cat=" + short_id;
    let resp3 = await doApiGet(urlAmounts);
    setAmount(resp3.data.amount)
  }
  return (
    <div className='container-fluid mb-5' style={{ minHeight: "85vh" }}>
    <div style={{ minHeight: "15vh" }}></div>
      <div className="container">
        <h1 className='text-center gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Products of {params.cat_url}</h1>
        {ar.length === 0 ? <h2 className='text-center'><BeatLoader/></h2> : ""}
        <div className="row">
          {ar.map(item => {
            return (
              <ProducItem key={item._id} item={item} />
            )
          })}
        </div>
        {amount < 9 ? "" :
          <PageLinks perPage="8" apiUrlAmount={API_URL + "/products/amount?cat=" + shortId} urlLinkTo={"/products/"+params.cat_url} clsCss="btn btn-dark me-1" />
        }
      </div>
      <div style={{ minHeight: "3vh" }}></div>
    </div>
  )
}

export default ProductsListPage