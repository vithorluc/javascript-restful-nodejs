// lsof -i tcp:3000 -> Check the PID i.e. id of process running on port 3000
// kill -9 {PID} -> kill the current PID of the process 

/* loaded modules */
const express = require('express')
const consign = require('consign')
const BodyParser = require('body-parser')

let app = express()

app.use(BodyParser.urlencoded({ extended: false }))
/* convert data recieved in json notation */
app.use(BodyParser.json())


consign().include('routes').include('utils').into(app)

/* the server will recieve a response in local host and this 
need to be listened.  */

app.listen(3000, '127.0.0.1', () => {

    console.log('running server')

})