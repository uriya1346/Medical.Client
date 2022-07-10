import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import {BeatLoader} from 'react-spinners'

function HomeCategoryList(props) {
  const [ar, setAr] = useState([]);

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + "/categories";
    let resp = await doApiGet(url);
    setAr(resp.data);
  }

  return (
    <div className='container-fluid shadow'>
      <div className='container py-4 categories_list'>
        <h2 className='text-center gradi text-uppercase'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>OUR categories</h2>
        {ar.length === 0 ?<div className='text-center mt-4'> <BeatLoader/> </div> : ""}
        <div className="row">
          {ar.map(item => {
            return (
              <Link to={"/products/"+item.url_name} key={item._id} className='myCard col-md-4 p-3'>
                <div className="shadow  bg-dark gradi">
                  <div style={{ backgroundImage: `url(${item.img_url || "/images/cover1.jpg"})` }} className='img_card'></div>
                  <h3 className='text-center p-3'>{item.name}</h3>
                </div>
              </Link>)
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeCategoryList