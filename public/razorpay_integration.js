const express = require("express");
var Razorpay=require("razorpay");
var bodyParser = require('body-parser')
const cors = require("cors");


const app = express();
app.use(cors());

let instance = new Razorpay({
    key_id: 'rzp_test_viDGDEqdmCJlAn', // your `KEY_ID`
    key_secret: 'eahIPKlbTsTTeeOJ8QtyWv5n' // your `KEY_SECRET`
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/payment/orders",(req,res)=>{
    params=req.body;
    instance.orders.create(params).then((data) => {
            var options = {
                "key": "rzp_test_viDGDEqdmCJlAn", // Enter the Key ID generated from the Dashboard
                "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Flight Booking System",
                "image": "https://example.com/your_logo",
                "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "notes": {
                    "address": "PES University"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
           res.send({"sub":data,"options":options,"status":"success"});
    }).catch((error) => {
           res.send({"sub":error,"status":"failed"});
    })
    });

    app.post("/payment/verify",(req,res)=>{
        console.log(req.body)
        body=req.body.orderCreationId + "|" + req.body.razorpayPaymentId;
        console.log(body)
        var crypto = require("crypto");
        var expectedSignature = crypto.createHmac('sha256', 'eahIPKlbTsTTeeOJ8QtyWv5n')
                                        .update(body.toString())
                                        .digest('hex');
                                        console.log("sig"+req.body.razorpay_signature);
                                        console.log("sig"+expectedSignature);
        var response = {"status":"failure"}
        if(expectedSignature === req.body.razorpaySignature)
            response={"status":"success"}
        else
            response={"status":"fail"}
            res.send(response);
        });
        
    
    
    
    
    app.post("/api/payment/verify",(req,res)=>{
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'MY1j77T20IgCqUSa9FOS0IyY')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig"+req.body.razorpay_signature);
                                    console.log("sig"+expectedSignature);
    var response = {"status":"failure"}
    if(expectedSignature === req.body.razorpay_signature)
     response={"status":"success"}
        res.send(response);
    });

app.listen(8081);