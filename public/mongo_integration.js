var mongo = require('mongodb').MongoClient;
var express = require("express")
var app=express();
var cors = require('cors')
var Razorpay=require("razorpay");
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

//var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://vihar:atlas@flightbookingsystem.tkfqu.mongodb.net/<dbname>?retryWrites=true&w=majority" 
const jwtSecret = 'verySecretpasswordforwebtech@PES2020';




app.use(bodyParser.json());
app.use(cors())
//app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

app.post('/', (req, res) => {
    var query = req.body;
    console.log('Got flight details request:', query);
    mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },function(err,db){
      if(err) throw err;
      var dbo = db.db('flights');
      dbo.collection("flight_details").find(query).toArray(function(err,resp){
          if(err) throw err;
          res.send(resp);
          db.close();
      });
    });
});

app.post('/auth', (req, res) => {
  var query = req.body;
  console.log('Got user request:', query);
  mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err,db){
    if(err) throw err;
    var dbo = db.db('flights');
    dbo.collection("users").find(query).toArray(function(err,resp){
      if(err) throw err;
      if(JSON.stringify(resp) === "[]"){
        res.sendStatus(204)
      }
      else{
        var bearerToken = {"token":jsonwebtoken.sign({"user":query.user,"login":"True"}, jwtSecret)}
        res.status(200).json(bearerToken)
      }
      db.close();
  });
});
});

app.post('/users', (req, res) => {
  var query = req.body;
  console.log('Got create user request:', query);
  mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err,db){
    if(err) throw err;
    var dbo = db.db('flights');
    dbo.collection("users").insertOne(query,function(err,resp){
        if(err) throw err;
        res.sendStatus(200)
        db.close();
    });
  });
});

app.post('/booking', (req, res) => {
  var query = req.body;
  console.log('Got booking details:', query);
  mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err,db){
    if(err) throw err;
    var dbo = db.db('flights');
    dbo.collection("users").find(query).toArray(function(err,resp){
        if(err) throw err;
        res.send(resp)
        db.close();
    });
  });
});



app.put('/users', (req, res) => {
  var query = req.body;
  console.log('Got update user request:', query.in);
  mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err,db){
    if(err) throw err;
    var dbo = db.db('flights');
    dbo.collection("users").updateOne(query.in,{ $set: query.out, $currentDate: { lastModified: true } }
    ,function(err,resp){
        if(err) throw err;
        res.send(resp)
        db.close();
    });
  });
});

app.put('/update', (req, res) => {
  var query = req.body;
  console.log('Got update flight request:', query.in);
  mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err,db){
    if(err) throw err;
    var dbo = db.db('flights');
    dbo.collection("flight_details").updateOne(query.in,{ $set: query.out, $currentDate: { lastModified: true } }
    ,function(err,resp){
        if(err) throw err;
        res.sendStatus(200)
        db.close();
    });
  });
});

app.delete('/users', (req, res) => {
  var query = req.body;
  console.log('Got delete user request:', query.in);
  mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err,db){
    if(err) throw err;
    var dbo = db.db('flights');
    dbo.collection("users").deleteOne(query,function(err,resp){
        if(err) throw err;
        res.sendStatus(200)
        db.close();
    });
  });
});

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

app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));