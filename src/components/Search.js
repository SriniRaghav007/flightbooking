import {React,useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import "../css/App.css"
import '../css/bootstrap.min.css';
var url = require('url');
var mongoUrl = "http://localhost:8080/"

const Search = () =>{
    const history = useHistory();
    const [searchData, setSearches] = useState([]);
    var qu = window.location.href;
    var q = url.parse(qu, true);
    var qdata = q.query;

    var mongoRequest = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(qdata)
    }
    useEffect(() => {
        const getFlights = () => {fetch(mongoUrl,mongoRequest).then(response => response.json()).then(data => setSearches(data));}
        getFlights()
      }, []);

    
    return (
        <div className="back3">
        <div style={{"padding":"10px"}}></div>
        {searchData.map((data, key) => {
          var imagePath = "../logos/"+data.company+".svg"
          return (
            <div key={key} className="align-items-center">
              <Card bg="dark" className="gradient " style={{ width: '80%',alignContent:"center",marginLeft:"10%",marginBottom:"1%"}}>
                    <Card.Body >
                    <Card.Title as="h2"><img src={imagePath} style={{height:"80px"}}/></Card.Title>
                        <Card.Text className="gradient" >
                        <pre style={{ color:"white",fontSize:"20px"}}>
                        From : {data.origin}                                                         To : {data.destination}<br/>
                        Departure Time : {data.departureTime}                                          Arrival Time : {data.arrivalTime}<br/>
                        ------------------------------------ Duration : {data.duration} ------------------------------------ <br/>
                        Cost : ₹{data.price}                                                         Seats Available : {data.availability}<br/>
                        </pre>
                        </Card.Text>
                        <div style={{display: 'flex',justifyContent:'center', alignItems:'center'}}>
                          <Button variant="primary" style={{fontFamily:"Cabin"}} onClick={e => {var query="id="+data.id; history.push({pathname:"/booking",search:query})}}>Book Now</Button>
                        </div>
                    </Card.Body>
                </Card> 
              <br/>
            </div>
          );
        })}
      </div>
    )
}

export default Search