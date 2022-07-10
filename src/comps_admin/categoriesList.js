import React, { useEffect , useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import {BeatLoader} from 'react-spinners'

function CategoriesList(props){
  let [ar,setAr] = useState([]);
  let nav = useNavigate()

  useEffect(() => {
    doApi()
  },[])

  const doApi = async() =>{
    let url = API_URL + "/categories";
    try{
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

  const delCategory = async(_idDel) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        let url = API_URL+"/categories/"+_idDel;
        let resp = await doApiMethod(url,"DELETE",{});
        if(resp.data.deletedCount){
          toast.info("Category delted !");
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
      <h1 className='gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Categories panel</h1>
      <table className='table table-bordered table-dark table-striped table-responsive flex-md-column-reverse col-lg-6 my-5'>
        <thead>
          <tr>
            <th>#</th>
            <th><i className="fa fa-user mx-2" aria-hidden="true"></i>Name</th>
            <th><i className="fa fa-search mx-2" aria-hidden="true"></i>Url name</th>
            <th>Short ID<i className="fa fa-id-card-o mx-2" aria-hidden="true"></i></th>
            <th>Del/Edit<i className="fa fa-pencil ms-2" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <tr className='link alert-link' key={item._id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.url_name}</td>
                <td>{item.short_id}</td>
        
                <td>
                  <button onClick={() => {delCategory(item._id)}} className='badge bg-danger'>X</button>
                  <button onClick={() => {
                    nav("/admin/editCategory/"+item.url_name)
                  }} className='badge bg-success'><i className="fa fa-pencil" aria-hidden="true"></i></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Link to="/admin/addCategory" className="btnTable text-dark ">Add new category<i className="fa fa-plus mx-2 mb-3" aria-hidden="true"></i></Link> 
      {ar.length === 0 ? <div className='text-center mt-4'> <BeatLoader/> </div> : ""}
      </div> 
  )
}

export default CategoriesList;