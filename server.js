const xml2js = require('xml2js');
const express = require('express');
const puppeteer = require('puppeteer');
const searchNLM = require('./searchNLM.js')
const app = express();
const port = 3000;


app.get('/search', (request, response) => {
    //Do something when someone makes request to localhost:3000/search
    //request parameter - information about the request coming in
   //response parameter - response object that we can use to send a response
   const searchQuery = request.query.searchquery;
   if(searchQuery != null){
    searchNLM(searchQuery)
    .then(results => {
        //Returns a 200 Status OK with Results JSON back to the client.
        response.status(200);
        response.json(results);
    });

}else{
  response.end();
}
});
//Catches requests made to localhost:3000/
app.get('/', (req, res) => res.send('Hello World!'));


//Initialises the express server on the port 30000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));