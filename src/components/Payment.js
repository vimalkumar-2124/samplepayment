import axios from 'axios'
import React from 'react'

function Payment() {
    const paymentHandler = async(e) => {
        const API_URL = 'http://localhost:8000'
        e.preventDefault()
        
        const orderUrl = `${API_URL}/razorpay`
        const res = await axios.post(orderUrl)
        const { amount, id:order_id, currency } = res.data
        const options = {
            key:process.env.REACT_APP_RAZOR_PAY_KEY_ID,
            amount: amount.toString(),
            name:"Sample Payment app",
            order_id:order_id,
            currency:currency,
            handler: async(response) => {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId : response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,

                }
                console.log(data)
                const result = await axios.post(`${API_URL}/success`, data)
                alert(result.data.msg)
            },
            theme:{
                color: "#686CFD",
            },
        }
        const rzpl = new window.Razorpay(options)
        rzpl.open()
    }
   return <>
   <div>
    <button onClick={paymentHandler}>Pay Now</button>
    </div>
    </>
}

export default Payment