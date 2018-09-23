var express = require('express');
var app =express();
var express = require('express');
var path = require('path');

const indexRouter = require(path.join(__dirname, 'src', 'server', 'routes', 'index'));
app.set('views', path.join(__dirname, 'src', 'server', 'views'));
app.set('view engine', 'ejs');
var server = app.listen(5000, function(){
    console.log('Listening on port 5000');

});

app.use('/', indexRouter);

module.exports= app;


