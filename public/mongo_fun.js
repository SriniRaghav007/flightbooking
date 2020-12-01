var axios = require("axios")
var mongoUrl = "http://localhost:8080/"

var postRequest = JSON.stringify({"id":"5fc46d057a28f62a54a12bdb"})
console.log("Post Request"+postRequest)
axios.post(mongoUrl,{"id":"5fc46d057a28f62a54a12bdb"}).then(response =>{
    console.log(response.data)
    /* var putRequest = {
        "in":response.data,
        "out":{
            "availability":response.data.availability-1
        }
    }
    console.log(JSON.stringify(putRequest))
    var putResponse = axios.put(mongoUrl,JSON.stringify(putRequest))
    console.log(putResponse.data) */
})