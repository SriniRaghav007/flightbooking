import React, { Component } from 'react';
import { MenuItems } from "./MenuItems2"
import jwt_decode from "jwt-decode";
import { Button } from "../button"
import './Navbar.css'

if(window.sessionStorage.getItem("token")){
    var token = jwt_decode(window.sessionStorage.getItem("token"))
  }
else{
    var token = {"Login":"False"}
}


class Navbar2 extends Component {
    
    state = { clicked: false }
    handleClick = () => {
        window.open("/")
        this.setState({ clicked: !this.state.clicked })
    }

    handleLogout = () => {    
        window.sessionStorage.removeItem("token")
        alert("You have successfully logged out");
        window.open("/","_self")
    }

    render() {
            return(

                <nav className="NavbarItems" style={{background:"linear-gradient(90deg,  #000000 0%, #417dff 100%)",height:"50px"}}>
                    <a href="/" style={{fontFamily:"Major Mono Display",fontSize:"5px"}}><h1 className="navbar-logo">Airi<i className="fab fa-react"></i></h1></a>
                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'} >
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.cName} href={item.url} style={{fontFamily:"Cabin",fontSize:"18px"}}>
                                    {item.title}
                                    </a>
                                </li>
                            )
                        })}
                    </ul> 
                </nav>
            )
        
    }
}
export default Navbar2