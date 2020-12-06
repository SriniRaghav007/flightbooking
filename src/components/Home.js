import {React,useState} from 'react';
import { useHistory } from "react-router-dom";
import '../css/App.css';
import '../css/bootstrap.min.css';


const Home = () => {
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [depdate, setDepdate] = useState()
  const history = useHistory();
  const handleSubmit = event => {
    //alert(from+to+depdate)
    console.log(from+to+depdate)
    window.sessionStorage.setItem("booking",[])
    var query = "?origin="+from+"&destination="+to+"&departureDate="+depdate;
    event.preventDefault()
    history.push({pathname:"/search",search:query})
  }
    return (
      <div className="back">
          <div className="back2 ">
            <div className="searchbox align-items-center text-center">
            <h1 className="display-6 py-2 text-truncate" style={{fontFamily:"Cabin",fontSize:"60px"}}>Book Flights</h1>
              <div style={{fontFamily:"Cabin",fontSize:"20px"}}>
                <form className="form-group align-items-center" onSubmit={handleSubmit} >
                  <div class="form-group" >
                    <label>From:</label>
                    <select value={from} onChange={({target}) => setFrom(target.value)}>
                      <option value="none" selected disabled hidden> Select an Option </option>
                        <option value="BLR" > Bangalore </option>
                        <option value="BOM" > Mumbai </option>
                        <option value="MAA" > Chennai </option>
                        <option value="DEL" > Delhi </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>To:</label>
                    <select value={to} onChange={({target}) => setTo(target.value)}>
                    <option value="none" selected disabled hidden> Select an Option </option>
                      <option value="BLR" > Bangalore </option>
                      <option value="BOM" > Mumbai </option>
                      <option value="MAA" > Chennai </option>
                      <option value="DEL" > Delhi </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Departure Date :<br/>
                    <input type="date" name="date1" value={depdate} onChange={({target}) => setDepdate(target.value)} required /><br></br>
                    </label><br/>
                  </div>
                    <input className="btn btn-primary btn-sm" style={{fontFamily:"Cabin",fontSize:"16px"}} type="submit" value="Submit" />
                </form>
            </div>
          </div> 
        </div>
    </div> 
    )
  }
export default Home;
//export default App;


