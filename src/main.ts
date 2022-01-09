import express = require('express');
import path = require('path');

let portNum = process.env.PORT || 3000;

let app = express();

//retrieve any requested file from the "views" folder
app.get('/views/:name', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/' + req.params.name));
});

//call to api to get the latest data
app.listen(portNum);