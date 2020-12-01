import {React,useState,useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Button } from "./button"


const Settings = () => {
    const [bookingDetailList,setbookingDetailList] = useState([]);
    const [bookingDetailList2,setbookingDetailList2] = useState([]);
    var mongoUrl = "http://localhost:8080"
    var user = jwt_decode(window.sessionStorage.getItem("token")).user
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
                alert("Passwords incorrect")
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
    useEffect(() => {
        const postbookingDetails = () =>{
            axios.post(mongoUrl+"/booking",{"user":user}).then(res =>{
                var bookingData = res.data[0].booking
                //setbookingDetailList(bookingData);
                var i;
                for(i=0;i<bookingData.length;i++){
                    axios.post(mongoUrl,{"id":bookingData[i]}).then(res=>{
                    //console.log(JSON.stringify(res.data[0]))
                    setbookingDetailList2(bookingDetailList2.push(res.data[0]))
                    });
                }
            console.log(bookingDetailList2)
            })
        }
        postbookingDetails();
      }, []);
    

    return (
        <div>
            <h1>User Details</h1>
            <p>Username: {user}</p>
            <label>
                Current Password:
                <input type="password" value={currentPass} onChange={({target}) => setcurrentPass(target.value)}/>
            </label>
            <label>
                New Password:
                <input type="password" value={pass} onChange={({target}) => setPass(target.value)}/>
            </label>
            <label>
                Retype Password:
                <input type="password" value={pass2} onChange={({target}) => setPass2(target.value)}/>
            </label>
            <Button onClick={changePass}>Update Password</Button><br/>

            <Button onClick={deleteAccount} className="red">Delete Account</Button>
            <h2>Booking Details</h2>
            {
                
                Object.keys([bookingDetailList2]).map((data, key) => {
                    console.log(data)
                        return (
                            <div key={key}>
                            <Card className="gradient">
                                    <Card.Body >
                                    <Card.Header as="h5">Featured</Card.Header>
                                        <Card.Title>{bookingDetailList2[data.company]}</Card.Title>
                                        <Card.Text>
                                        Key : {key}<br/>
                                        From : {bookingDetailList2[data.origin]}<br/>
                                        To : {bookingDetailList2[data.destination]}<br/>
                                        Arrival Time : {bookingDetailList2[data.arrivalTime]}<br/>
                                        Departure Time : {bookingDetailList2[data.departureTime]}<br/>
                                        Cost : ₹{bookingDetailList2[data.price]}<br/>
                                        </Card.Text>
                                    </Card.Body>
                                </Card> 
                            </div>
                  );
                
        })}
        </div>
    )
}

export default Settings
