import {React,useState,useEffect} from 'react'
var url = require('url');
var mongoUrl = "http://localhost:8080/"

const Booking = () => {
    const [bookData, setBookData] = useState([]);
    var currentUrl = window.location.href;
    var parsedUrl = url.parse(currentUrl, true);
    var queryData = parsedUrl.query
    alert(JSON.stringify(queryData))
    var mongoRequest = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({queryData})
    }
    useEffect(() => {
        const getFlights = () => {fetch(mongoUrl,mongoRequest).then(response => response.json()).then(data => {setBookData(data);alert(data)});}
        getFlights()
      }, []);
    return (
        <div>
            {bookData.map((data, key) => {
          return (
            <div key={key} className="card">
              {data.company}
              hi
            </div>
          );
        })}
        </div>
    )
}

export default Booking

