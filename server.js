// <--- Modules --->
const express = require('express'); // imports express module

// <--- Constructors --->
const app = express(); // constructs express server
const server = app.listen(8000); // port-listening
const route = require(__dirname + '/routes/index.js')(app, server); // imports routes module

// <--- Settings --->
app.set('view engine', 'ejs'); // sets templating engine to ejs
app.set('views', __dirname + '/views'); // points to views dir
app.use(express.static(__dirname + '/static')); // points to static folder