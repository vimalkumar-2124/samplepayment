require('dotenv').config();
var express = require('express');
var router = express.Router();
const RazorPay = require('razorpay')
const crypto = require('crypto')
const instance = new RazorPay({
key_id:process.env.RAZOR_PAY_KEY_ID,
key_secret:process.env.RAZOR_PAY_SECRET_KEY
})

// Payment
router.post('/razorpay', async(req,res) => {
  try{
    const options = {
      amount: 10 * 100,
      currency: 'INR',
      receipt:"receipt#2",
      payment_capture:1,
    }
    const order = await instance.orders.create(options)
    if (!order) return res.status(500).send("Some error occured");

        res.json(order);
  }
  catch(err){
    return res.status(500).json({
      message:"Something went wrong"
    })
  }
})


router.post('/success', async(req,res) =>{
  try{
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
    } = req.body
    // Creating our own digest
    const shasum = crypto.createHmac('sha256', 'hellovimal')
    shasum.update(`${orderCreationId}| ${razorpayPaymentId}`)
    const digest = shasum.digest("hex")
    res.json({
      msg:'success',
      orderId: razorpayOrderId,
      paymentId:razorpayPaymentId,
    })
  }catch(err){
    return res.status(500).json({
      message:"Something went wrong"
    })
  }
})

// To capture the payments
// router.post('/capture/:paymentId', (req, res) => {
//   try{
//     return request({
//       method:"POST",
//       url:`https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_SECRET_KEY}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
//       form:{
//         amount:10 * 100,
//         currency:'INR',
//       }
//     }, async(err, response, body) => {
//       if(err){
//         return res.status(500).json({
//           message:"Something went wrong"
//         })
//       }
//       console.log("Status : ",response.statusCode)
//       console.log("Headers : ",JSON.stringify(response.headers))
//       console.log("Response : ", body)
//       return res.status(200).json(body)
//     }
//     )
//   }
//   catch(err){
//     return res.status(500).json({
//       message:"Something went wrong"
//     })}
// })
module.exports = router;
