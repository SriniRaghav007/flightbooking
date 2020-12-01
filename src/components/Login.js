import {React,useState} from 'react'
import { useHistory } from "react-router-dom";
import '../css/main.css'
import '../css/util.css'
import Logo from "../images/icons/favicon copy.ico"
const axios = require('axios');
var mongoUrl = "http://localhost:8080/auth"

function Login (){
    var history = useHistory();
    const [username,setUsername] = useState()
    const [pass,setPass] = useState()

    function handleSubmit(event){
        var mongoRequest = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"user":username,"pass":pass})
        }

        axios.post(mongoUrl,{"user":username,"pass":pass}).then(function (response) {
            console.log(response);
            var status = response.status
            var bearerToken = response.data.token
            alert(status)
            if(status == 200){
                alert("Login Successful")
                alert(JSON.stringify(bearerToken))
                window.sessionStorage.setItem("token",bearerToken)
                history.push("/")
            }
            else{
                alert("Incorrect Username/Password")
            }
          })
          .catch(function (error) {
            console.log(error);
            alert(error)
          });
          event.preventDefault()

    }
    return (
        <div>
            <div className="limiter">
                <div className="container-login100" >
                <div className="wrap-login1002">
                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                    <span className="login100-form-logo">
                        <img src={Logo}></img>
                    </span>
                    <span className="login100-form-title p-b-34 p-t-27">
                        LOGIN
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
                        Login
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>

    )
}

export default Login
