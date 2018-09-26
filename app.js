var express = require('express');
var app =express();
var express = require('express');
var path = require('path');

/*
* Routes
*/
const indexRouter = require(path.join(__dirname, 'src', 'server', 'routes', 'index'));

/*
* Views 
*/
app.set('views', path.join(__dirname, 'src', 'server', 'views'));
app.set('view engine', 'ejs');
var server = app.listen(4000, function(){
    console.log('Listening on port 4000');

});

app.use('/', indexRouter);

module.exports= app;


