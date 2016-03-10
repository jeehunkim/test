var express = require('express');

var app = express();

app.get('/', function(req,res){
  res.send('hell');
});

app.listen(8888, function(){
  console.log('Server On!');
});
