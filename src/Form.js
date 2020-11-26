import './App.css';
import './bootstrap.min.css';
import { AiFillLinkedin } from 'react-icons/ai';
import React from 'react';
import ReactDOM from 'react-dom';

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
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
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
