import {React,useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import "../css/App.css"
import '../css/bootstrap.min.css';

var url = require('url');
var mongoUrl = "http://localhost:8080/"
//var mongoUrl = "https://us-central1-flightbookingpes.cloudfunctions.net/flight/"


const Booking = () => {
  var history = useHistory();
    const [bookData, setBookData] = useState([]);
    var currentUrl = window.location.href;
    var parsedUrl = url.parse(currentUrl, true);
    var queryData = parsedUrl.query
    //alert(JSON.stringify(queryData))
    var mongoRequest = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryData)
    }

    useEffect(() => {
        const getFlights = () => {fetch(mongoUrl,mongoRequest).then(response => response.json()).then(data => {setBookData(data);console.log(bookData)});}
        getFlights()
      }, []);

    
    if(window.sessionStorage.getItem("token")){
      var token = jwt_decode(window.sessionStorage.getItem("token"))
    }
    else{
      var token ={"login":"False"}  
    }

    if(token.login == "True"){
    return (
        <div>
          {
              bookData.map((data, key) => {
              {var payUrl = "/payment?id="+queryData.id+"&price="+data.price}
              return (
                  <div key={key} className="card2" style={{justifyContent:'center', alignItems:'center',fontFamily:"Roboto",fontSize:"20px",color:"white"}}>
                  <br/>
                  <h1>Your Flight Details</h1><br/>
                  Your Name : {token.user}<br/>
                  Airline Name : {data.company}<br/>
                  Origin Airport : {data.origin}<br/>
                  Destination Airport : {data.destination}<br/>
                  Departure Time: {data.departureTime}<br/>
                  Arrival Time: {data.arrivalTime}<br/>
                  Price : ₹{data.price}<br/><br/>
                  <a href={payUrl} style={{width:"40%"}}><Button id="rzp-button1" style={{width:"100%",fontFamily:"Cabin",fontSize:"18px"}}>Proceed To Pay</Button></a>
                </div>
            );
        })}
        </div>
    )}
    else{
      return(
        <div className="back2" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <div style={{display: 'flex',justifyContent:'center', alignItems:'center',fontFamily:"Roboto",fontSize:"30px"}}>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <pre style={{color:"white"}}>
              <br/>
            You must login to book a flight<br/><br/>
            <a href="/login"><Button id="rzp-button1" style={{width:"100%",fontFamily:"Cabin",fontSize:"18px"}}>Login</Button></a>
            </pre>
          </div>
          </div>
        </div>
      )
    }
}

export default Booking

