import {React,setState,useState,useEffect} from 'react';
import BookingListfronJSON from '../jsons/bookingData'
import Card from 'react-bootstrap/Card'
import '../css/App.css';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Button } from "./button"

const Settings= () =>{
    const [bookingDetailList,setbookingDetailList] = useState([]);
    const [bookingDetailList2,setbookingDetailList2] = useState([]);

    var mongoUrl = "http://localhost:8080"
    var user = jwt_decode(window.sessionStorage.getItem("token")).user
    /* var booking = [JSON.parse(window.sessionStorage.getItem("booking"))]
    console.log(booking) */
    var [currentPass,setcurrentPass] = useState([])
    var [pass,setPass] = useState([])
    var [pass2,setPass2] = useState([])
    const changePass = () =>{
        console.log("User:"+user+" Current Pass:"+currentPass+" New Pass:"+pass+" New Pass:"+pass2)
        var request = {
            "in":
            {
                "user":user,
                "pass":currentPass
            },
            "out":
            {
                "user":user,
                "pass":pass2
            }
        }
        
        alert(JSON.stringify(request))
        axios.post(mongoUrl+"/auth",{"user":user,"pass":currentPass}).then(function (response) {
            console.log(response);
            var status = response.status
            //alert(status)

            if(status === 200){
                if(pass === pass2){
                    //alert(pass+pass2)
                    axios.put(mongoUrl+"/users",request)
                    alert("Password changed successfully")
                }
                else{
                    alert("Passwords do not match")
                }
            }
            else{
                alert("Incorrect Password")
            }
        });
        
        
        
    }
    const deleteAccount = () =>{
        if(window.confirm("Are you sure you want to delete your account?"))
        {
            axios.delete(mongoUrl+"/users",{"user":user,"pass":pass})
            alert("Your account has been deleted successfully ")
            window.sessionStorage.removeItem("token")
            window.open("/","_self")
        }
        
    }
    const postbookingDetails = () =>{
        var mongoRequest = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"user":user})
        }
        fetch(mongoUrl+"/booking",mongoRequest).then(response => response.json()).then(
            data => {
                //alert(JSON.stringify(data[0].booking))
                console.log(JSON.stringify("Got Booking IDS : "+JSON.stringify(data[0].booking)))
                var bookingData = data[0].booking
                var i;
                //var book=JSON.parse(booking);
                //alert("Length"+bookingData.length)
                for(i=0;i<bookingData.length;i++){
                    var mongoRequest2 = {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({"id":bookingData[i]})
                    }
                    fetch(mongoUrl,mongoRequest2).then(response2 => response2.json()).then(
                        data2 =>{
                            alert(data2[0])
                            alert("Flight Info\nAirline Name:"+data2[0].company+"\nOrigin Airport: "+data2[0].origin+"\nDestination Airport: "+data2[0].destination+"\nArrival Time: "+data2[0].arrivalTime+"\nDeparture Time: "+data2[0].departureTime+"\nPrice : "+data2[0].price)
                            console.log("Got Final Data"+JSON.stringify(data2[0]))
                            //booking.concat(JSON.stringify(data2[0]))
                            //console.log("Book:"+booking)
                            //setbookingDetailList2(bookingDetailList2.push(data2)) 
                        })
                }
            }
            ) 

    }
    /* useEffect(()=>{
        var mongoRequest = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"user":user})
        }
        const postbookingDetails = () =>{
            fetch(mongoUrl+"/booking",mongoRequest).then(response => response.json()).then(
                data => {
                    alert(JSON.stringify(data[0].booking))
                    console.log(JSON.stringify("Got Booking IDS : "+JSON.stringify(data[0].booking)))
                    var bookingData = data[0].booking
                    var i;
                    //var book=JSON.parse(booking);
                    alert("Length"+bookingData.length)
                    for(i=0;i<bookingData.length;i++){
                        var mongoRequest2 = {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({"id":bookingData[i]})
                        }
                        fetch(mongoUrl,mongoRequest2).then(response2 => response2.json()).then(
                            data2 =>{
                                alert("Got Final Data"+JSON.stringify(data2[0]))
                                console.log("Got Final Data"+JSON.stringify(data2[0]))
                                booking.concat(JSON.stringify(data2[0]))
                                console.log("Book:"+booking)
                                //setbookingDetailList2(bookingDetailList2.push(data2)) 
                            })
                    }
                }
                ) 

        }
        postbookingDetails();
    },[]) */
    return (
        <div className="back2">
        <div style={{paddingTop:"10px",paddingLeft:"50px",fontFamily:"Cabin",color:"white"}}>
            <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Settings</h1>
            <div>
                <h2>User Details</h2>
                <pre style={{fontSize:"20px",color:"white"}}>Username: {user}</pre>
                <Button onClick={postbookingDetails} className="red">Get Booking Details</Button><br/><br/>
            </div>
            <div className="form-group">
            <label>
            <h2>Change Password</h2>
                Current Password<br/>
                <input type="password" value={currentPass} onChange={({target}) => setcurrentPass(target.value)}/>
            </label><br/>
            <label>
                New Password<br/>
                <input type="password" style={{minLength:"8"}} value={pass} onChange={({target}) => setPass(target.value)}/>
            </label><br/>
            <label>
                Retype Password<br/>
                <input type="password" id='password' style={{border:"10px"}} value={pass2} onChange={({target}) => setPass2(target.value)}/>
            </label><br/>
            <Button onClick={changePass}>Update Password</Button><br/>
            </div>
            <br/>
            <br/>
            <Button onClick={deleteAccount} style={{fontFamily:"Cabin",color:"red"}}>Delete Account</Button><br/>
            
            {/* <h2>Booking Details</h2>
            {   
                BookingListfronJSON.map((data, key) => {
                    //alert(bookingDetailList2)
                    console.log(bookingDetailList2)
                        return (
                            <div key={key}>
                            <Card className="gradient">
                                    <Card.Body >
                                    <Card.Header as="h5">Featured</Card.Header>
                                        <Card.Title>{data.company}</Card.Title>
                                        <Card.Text>
                                        Key : {key}<br/>
                                        From : {data.origin}<br/>
                                        To : {data.destination}<br/>
                                        Arrival Time : {data.arrivalTime}<br/>
                                        Departure Time : {data.departureTime}<br/>
                                        Cost : ₹{data.price}<br/>
                                        </Card.Text>
                                    </Card.Body>
                                </Card> 
                            </div>
                  );
                
        })} */}
        </div>
        </div>
    )
}

export default Settings

