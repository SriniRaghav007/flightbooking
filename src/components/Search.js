import {React,useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import "../css/App.css"
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
        <div className="back">
        {searchData.map((data, key) => {
          return (
            <div key={key}>
              <Card className="gradient">
                    <Card.Body >
                    <Card.Header as="h5">Featured</Card.Header>
                        <Card.Title>{data.company}</Card.Title>
                        <Card.Text>
                        Key : {key}<br/>
                        From : {data.origin}<br/>
                        To : {data.destination}<br/>
                        Arrival Time : {data.arrivalTime}<br/>
                        Departure Time : {data.departureTime}<br/>
                        Cost : ₹{data.price}<br/>
                        </Card.Text>
                        <Button variant="primary" onClick={e => {var query="id="+data.id; history.push({pathname:"/booking",search:query})}}>Book Now</Button>
                    </Card.Body>
                </Card> 
                
            </div>
          );
        })}
        
      </div>
    )
}

export default Search