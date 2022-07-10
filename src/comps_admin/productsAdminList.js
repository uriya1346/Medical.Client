import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../misc_comps/authAdminComp';
import PageLinks from '../misc_comps/pageLinks';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import {BeatLoader} from 'react-spinners'

function ProductsAdminList(props){
  let [ar,setAr] = useState([]);
  let [numPage,setPageNum] = useState(1);
  let [catObj,setCatObj] = useState({})
  let nav = useNavigate();
  let location = useLocation()
  
  useEffect(() => { 
    doApi();
  },[location])

  const doApi = async() => {
    try{
      let url0 = API_URL + "/categories";
      let resp0 = await doApiGet(url0);
      let temp_ar = resp0.data;
      let categories_data = {};
      temp_ar.forEach(item => {
        categories_data[item.short_id] = item.name;
      })
      setCatObj(categories_data)

      const urlParams = new URLSearchParams(window.location.search);
      let pageQuery = urlParams.get("page") || 1;
      setPageNum(pageQuery)
      let url = API_URL + "/products?page="+pageQuery;
      let resp = await doApiGet(url);
      setAr(resp.data);
    }
    catch(err){
      alert("there problem come back later")
      if(err.response){
        console.log(err.response.data)
      }
    }
  }

  const delProduct = async(_idDel) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        let url = API_URL+"/products/"+_idDel;
        let resp = await doApiMethod(url,"DELETE",{});
        if(resp.data.deletedCount){
          toast.info("product delted !");
        }
        doApi();
      }
      catch(err){
        console.log(err.response);
        alert("there problem , try again later")
      }
    }
  }

  return(
    <div className='container'>
      <AuthAdminComp />
      <div style={{ minHeight: "14vh" }}></div>
      <h1 className=' gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Products list</h1>    
      <PageLinks perPage="5" apiUrlAmount={API_URL+"/products/amount"} urlLinkTo={"/admin/products"} clsCss="btn btn-dark me-1 my-3" />
      <table className='table table-bordered table-dark table-striped table-responsive flex-md-column-reverse col-lg-6 mt-3 mb-5 '>
        <thead>
          <tr>
            <th>#</th>
            <th>Name<i className="fa fa-user mx-2" aria-hidden="true"></i></th>
            <th>Price<i className="fa fa-money mx-2" aria-hidden="true"></i></th>
            <th>Quantity<i className="fa fa-angle-double-right mx-2" aria-hidden="true"></i></th>
            <th>Category<i className="fa fa-bars mx-2" aria-hidden="true"></i></th>
            <th>Short ID<i className="fa fa-id-card-o mx-2" aria-hidden="true"></i></th>
            <th>Del/Edit<i className="fa fa-pencil ms-2" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <tr className='link alert-link' key={item._id}>
                <td>{(i+1) + 5 * (numPage-1) }</td>
                <td>{item.name}</td>
                <td>{item.price}<i className="fa fa-ils mx-1" aria-hidden="true"></i></td>
                <td>{item.qty}</td>
                <td>{catObj[item.cat_short_id]}</td>
                <td>{item.short_id}</td>
                <td>
                  <button onClick={() => {delProduct(item._id)}} className='badge bg-danger'>X</button>
                      
                  <button onClick={() => {
                    nav("/admin/editProduct/"+item._id)
                  }} className='badge bg-success'><i className="fa fa-pencil" aria-hidden="true"></i></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Link to="/admin/addProduct" className="btnTable text-dark">Add new product<i className="fa fa-plus mx-2 mb-4" aria-hidden="true"></i></Link>
      {ar.length === 0 ? <div className='text-center mt-4'> <BeatLoader/> </div>: ""}
    </div> 
  )
}

export default ProductsAdminList