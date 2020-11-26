import {React,useState} from 'react';
import './App.css';
import './bootstrap.min.css';
import { AiFillLinkedin } from 'react-icons/ai';


const App = props => {
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [depdate, setDepdate] = useState()
  const [arrdate, setArrdate] = useState()

  const handleSubmit = event => {
    alert(from+to+depdate+arrdate)
    event.preventDefault()
  }
    return (
        <div className="back">
        <div className="back2">
          <div className="searchbox">
          <h3>Book Flights</h3>
          <form className="form-group" onSubmit={handleSubmit} >
          <label >
                From : 
                <input type="text" name="from" value={from} onChange={({target}) => setFrom(target.value)} required />
              </label><br/>
              <label>
                To : 
                <input type="text" name="to" value={to} onChange={({target}) => setTo(target.value)} required/>
              </label><br/>
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

export default App;

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

