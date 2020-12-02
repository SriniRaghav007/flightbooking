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
            <h1 className="display-6 py-2 text-truncate">Book Flights</h1>
              <div >
                <form className="form-group align-items-center" onSubmit={handleSubmit} >
                  <div class="form-group">
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
                    <label>Departure Date :
                    <input type="date" name="date1" value={depdate} onChange={({target}) => setDepdate(target.value)} required /><br></br>
                    </label>
                  </div>
                    <input className="btn btn-primary mb-2"type="submit" value="Submit" />
                </form>
            </div>
          </div> 
          {/* <div id="cover" className="min-vh-100">
        <div id="cover-caption">
          <div className="container">
            <div className="row text-white">
              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                <h1 className="display-4 py-2 text-truncate">Book Flights</h1>
                <div className="px-2">
                <form className="form-group" onSubmit={handleSubmit} >
                  <div class="form-group">
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
                    <option value="none" class="form-control" selected disabled hidden> Select an Option </option>
                      <option value="BLR" > Bangalore </option>
                      <option value="BOM" > Mumbai </option>
                      <option value="MAA" > Chennai </option>
                      <option value="DEL" > Delhi </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Departure Date :
                    <input type="date" name="date1" value={depdate} onChange={({target}) => setDepdate(target.value)} required /><br></br>
                    </label>
                  </div>
                  <div className="sub">
                    <input className="sub1"type="submit" value="Submit" />
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
        </div>
    </div> 
    )
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

