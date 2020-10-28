const express = require('express');
const feedRoutes = require('./routes/feed');

// to be able parse incoming request bodies
const bodyParser = require('body-parser');

// execution express
const app = express();

// it used for x-www-form-urlencoded request for the <form>
// app.use(bodyParser.urlencoded());

// it used for parsing json data incoming requests
// Content-Type: application/json;
app.use(bodyParser.json());

// to provide access to the Client/browser to avoid CORS errors
// value "*" allows access to any browsers or set particular domain
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // call next the request to be able to continue and use next middleware in our case:
  // app.use('/feed', feedRoutes);
  next();
});

// to be able to forward any http methods, it filters in routes files,
// to forward any incoming request to feedRoutes
// or to forward any incoming request which starting with '/feed'
app.use('/feed', feedRoutes);

app.listen(8080);