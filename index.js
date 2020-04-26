const express = require("express");  //server side common JS module system

const app = express();  //start an app, there may be more than one app

app.get("/", (req, res) => {            //set up a route handler, focus on HTTP get request
  res.send({bye: 'buddy'});              //req, request, containing info about client and request
});                                     //res, respond, tell node server what info to send back to client

const PORT = process.env.PORT  || 5000  //Heroku tells us what port to listen 
app.listen(PORT);                       //tell node to help listen on port PORT


