var http = require('http');
var url = require('url');
var qs = require('querystring');
var server = require('./lib/server.js');



var session = require('express-session');

var express = require('express');
var app = express();
app.use(express.static('public'));




//-------------------------- admin.js  ------------------------------------
app.post('/', function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  server.main(request,response,queryData);
});

app.get('/', function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  server.main(request,response,queryData);
});



app.post('/server_register', function(request, response){
  server.register(request, response);
})

app.get('/server_register', function(request, response){
  server.register(request, response);
})

app.post('/server_history', function(request, response){
  server.history(request, response);
})
app.get('/server_history', function(request, response){
  server.history(request, response);
})


app.post('/create_state', function(request, response){
  server.create_state(request, response);
})

app.post('/delete', function(request, response){
  server.delete(request, response);
})

app.get('/delete_state', function(request, response){
  server.delete_state(request, response);
})



app.listen(3000, function(){
  console.log('conneted 3000 port!!');
});
