// import modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
// Models
const Destinations = require('./models/destinations.js');
// Import seed data
// const dbSeed = require('./seeds/destinations.js');

// Hide creds from repo
const mongoDB = process.env.MONGODB_URL;

// Set up default mongoose connection
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set a callback to let us know we've successfully connected
db.once('open', function() {
  console.log('Connected to DB...');
});

// create express app
const app = express();
app.set('view engine', 'ejs');

// cors origin URL - Allow inbound traffic from origin
// corsOptions = {
//   origin: "https://dashboard.heroku.com",
//   //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//    };
//   app.use(cors(corsOptions));
  

// automatically check if requested file is found in /public
// if yes, return that file as a response to the browser
app.use(express.static(path.join(__dirname, 'public')));

// Define an endpoint handler for the home page 
app.get('/', function(request, response){
  response.render('index',{});
})

app.get('/login', function(request, response){
  response.render('login',{});
})

app.get('/register', function(request, response){
  response.render('register',{});
})

// Define an endpoint handler for the individual ejs pages
  app.get('/:id', function(request, response){

  // model.findOne returns the first object it finds
  // model.find will always return an array, even if it only finds one 
   Destinations.findOne({'id': request.params.id}, function(error, item) {
  
    // Check for IDs that are not in our list
     if (!item) {
      response.render('Invalid ID.');
    }

    // Compile view and respond
    response.render('desti',item);
  });

})
 

// Create a JSON (no EJS here) that returns the entire animal JSON
// This is the endpoint that the frontend gallery script calls (see: ./public/js/app.js).
app.get('/api/destinations', function(request, response){

    Destinations.find(function(error, item) { 
    response.json(item);
  });

});

// if no file or endpoint found, send a 404 error as a response to the browser
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

// start up server
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
})
