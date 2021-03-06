var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB);
//mongoose.connect("mongodb://nob98:cafenob98@ds011369.mlab.com:11369/nob98");
var db = mongoose.connection;
db.once("open",function(){
  console.log("DB Connected");
});
db.on("error",function(err){
  console.log("DB Error:", err);
});

var dataSchema = mongoose.Schema({
  name:String,
  count:Number
});

var Data = mongoose.model('data',dataSchema);




app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  Data.findOne({name:"myData"},function(err,data){
    if(err) return console.log("Data ERROR:",err);
    data.count++;
    data.save(function(err){
      res.render('my_first_ejs',data);
    });
  });
});

app.get('/reset', function(req,res){
setCounter(res,0);
});

app.get('/set/count', function(req,res){
  if(req.query.count) setCounter(res,req.query.count);
  else getCounter(res);
});

app.get('/set/:num', function(req,res){
  if(req.params.num) setCounter(res,req.params.num);
  else getCounter(res);
});

function setCounter(res,num){
  console.log("setCounter");
  Data.findOne({name:"myData"}, function(err,data){
    if(err) return console.log("Data ERROR:", err);
    data.count=num;
    data.save(function(err){
      if(err) return console.log("Data ERROR:", err);
      res.render('my_first_ejs',data);
    });
  });
}
function getCounter(res){
  console.log("getCounter");
  Data.findOne({name:"myData"}, function(err,data){
    if(err) return console.log("Data ERROR:", err);
    res.render('my_first_ejs',data);
  });
}

app.listen(8888, function(){
  console.log('Server On!');
});
