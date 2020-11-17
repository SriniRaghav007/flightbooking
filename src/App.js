import './App.css';
import './bootstrap.min.css';
import { AiFillLinkedin } from 'react-icons/ai';

function App() {
  return (
      <div className="back">
        <div className="back2">
          <div className="searchbox">
          <h3>Book Flights</h3>
          <form className="form-group">
          <label >
                From : 
                <input type="text" name="from" />
              </label><br/>
              <label>
                To : 
                <input type="text" name="from" />
              </label><br/>
              <label>Departure Date :
              <input type="date" name="date1"  /><br></br>
              </label>
              <label>Return Date :
              <input type="date" name="date2"  /><br></br>
              </label>
              <input type="submit" value="Submit" />
          </form>

          </div>
        </div>
      </div>
  );
}

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

export default App;
