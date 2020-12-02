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
        <div className="back2">
        {searchData.map((data, key) => {
          return (
            <div key={key} className="align-items-center">
              <Card className="gradient " style={{ width: '50%',alignContent:"center",marginLeft:"25%",marginBottom:"1%"}}>
                    <Card.Body >
                    {/* <Card.Header as="h5">Featured</Card.Header> */}
                        <Card.Title>{data.company}</Card.Title>
                        <Card.Text>
                        From : {data.origin}<br/>
                        To : {data.destination}<br/>
                        Departure Time : {data.departureTime}<br/>
                        Arrival Time : {data.arrivalTime}<br/>
                        Total Duration : {data.duration}<br/>
                        Cost : ₹{data.price}<br/>
                        Seats Available : {data.availability}<br/>
                        </Card.Text>
                        <Button variant="primary" onClick={e => {var query="id="+data.id; history.push({pathname:"/booking",search:query})}}>Book Now</Button>
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