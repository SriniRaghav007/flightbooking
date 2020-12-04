import {React,useState} from 'react'
import { useHistory } from "react-router-dom";
import '../css/main.css'
import '../css/util.css'
import Logo from "../images/icons/favicon copy.ico"

var mongoUrl = "http://localhost:8080/users"
//var mongoUrl = "https://us-central1-flightbookingpes.cloudfunctions.net/flight/users"
const Register = ()=> {
    var history = useHistory();
    const [username,setUsername] = useState()
    const [pass,setPass] = useState()

    const handleSubmit  = event => {
        var mongoRequest = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"user":username,"pass":pass,"booking":[]})
        }

        fetch(mongoUrl,mongoRequest).then(response => alert("Your Account has been successfully created"));
        history.push('/login');

    }
    return (
        <div>
            <div className="limiter">
                <div className="container-login100" >
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                    <span className="login100-form-logo">
                        <img src={Logo}></img>
                    </span>
                    <span className="login100-form-title p-b-34 p-t-27">
                        Register
                    </span>
                    <div className="wrap-input100 validate-input" data-validate="Enter username">
                        <input className="input100" type="text" name="username" placeholder="Username" value={username} onChange={({target}) => setUsername(target.value)} />
                        <span className="focus-input100" data-placeholder="" />
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Enter password">
                        <input className="input100" type="password" name="pass" placeholder="Password" value={pass} onChange={({target}) => setPass(target.value)}/>
                        <span className="focus-input100" data-placeholder="" />
                    </div>
                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn">
                        Register
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>

    )
}

export default Register
