import React, { useContext, useEffect, useState } from 'react';
import {PayPalButton} from "react-paypal-button-v2"
import AuthClientComp from '../users_comps/authClientComp';
import { AppContext } from "../../context/shopContext"
import { API_URL, doApiMethod } from '../../services/apiService';
import {BeatLoader} from 'react-spinners'

function Checkout(props) {
  const { cart_ar, setShowCart, updateCart } = useContext(AppContext);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setShowCart("none")
    if (cart_ar.length > 0) {
      setCartEmpty(false)
      setShowLoading(true)
      doApiAddToCheckout()
    }
    else {
      setCartEmpty(true)
      setShowLoading(false);
    }
  }, [cart_ar])

  const doApiAddToCheckout = async () => {
    let url = API_URL + '/orders';
    let total_price = 0
    let products_ar = cart_ar.map(item => {
      total_price += item.price;
      return {
        s_id: item.short_id,
        amount: 1,
        price: item.price
      }
    })
    setTotal(total_price)
    let resp = await doApiMethod(url, "POST", { total_price, products_ar })
    setShowLoading(false);
  }

  const onXclick = (_delProdId) => {
    let temp_ar = cart_ar.filter(prod => prod._id !== _delProdId);
    updateCart(temp_ar);
  }

  const onCommit = async (_data) => {
    if (cart_ar.length > 0) {
      let url = API_URL + "/orders/orderPaid/"
      let paypalObject = {
        tokenId: _data.facilitatorAccessToken,
        orderId: _data.orderID,
        realPay:"sandbox"
      }
      let resp = await doApiMethod(url, "PATCH", paypalObject);
      if (resp.data.modifiedCount === 1) {
        alert("Your order completed");
        updateCart([]);
      }
    }
  }

  return (
    <div className='container mb-5' style={{ minHeight: "85vh" }}>
      <div style={{ minHeight: "12vh" }}></div>
      <AuthClientComp />
      {cartEmpty ? <h2 className='text-danger'><i className="fa fa-ellipsis-h mx-2" aria-hidden="true"></i>Cart is empty...<i className="fa fa-ellipsis-h mx-2" aria-hidden="true"></i></h2> : ""}
      <div className="row">
        <div className="col-md-8">
          <h4 className='gradi text-center'>Total price: {total}<i className="fa fa-ils mx-1" aria-hidden="true"></i></h4>
          <table className='table table-bordered table-dark table-striped table-responsive flex-md-column-reverse col-lg-6 mt-3'>
            <thead>
              <tr >
                <th>#</th>
                <th>Name<i className="fa fa-user mx-2" aria-hidden="true"></i></th>
                <th>Amount<i className="fa fa-angle-double-right mx-2" aria-hidden="true"></i></th>
                <th>Price<i className="fa fa-money mx-2" aria-hidden="true"></i></th>
                <th>Delete<i className="fa fa-pencil ms-2" aria-hidden="true"></i></th>
              </tr>
            </thead>
            <tbody>
              {cart_ar.map((item, i) => {
                return (
                  <tr className='link alert-link' key={item._id} title={item.info}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>1</td>
                    <td>{item.price}<i className="fa fa-ils mx-1" aria-hidden="true"></i></td>
                    <td>
                    <button onClick={() => { onXclick(item._id)}} className='btn'><h4><i className="fa fa-times-circle text-danger" aria-hidden="true"></i></h4></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:"200px"}} className='col-md-4'>
          {showLoading ? <div className='text-center mt-4'> <BeatLoader/> </div> :
            <div>
              <PayPalButton
                currency="ILS"
                amount={total}
                options={{
                  clientId:"AchCcsgZkBnQqL1E49d-RKwvgPA3GpXchjBYCot_b4v0XfcCUOwXiQp2_GwqoBI2f_kxnSkqirAUeMKe"
                }}
                onSuccess={(details,data) => {
                  console.log("data",data);
                  console.log("details",details);
                  if(data.orderID){
                    onCommit(data);
                  }
                }}
                onCancel={(err) => {
                  alert("The process end before the payment, try again")
                }}
              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Checkout