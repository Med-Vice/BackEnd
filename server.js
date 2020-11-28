const xml2js = require('xml2js');
const express = require('express');
const puppeteer = require('puppeteer');
const searchNLM = require('./searchNLM.js')
const app = express();



app.get('/search', async (request, response) => {
    //Do something when someone makes request to localhost:3000/search
    //request parameter - information about the request coming in
   //response parameter - response object that we can use to send a response
   try{
       const searchQuery = request.query.searchquery;
        if(searchQuery != null){
            const results =searchNLM(searchQuery)
        
                //Returns a 200 Status OK with Results JSON back to the client.
                response.status(200).json({data:results});
            
        } 

   }catch(error){
    response.status(404).json({message:error});
   }


});
//Catches requests made to localhost:3000/

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to the Books API",server: 'up and running!', port: `${process.env.PORT}`, environment: `${process.env.NODE_ENV}`})
  });


//Initialises the express server on the port 30000
module.exports = app;