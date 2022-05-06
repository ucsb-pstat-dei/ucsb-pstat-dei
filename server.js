var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen('5000');
console.log('working on 5000');