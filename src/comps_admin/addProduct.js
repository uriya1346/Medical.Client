import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';

function AddProduct(props) {
  let [cat_ar, setCatAr] = useState([]);
  let [btnSend,setBtnSend] = useState(false)
  let nav = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let infoRef = register("info", { required: true, minLength: 2, maxLength: 500 })
  let priceRef = register("price", { required: true, min: 1, max: 999999 })
  let cat_short_idRef = register("cat_short_id", { required: true, minLength: 1, maxLength: 99 })
  let img_urlRef = register("img_url", { required: false, minLength: 3, maxLength: 500 })
  let qtyRef = register("qty", { required: true, min: 1, max: 9999 })

  useEffect(() => {
    doApi()
  }, [])

  const doApi = async () => {
    let url = API_URL + "/categories";
    let resp = await doApiGet(url);
    setCatAr(resp.data);
  }

  const onSubForm = (formData) => {
    setBtnSend(true);
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/products";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      if (resp.data._id) {
        toast.success("Product added");
        nav("/admin/products")
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
      nav("/admin/products")
    }
  }

  return (
    <div className='container mb-5'>
      <AuthAdminComp />
      <div style={{ minHeight: "15vh" }}></div>
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-7 p-3 shadow mx-auto'>
      <h1 className='mb-4 gradi text-center '><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Products panel</h1>
      <label className="my-2"><i className="fa fa-user mx-2" aria-hidden="true"></i>Name</label>
        <input  {...nameRef} type="text" className='form-control' />
        {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}
        <label className="my-2"><i className="fa fa-info mx-2" aria-hidden="true"></i>Info</label>
        <textarea {...infoRef} className='form-control' rows="3"></textarea>
        {errors.info ? <small className='text-danger d-block'>* Enter valid info, 3 to 500 chars</small> : ""}
        <label className='my-2'><i className="fa fa-money mx-2" aria-hidden="true"></i>Price</label>
        <input  {...priceRef} type="number"  className='form-control' />
        {errors.price ? <small className='text-danger d-block'>* Enter valid  price, between 1 to 999999</small> : ""}
        <label className="my-2"><i className="fa fa-angle-double-right mx-2" aria-hidden="true"></i>Quantity</label>
        <input {...qtyRef} type="number" className='form-control' />
        {errors.qty ? <small className='text-danger d-block'>* Enter valid  qty, between 1 to 9999</small> : ""}
        <label className="my-2"><i className="fa fa-bars mx-2" aria-hidden="true"></i>Category</label>
        <select hort_id {...cat_short_idRef}  className='form-select'>
          <option  value="" >Choose Category</option>
          {cat_ar.map(item => {
            return (
              <option key={item._id} value={item.short_id}>{item.name}</option>
            ) 
          })}
        </select>
        {errors.cat_short_id ? <small className='text-danger d-block'>You must choose category from the list </small> : ""}
        <label className="my-2"><i className="fa fa-picture-o mx-2" aria-hidden="true"></i>Image url</label>
        <input {...img_urlRef} type="text" className='form-control mb-4' />
        {errors.img_url ? <small className='text-danger d-block'>* Enter valid  img url </small> : ""}
        <button className='mx-auto btnLog' disabled={btnSend}>Add<i className="fa fa-plus mx-2" aria-hidden="true"></i></button>
      </form>
    </div>
  )
}

export default AddProduct