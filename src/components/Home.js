import {React,useState} from 'react';
import { useHistory } from "react-router-dom";
import '../css/App.css';
import '../css/bootstrap.min.css';


const Home = () => {
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [depdate, setDepdate] = useState()
  const [arrdate, setArrdate] = useState()
  const history = useHistory();
  const handleSubmit = event => {
    alert(from+to+depdate+arrdate)
    var query = "?origin="+from+"&destination="+to+"&departureTime="+depdate+"&arrivalTime="+arrdate;
    event.preventDefault()
    history.push({pathname:"/search",search:query})
  }
    return (
            <div className="back">
            <div className="back2">
              <div className="searchbox">
              <h3>Book Flights</h3>
              <form className="form-group" onSubmit={handleSubmit} >
              {/* <label >
                From : 
                <input type="text" name="from" value={from} onChange={({target}) => setFrom(target.value)} required />

              </label><br/> */}
              <label>From:</label>
              <select value={from} onChange={({target}) => setFrom(target.value)}>
              <option value="none" selected disabled hidden> Select an Option </option>
                <option value="BLR" > Bangalore </option>
                <option value="BOM" > Mumbai </option>
                <option value="MAA" > Chennai </option>
                <option value="DEL" > Delhi </option>
              </select>
              <br></br>
              <label>To:</label>
              <select value={to} onChange={({target}) => setTo(target.value)}>
              <option value="none" selected disabled hidden> Select an Option </option>
                <option value="BLR" > Bangalore </option>
                <option value="BOM" > Mumbai </option>
                <option value="MAA" > Chennai </option>
                <option value="DEL" > Delhi </option>
              </select>
              <label>Departure Date :
              <input type="date" name="date1" value={depdate} onChange={({target}) => setDepdate(target.value)} required /><br></br>
              </label>
              <label>Return Date :
              <input type="date" name="date2" value={arrdate} onChange={({target}) => setArrdate(target.value)} required /><br></br>
              </label>
              <input type="submit" value="Submit" />
          </form>

          </div>
        </div>
      </div>
    );
  }
export default Home;
//export default App;

/* 
<form>
              <label>
                From:
                <input type="text" name="from" />
              </label><br/>
              <label>
                To:
                <input type="text" name="from" />
              </label><br/>
              <label>Departure Date:
              <input type="date" name="date1"  /><br></br>
              </label>
              <label>Return Date
              <input type="date" name="date2"  /><br></br>
              </label>
              <input type="submit" value="Submit" />
            </form> 
*/

