var mongo = require('mongodb').MongoClient;
var express = require("express")
var app=express();
var cors = require('cors')
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

app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));