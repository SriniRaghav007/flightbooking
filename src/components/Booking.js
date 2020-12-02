import {React,useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

var url = require('url');
var mongoUrl = "http://localhost:8080/"


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
                <div key={key} className="card">
                Your Flight Details<br/>
                Your Name : {token.user}<br/>
                Airline Name : {data.company}<br/>
                Origin Airport : {data.origin}<br/>
                Destination Airport : {data.destination}<br/>
                Departure Time:{data.departureTime}<br/>
                Arrival Time:{data.arrivalTime}<br/>
                Price : ₹{data.price}<br/>
                <button id="rzp-button1" ><a href={payUrl}>Proceed To Pay</a></button>
                
              </div>
            );
        })}
        </div>
    )}
    else{
      return(
        <div>
          You must login to book a flight
          <a href="/login">Login</a>
        </div>
      )
    }
}

export default Booking

