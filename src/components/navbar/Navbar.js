import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import jwt_decode from "jwt-decode";
import { Button } from "../button"
import './Navbar.css'

if(window.sessionStorage.getItem("token")){
    var token = jwt_decode(window.sessionStorage.getItem("token"))
  }
else{
    var token = {"Login":"False"}
}


class Navbar extends Component {
    
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
        if(token.login === "True"){
            return(

                <nav className="NavbarItems">
                    <a href="/"><h1 className="navbar-logo">Airi<i className="fab fa-react"></i></h1></a>
                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.cName} href={item.url}>
                                    {item.title}
                                    </a>
                                </li>
                            )
                        })}
                    </ul> 
                    <Button onClick={this.handleLogout}>Logout</Button>
                    <a href ="/settings"><Button>Settings</Button></a>
                </nav>
            )
        }
        else{
            return(
            <nav className="NavbarItems">
                    <a href="/"><h1 className="navbar-logo">Airi<i className="fab fa-react"></i></h1></a>
                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.cName} href={item.url}>
                                    {item.title}
                                    </a>
                                </li>
                            )
                        })}
                    </ul> 
                    <a href ="/login"><Button>Login</Button></a>
                    <a href ="/register"><Button>Signup</Button></a>
                </nav>
            )
        }
        
    }
}
export default Navbar